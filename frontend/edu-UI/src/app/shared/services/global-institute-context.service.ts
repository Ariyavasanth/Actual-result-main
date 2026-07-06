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
  private readonly contextSubject = new BehaviorSubject<GlobalInstituteContext | null>(this.readStoredContext());
  readonly context$ = this.contextSubject.asObservable();
  readonly selectedInstitute$ = this.context$;

  get activeContext(): GlobalInstituteContext | null {
    return this.contextSubject.value;
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
    const normalized = {
      ...context,
      institute_id: String(context.institute_id || ''),
      institute_name: String(context.institute_name || '')
    };

    if (!normalized.institute_id) return;

    this.contextSubject.next(normalized);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      sessionStorage.setItem('global_institute_id', normalized.institute_id);
      sessionStorage.setItem('global_institute_name', normalized.institute_name);
    } catch (e) {}
  }

  clearContext(): void {
    this.contextSubject.next(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem('global_institute_id');
      sessionStorage.removeItem('global_institute_name');
    } catch (e) {}
  }

  private readStoredContext(): GlobalInstituteContext | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.institute_id) return null;
      return {
        institute_id: String(parsed.institute_id),
        institute_name: String(parsed.institute_name || parsed.name || parsed.institute_id),
        industry: parsed.industry || '',
        country: parsed.country || '',
        city: parsed.city || ''
      };
    } catch (e) {
      return null;
    }
  }
}
