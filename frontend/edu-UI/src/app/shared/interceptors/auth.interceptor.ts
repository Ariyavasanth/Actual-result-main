import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { GlobalInstituteContextService } from '../services/global-institute-context.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private instituteContext: GlobalInstituteContextService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // endpoints that should not receive Authorization header or be auto-redirected
    const skipAuthPaths = ['/login', '/refresh-token', '/public'];
    const skipInstituteContextHeader = 'X-Skip-Institute-Context';
    const skipInstituteContextPaths = ['/superadmin-dashboard'];

    try {
      let token: string | null = null;
      try { token = sessionStorage.getItem('token'); } catch (e) { token = null; }

      const url = req.url || '';
      const shouldSkip = skipAuthPaths.some(p => url.includes(p));
      const shouldSkipInstituteContext = shouldSkip || req.headers.has(skipInstituteContextHeader) || skipInstituteContextPaths.some(p => url.includes(p));
      if (req.headers.has(skipInstituteContextHeader)) {
        req = req.clone({ headers: req.headers.delete(skipInstituteContextHeader) });
      }

      if (token && !req.headers.has('Authorization') && !shouldSkip) {
        console.debug('[AuthInterceptor] attaching token to request', url);
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      } else if (shouldSkip) {
        console.debug('[AuthInterceptor] skipping auth header for', url);
      } else {
        console.debug('[AuthInterceptor] no token available for', url);
      }

      if (!shouldSkipInstituteContext) {
        req = this.attachInstituteContext(req);
      }
    } catch (e) {
      console.debug('[AuthInterceptor] error reading token', e);
    }

    return next.handle(req).pipe(
      tap((event: any) => {
        try {
          // some APIs return 200 with { status: false, statusMessage: 'Signature has expired' }
          const body = event && event.body ? event.body : null;
          if (body && (body.status === false || body.status === 'false')) {
            const msg = body.statusMessage || body.message || body.error || '';
          if (msg && /expire/i.test(msg)) {
            console.debug('[AuthInterceptor] detected expired token in 200 response:', msg);
            try {
              // Dispatch a sessionExpired event so the application can decide
              // whether to try a refresh/extend or to logout the user.
              window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { message: msg || 'Session expired' } }));
            } catch (e) {}
          }
          }
        } catch (e) {}
      }),
      catchError((err: any) => {
        try {
          const status = err && (err.status || err.statusCode);
          const body = err && err.error ? err.error : err;
          const message = body && (body.statusMessage || body.message || body.error);

          // If token expired or invalid, clear session and redirect to login
          if (status === 401 || (message && /expire/i.test(message))) {
            try {
              // Notify the app that session expired - the app can then
              // prompt the user to extend the session or logout.
              window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { message: message || 'Unauthorized - session expired' } }));
            } catch (e) {}
          }
          else {
            console.debug('[AuthInterceptor] non-auth error status:', status, 'message:', message);
          }
        } catch (e) {
          // ignore
        }
        return throwError(() => err);
      })
    );
  }

  private attachInstituteContext(req: HttpRequest<any>): HttpRequest<any> {
    const context = this.instituteContext.activeContext;
    const instituteId = context?.institute_id;
    if (!instituteId) return req;

    let nextReq = req;
    if (!nextReq.headers.has('X-Institute-Id')) {
      nextReq = nextReq.clone({ setHeaders: { 'X-Institute-Id': instituteId } });
    }

    const method = (nextReq.method || 'GET').toUpperCase();
    if (method === 'GET' || method === 'DELETE') {
      nextReq = nextReq.clone({ params: nextReq.params.set('institute_id', instituteId).set('institute', instituteId) });
      return nextReq;
    }

    const body = nextReq.body;
    if (body instanceof FormData) {
      const formData = new FormData();
      body.forEach((value, key) => {
        if (key !== 'institute_id' && key !== 'institute') formData.append(key, value);
      });
      formData.append('institute_id', instituteId);
      formData.append('institute', instituteId);
      nextReq = nextReq.clone({ body: formData });
      return nextReq;
    }

    if (body && typeof body === 'object' && !(body instanceof Blob) && !(body instanceof ArrayBuffer)) {
      nextReq = nextReq.clone({ body: { ...body, institute_id: instituteId, institute: instituteId } });
      return nextReq;
    }

    return nextReq;
  }
}




