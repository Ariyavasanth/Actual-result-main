import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GlobalInstituteContext {
  institute_id: string;
  institute_name: string;
  industry?: string;
  country?: string;
  city?: string;
}

const STORAGE_KEY = 'super_admin_institute_context';

@Injectable({ providedIn: 'root' })
export class GlobalInstituteContextService {
  private readonly pendingInstituteSubject = new BehaviorSubject<GlobalInstituteContext | null>(null);
  private readonly activeInstituteSubject = new BehaviorSubject<GlobalInstituteContext | null>(this.readStoredContext());

  readonly pendingInstitute$ = this.pendingInstituteSubject.asObservable();
  readonly activeInstitute$ = this.activeInstituteSubject.asObservable();
  readonly context$ = this.activeInstitute$;
  readonly selectedInstitute$ = this.activeInstitute$;

  get pendingInstitute(): GlobalInstituteContext | null {
    return this.pendingInstituteSubject.value;
  }

  get activeContext(): GlobalInstituteContext | null {
    return this.activeInstituteSubject.value;
  }

  get activeInstitute(): GlobalInstituteContext | null {
    return this.activeContext;
  }

  get selectedInstitute(): GlobalInstituteContext | null {
    return this.activeContext;
  }

  get activeInstituteId(): string {
    return this.activeContext?.institute_id || '';
  }

  isGlobalFilterActive(): boolean {
    return !!this.activeInstituteId;
  }

  setPendingInstitute(context: GlobalInstituteContext | null): void {
    this.pendingInstituteSubject.next(context ? this.normalizeContext(context) : null);
  }

  clearPendingInstitute(): void {
    this.pendingInstituteSubject.next(null);
  }

  applyPendingInstitute(): void {
    const pending = this.pendingInstitute;
    if (!pending?.institute_id) return;
    this.setContext(pending);
  }

  setInstitute(instituteId: string, instituteName: string = '', meta: Partial<GlobalInstituteContext> = {}): void {
    this.setContext({
      ...meta,
      institute_id: instituteId,
      institute_name: instituteName || meta.institute_name || instituteId
    });
  }

  clearInstitute(): void {
    this.clearContext();
  }

  setContext(context: GlobalInstituteContext): void {
    const normalized = this.normalizeContext(context);
    if (!normalized.institute_id) return;

    this.activeInstituteSubject.next(normalized);
    this.pendingInstituteSubject.next(normalized);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      sessionStorage.setItem('global_institute_id', normalized.institute_id);
      sessionStorage.setItem('global_institute_name', normalized.institute_name);
    } catch (e) {}
  }

  clearContext(): void {
    this.pendingInstituteSubject.next(null);
    this.activeInstituteSubject.next(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem('global_institute_id');
      sessionStorage.removeItem('global_institute_name');
    } catch (e) {}
  }

  private normalizeContext(context: GlobalInstituteContext): GlobalInstituteContext {
    return {
      ...context,
      institute_id: String(context.institute_id || ''),
      institute_name: String(context.institute_name || context.institute_id || ''),
      industry: context.industry || '',
      country: context.country || '',
      city: context.city || ''
    };
  }

  private readStoredContext(): GlobalInstituteContext | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.institute_id) return null;
      return this.normalizeContext({
        institute_id: String(parsed.institute_id),
        institute_name: String(parsed.institute_name || parsed.name || parsed.institute_id),
        industry: parsed.industry || '',
        country: parsed.country || '',
        city: parsed.city || ''
      });
    } catch (e) {
      return null;
    }
  }
}
