import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { A11yModule } from "@angular/cdk/a11y";
import { AuthService } from 'src/app/home/service/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { API_BASE } from 'src/app/shared/api.config';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { notify } from 'src/app/shared/global-notify';

@Component({
  selector: 'app-view-schedule-exam',
  standalone: true,
  imports: [CommonModule, SharedModule, MatPaginatorModule, FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatIconModule, MatButtonModule, MatSlideToggleModule, RouterModule, HttpClientModule, A11yModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatCheckboxModule, OverlayModule, PortalModule, MatTabsModule],
  templateUrl: './view-schedule-exam.component.html',
  styleUrls: ['./view-schedule-exam.component.scss']
})
export class ViewScheduleExamComponent implements OnInit, AfterViewInit {
  search = '';
  institutes: Array<{ name: string; institute_id?: string }> = [];
  selectedInstitute = '';
  instituteSearch = '';
  // new filter fields
  filterName = '';
  selectedDepartments: string[] = [];
  selectedTeams: string[] = [];
  filterCreationDateAfter: Date | null = null;
  filterCreationDate: Date | null = null;
  filterActiveStatus: boolean | null = null;
  filterCreatedByMe = false;
  departments: Array<{ id: string; name: string }> = [];
  teams: Array<{ id: string; name: string }> = [];
  categories: Array<{ id: string; name: string }> = [];
  schedules: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  hasAppliedFilters = false;
  columns: string[] = ['title', 'institute', 'start', 'end', 'publish', 'actions'];
  selectedSchedule: any = null;

  private baseUrl = API_BASE;
  private apiUrl = `${API_BASE}/get-institutes`;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filtersBtn', { read: ElementRef }) filtersBtn!: ElementRef;
  @ViewChild('filtersPanel') filtersPanelTpl!: TemplateRef<any>;

  isSuperAdmin = false;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private loader: LoaderService, private overlay: Overlay, private vcr: ViewContainerRef, private pageMeta: PageMetaService, private confirmService: ConfirmService) {
    // initialize isSuperAdmin from AuthService (synchronous helper)
    try {
      this.isSuperAdmin = !!this.auth.currentUserValue && ['super_admin', 'superadmin', 'super-admin'].includes((this.auth.currentUserValue.role || '').toLowerCase());
    } catch (e) { this.isSuperAdmin = false; }
    // also subscribe to updates in case role changes during runtime
    this.auth.user$.subscribe((user: any) => {
      try {
        this.isSuperAdmin = !!user && ['super_admin', 'superadmin', 'super-admin'].includes((user.role || '').toLowerCase());
      } catch (e) { this.isSuperAdmin = false; }
    });
  }
  private filtersOverlayRef: OverlayRef | null = null;
  ngOnInit(): void {
    this.pageMeta.setMeta('Scheduled Exams', 'Browse and review scheduled exams');
    this.loadInstitutes();
    this.restoreScheduleReturnState();
  }

  refresh() {
    if (!this.hasAppliedFilters) {
      try { notify('Apply filters to fetch scheduled exams', 'info'); } catch (e) {}
      return;
    }
    this.loadSchedules(this.selectedInstitute || undefined);
  }
  openFiltersOverlay() {
    if (!this.filtersBtn) return;
    if (this.filtersOverlayRef) { try { this.filtersOverlayRef.dispose(); } catch (e) { }; this.filtersOverlayRef = null; }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.filtersBtn)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 }
      ])
      .withPush(true);

    this.filtersOverlayRef = this.overlay.create({ positionStrategy, hasBackdrop: true, backdropClass: 'cdk-overlay-transparent-backdrop', scrollStrategy: this.overlay.scrollStrategies.reposition() });
    this.filtersOverlayRef.backdropClick().subscribe(() => this.closeFiltersOverlay());
    this.filtersOverlayRef.keydownEvents().subscribe((ev: any) => { if (ev.key === 'Escape') this.closeFiltersOverlay(); });

    const portal = new TemplatePortal(this.filtersPanelTpl, this.vcr);
    this.filtersOverlayRef.attach(portal);
  }

  closeFiltersOverlay() { if (this.filtersOverlayRef) { try { this.filtersOverlayRef.dispose(); } catch (e) { }; this.filtersOverlayRef = null; } }


  get appliedFilterChips(): Array<{ key: string; label: string; removable: boolean }> {
    if (!this.hasAppliedFilters) return [];
    const chips: Array<{ key: string; label: string; removable: boolean }> = [];
    if (this.selectedInstitute) chips.push({ key: 'institute', label: `Institute: ${this.getInstituteLabel(this.selectedInstitute)}`, removable: this.isSuperAdmin });
    if (this.filterName) chips.push({ key: 'name', label: `Schedule: ${this.filterName}`, removable: true });
    (this.selectedDepartments || []).forEach(id => chips.push({ key: `department:${id}`, label: `Department: ${this.getSelectedName(this.departments, id)}`, removable: true }));
    (this.selectedTeams || []).forEach(id => chips.push({ key: `team:${id}`, label: `Team: ${this.getSelectedName(this.teams, id)}`, removable: true }));
    if (this.filterCreationDateAfter) chips.push({ key: 'created_after', label: `Created after: ${this.formatFilterDate(this.filterCreationDateAfter)}`, removable: true });
    if (this.filterCreationDate) chips.push({ key: 'created_before', label: `Created before: ${this.formatFilterDate(this.filterCreationDate)}`, removable: true });
    if (this.filterActiveStatus !== null && typeof this.filterActiveStatus !== 'undefined') chips.push({ key: 'active_status', label: `Status: ${this.filterActiveStatus ? 'Active' : 'Inactive'}`, removable: true });
    if (this.filterCreatedByMe) chips.push({ key: 'created_by_me', label: 'Created by me', removable: true });
    return chips;
  }

  removeAppliedFilter(key: string) {
    if (!key) return;
    if (key === 'institute' && this.isSuperAdmin) { this.selectedInstitute = ''; this.instituteSearch = ''; this.selectedDepartments = []; this.selectedTeams = []; this.departments = []; this.teams = []; this.categories = []; }
    else if (key === 'name') this.filterName = '';
    else if (key.startsWith('department:')) this.selectedDepartments = this.selectedDepartments.filter(id => String(id) !== key.substring('department:'.length));
    else if (key.startsWith('team:')) this.selectedTeams = this.selectedTeams.filter(id => String(id) !== key.substring('team:'.length));
    else if (key === 'created_after') this.filterCreationDateAfter = null;
    else if (key === 'created_before') this.filterCreationDate = null;
    else if (key === 'active_status') this.filterActiveStatus = null;
    else if (key === 'created_by_me') this.filterCreatedByMe = false;
    this.refreshAfterFilterChipChange();
  }

  clearAppliedFilters() { this.onReset(); }
  private refreshAfterFilterChipChange() { if (this.appliedFilterChips.length) this.loadSchedules(this.selectedInstitute || undefined); else { this.hasAppliedFilters = false; this.schedules = []; this.dataSource.data = []; } }
  private getInstituteLabel(id: any): string { const found = this.institutes.find(i => String(i.institute_id) === String(id)); return found?.name || String(id || ''); }
  private getSelectedName(list: any[], selectedId: any): string { const found = (list || []).find(item => String(item?.id) === String(selectedId)); return found?.name || String(selectedId || ''); }
  private formatFilterDate(value: Date): string { try { return value.toISOString().slice(0, 10); } catch (e) { return String(value || ''); } }
  loadInstitutes() {

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        if (res && res.data && Array.isArray(res.data)) {
          this.institutes = res.data.map((r: any) => ({ name: r.name || r.institute_name || r.short_name || '', institute_id: r.institute_id }));
          // If a selectedInstitute is already set (e.g. via route/session), prefer that
          try {
            if (this.selectedInstitute) {
              const found = this.institutes.find(i => String(i.institute_id) === String(this.selectedInstitute));
              if (found) {
                // ensure exact match type/value and load schedules
                this.selectedInstitute = found.institute_id as any;
                this.syncInstituteSearch();
                // load dependent lists as well
                this.loadDepartments(this.selectedInstitute);
                this.loadTeams(this.selectedInstitute);
                // this.loadCategoriesForInstitute(this.selectedInstitute);
                return;
              }
            }
          } catch (e) { /* ignore */ }

          // Fallback: try reading user's institute from sessionStorage and apply it
          try {
            const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
            if (raw) {
              const u = JSON.parse(raw);
              const instId = u?.institute_id || u?.instituteId || u?.institute || '';
              if (instId) {
                const found = this.institutes.find(i => String(i.institute_id) === String(instId));
                if (found) {
                  this.selectedInstitute = found.institute_id as any;
                  this.syncInstituteSearch();
                  this.loadDepartments(this.selectedInstitute);
                  this.loadTeams(this.selectedInstitute);
                  // this.loadCategoriesForInstitute(this.selectedInstitute);
                }
              }
            }
          } catch (e) { /* ignore malformed session data */ }
        }
      },
      error: (err) => console.warn('Failed to load institutes', err)
    });
  }
  private hasFilterValues(): boolean {
    return !!(
      this.selectedInstitute ||
      this.filterName ||
      this.selectedDepartments.length ||
      this.selectedTeams.length ||
      this.filterCreationDateAfter ||
      this.filterCreationDate ||
      this.filterActiveStatus !== null ||
      this.filterCreatedByMe
    );
  }

  onApply() {
    if (!this.hasFilterValues()) {
      try { notify('Please add filters in the filter form.', 'info'); } catch (e) {}
      return;
    }
    this.hasAppliedFilters = true;
    this.loadSchedules(this.selectedInstitute || undefined);
    this.closeFiltersOverlay();
  }

  onReset() {
    this.selectedInstitute = '';
    this.instituteSearch = '';
    this.filterName = '';
    this.selectedDepartments = [];
    this.selectedTeams = [];
    this.filterCreationDateAfter = null;
    this.filterCreationDate = null;
    this.filterActiveStatus = null;
    this.filterCreatedByMe = false;
    this.search = '';
    this.dataSource.filter = '';
    this.schedules = [];
    this.dataSource.data = [];
    this.hasAppliedFilters = false;
  }
  onInstituteSelected(id: string) {
    this.selectedInstitute = id || '';
  }

  onInstituteChange(id: string) {
    this.selectedInstitute = id || '';
    this.syncInstituteSearch();
    if (this.selectedInstitute) {
      this.loadDepartments(this.selectedInstitute);
      this.loadTeams(this.selectedInstitute);
      // this.loadCategoriesForInstitute(this.selectedInstitute);
    } else {
      this.departments = [];
      this.teams = [];
      this.categories = [];
    }
  }

  displayInstitute = (value: string | null): string => {
    if (!value) return '';
    const found = this.institutes.find(i => String(i.institute_id) === String(value));
    return found ? found.name : String(value);
  };
  filteredInstitutes() {
    const q = (this.instituteSearch || '').trim().toLowerCase();
    if (!q) return this.institutes;
    return this.institutes.filter((i: any) => (i.name || '').toLowerCase().includes(q));
  }

  onInstituteAutocompleteSelected(id: string) {
    this.selectedInstitute = id || '';
    this.syncInstituteSearch();
    this.onInstituteChange(this.selectedInstitute);
  }

  private syncInstituteSearch() {
    const found = this.institutes.find(i => String(i.institute_id) === String(this.selectedInstitute || ''));
    this.instituteSearch = found ? found.name : '';
  }

  loadDepartments(instId?: string) {
    if (!instId) { this.departments = []; return; }
    const url = `${API_BASE}/get-department-list`;
    this.http.get<any>(url, { params: { institute_id: instId } }).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.departments = arr.map((d: any) => ({ id: d.dept_id || d.id || d.deptId || '', name: d.name || d.dept_name || '' }));
      }, error: (err) => { console.warn('Failed to load departments', err); this.departments = []; }
    });
  }

  loadTeams(instId?: string) {
    if (!instId) { this.teams = []; return; }
    const url = `${API_BASE}/get-teams-list`;
    this.http.get<any>(url, { params: { institute_id: instId } }).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.teams = arr.map((t: any) => ({ id: t.team_id || t.id || t.teamId || '', name: t.name || t.team_name || '' }));
      }, error: (err) => { console.warn('Failed to load teams', err); this.teams = []; }
    });
  }

  // loadCategoriesForInstitute(instId?: string){
  //   if (!instId) { this.categories = []; return; }
  //   const url = `${API_BASE}/get-categories-list`;
  //   this.http.get<any>(url, { params: { institute_id: instId } }).subscribe({ next: (res) => {
  //     const arr = Array.isArray(res) ? res : (res?.data || []);
  //     this.categories = arr.map((c:any) => ({ id: c.category_id || c.id || c._id || '', name: c.name || c.category_name || '' }));
  //   }, error: (err) => { console.warn('Failed to load categories', err); this.categories = []; } });
  // }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    const q = (value || '').trim().toLowerCase();
    this.search = q;
    this.dataSource.filterPredicate = (d: any, filter: string) => {
      return (d.title || '').toLowerCase().includes(filter) || (d.institute || '').toLowerCase().includes(filter);
    };
    this.dataSource.filter = q;
  }

  loadSchedules(institute?: string) {
    this.loader.show();
    let url = `${API_BASE}/get-exam-schedule-details`;
    const params: string[] = [];
    if (institute) params.push(`institute_id=${encodeURIComponent(institute)}`);
    if (this.filterName) params.push(`name=${encodeURIComponent(this.filterName)}`);
    if (this.selectedDepartments && this.selectedDepartments.length) params.push(`departments=${encodeURIComponent(this.selectedDepartments.join(','))}`);
    if (this.selectedTeams && this.selectedTeams.length) params.push(`teams=${encodeURIComponent(this.selectedTeams.join(','))}`);
    if (this.filterCreationDateAfter) params.push(`created_after=${encodeURIComponent((this.filterCreationDateAfter as Date).toISOString().slice(0, 10))}`);
    if (this.filterCreationDate) params.push(`created_before=${encodeURIComponent((this.filterCreationDate as Date).toISOString().slice(0, 10))}`);
    if (this.filterActiveStatus !== null && typeof this.filterActiveStatus !== 'undefined') params.push(`active=${encodeURIComponent(String(this.filterActiveStatus))}`);
    if (this.filterCreatedByMe) {
      try {
        const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
        if (raw) {
          const obj = JSON.parse(raw);
          const userId = obj?.user_id || obj?.id || obj?._id;
          if (userId) {
            params.push(`created_by=${encodeURIComponent(String(userId))}`);
          }
        }
      } catch (e) { }
    }
    if (params.length) url += `?${params.join('&')}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data || []);
        const toISO = (v: any) => {
          if (!v) return null;
          // if already an ISO-like string, Date.parse will handle it; otherwise preserve raw string
          const parsed = Date.parse(v);
          return isNaN(parsed) ? v : new Date(parsed).toISOString();
        };

        this.schedules = arr.map((s: any, idx: number) => {
          // normalize institute which can be an object or a string
          const instObj = s.institute && typeof s.institute === 'object' ? s.institute : null;
          const instituteName = instObj ? (instObj.name || instObj.institute_name || '') :
            (typeof s.institute === 'string' ? s.institute : (s.institute_name || ''));
          const instituteId = instObj ? (instObj.institute_id || instObj.id || '') :
            (s.institute_id || s.instituteId || '');
          // exam object
          const examObj = s.exam && typeof s.exam === 'object' ? s.exam : null;
          const examId = examObj ? (examObj.exam_id || examObj.id || '') : (s.exam_id || s.examId || '');
          const examTitle = examObj ? (examObj.title || '') : (s.exam_title || s.examTitle || '');

          const formatDate = (v: any) => {
            if (!v) return '';
            const date = (v instanceof Date) ? v : new Date(v);
            if (isNaN(date.getTime())) return String(v);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const dayName = days[date.getDay()];
            const dd = String(date.getDate()).padStart(2, '0');
            const mmm = months[date.getMonth()];
            const yyyy = date.getFullYear();
            const hh = String(date.getHours()).padStart(2, '0');
            const mm = String(date.getMinutes()).padStart(2, '0');
            return `${dayName} ${dd}-${mmm}-${yyyy} ${hh}:${mm}`;
          };

          return {
            id: s.id || s.schedule_id || s._id || String(idx),
            title: s.title || s.testName || s.name || 'Untitled',
            institute: instituteName,
            institute_id: instituteId,
            start: formatDate(s.start_time || s.startDateTime || s.start || null),
            end: formatDate(s.end_time || s.endDateTime || s.end || null),
            publish: typeof s.publish !== 'undefined' ? s.publish : (typeof s.published !== 'undefined' ? !!s.published : false),
            assigned_users: Array.isArray(s.assigned_users) ? s.assigned_users : [],
            raw: s
          };
        });

        this.dataSource.data = this.schedules;
        this.dataSource.paginator = this.paginator;

        try { this.loader.hide(); } catch (e) { /* ignore */ }
      },
      complete: () => {
        try { this.loader.hide(); } catch (e) { /* ignore */ }
      },
      error: (err) => {
        console.error('Failed to load schedules', err);
        this.schedules = [];
        this.dataSource.data = this.schedules;
        this.dataSource.paginator = this.paginator;
        try { this.loader.hide(); } catch (e) { /* ignore */ }
      }
    });

  }

  viewSchedule(row: any) {
    // open a modal-like backdrop with row data instead of navigating
    try {
      const payload = row && row.raw ? row.raw : row;
      this.selectedSchedule = payload;
    } catch (e) { this.selectedSchedule = row; }
  }

  closeModal() { this.selectedSchedule = null; }

  // localized formatter for various date inputs
  formatDate(v: any) {
    if (!v) return '';
    try {
      const d = (v instanceof Date) ? v : new Date(v);
      if (isNaN(d.getTime())) return String(v);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[d.getDay()];
      const dd = String(d.getDate()).padStart(2, '0');
      const mmm = months[d.getMonth()];
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      return `${dayName} ${dd}-${mmm}-${yyyy} ${hh}:${mm}`;
    } catch (e) { return String(v); }
  }

  // Helper to extract a readable name for an assigned user entry
  getAssignedName(u: any): string {
    if (!u && u !== 0) return '';
    if (typeof u === 'string' || typeof u === 'number') return String(u);
    if (typeof u === 'object') return (u.name || u.user_name || u.full_name || u.userName || u.displayName || '');
    return '';
  }

  // Helper to extract an email for an assigned user entry
  getAssignedEmail(u: any): string {
    if (!u && u !== 0) return '';
    if (typeof u === 'string' || typeof u === 'number') return '';
    if (typeof u === 'object') return (u.email || u.user_email || u.email_address || u.userEmail || '');
    return '';
  }

  private getScheduleId(row: any): any {
    if (!row) return null;
    return row.schedule_id || row.id || row._id || row.scheduleId || row.raw?.schedule_id || row.raw?.id || row.raw?._id || row.raw?.scheduleId || null;
  }

  editSchedule(row: any) {
    const id = this.getScheduleId(row);
    if (!id) {
      try { notify('Schedule id missing. Unable to edit this schedule.', 'error'); } catch (e) { }
      return;
    }
    // store the full row (prefer original backend object if available) so the editor can prefill
    try {
      const source = row && row.raw ? row.raw : row;
      const payload = { ...source, schedule_id: source.schedule_id || id };
      // normalize publish/review keys to common names to help the editor prefill toggles
      try {
        const normalizeBool = (v: any) => {
          if (typeof v === 'boolean') return v;
          if (typeof v === 'number') return v === 1;
          if (typeof v === 'string') return ['1','true','yes','on'].includes(v.toLowerCase());
          return !!v;
        };
        // gather potential fields and set canonical keys
        const pub = payload.publish ?? payload.published ?? payload.is_published ?? payload.isPublished ?? payload.published_flag;
        const rev = payload.user_review ?? payload.userreview ?? payload.review_available ?? payload.review ?? payload.allow_review;
        if (typeof pub !== 'undefined') payload.publish = normalizeBool(pub);
        if (typeof rev !== 'undefined') payload.user_review = normalizeBool(rev);

        // Normalize assigned_users to array of ids so the edit form can preselect assigned users
        try {
          const au = payload.assigned_users || payload.assignedUsers || payload.assignees || payload.users || [];
          let normalized: string[] = [];
          if (!au) normalized = [];
          else if (Array.isArray(au)) {
            normalized = au.map((x: any) => {
              if (!x && x !== 0) return '';
              if (typeof x === 'string' || typeof x === 'number') return String(x);
              if (typeof x === 'object') return String(x.user_id || x.id || x._id || x.uid || x.userId || x.value || '');
              return String(x);
            }).filter((v: string) => v && v.length);
          } else if (typeof au === 'string') {
            // CSV or single id
            normalized = au.split(',').map(s => s.trim()).filter(s => s.length);
          } else if (typeof au === 'object') {
            // single object
            const v = au.user_id || au.id || au._id || au.uid || au.userId || '';
            normalized = v ? [String(v)] : [];
          }
          payload.assigned_users = normalized;
        } catch (e) { payload.assigned_users = payload.assigned_users || []; }
      } catch (e) { /* ignore */ }
      sessionStorage.setItem('edit_exam', JSON.stringify(payload));
    } catch (e) { /* ignore storage errors */ }
    // navigate to the schedule editor page (route used for creating/editing schedules)
    this.saveScheduleReturnState();
    this.router.navigate(['/schedule-exam']);
  }

  deleteSchedule(row: any) {
    this.confirmService.confirm({ title: 'Delete Scheduled Exam', message: 'Delete this scheduled exam?', confirmText: 'Delete', cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      const id = row.id;
      // best-effort delete endpoint; adapt to your backend if different
      const current_user = sessionStorage.getItem('user_id')
      const url = `${this.baseUrl}/delete/exam-schedule/${encodeURIComponent(id)}?current_user=${encodeURIComponent(String(current_user))}`;
      this.http.delete<any>(url).subscribe({
        next: () => {
          this.schedules = this.schedules.filter(s => s.id !== id);
          this.dataSource.data = this.schedules;
          try { notify('Schedule deleted', 'success');
            this.loadSchedules(this.selectedInstitute || undefined);
           } catch(e) {}
        }, error: (err) => {
          console.error('Failed to delete schedule', err);
          try { notify('Failed to delete schedule', 'error'); } catch(e) {}
          // still remove locally for responsiveness
          this.schedules = this.schedules.filter(s => s.id !== id);
          this.dataSource.data = this.schedules;
        }
      });
    });
  }

  togglePublish(row: any) {
    const newState = !row.publish;
    this.confirmService.confirm({ title: (newState ? 'Publish' : 'Unpublish') + ' Schedule', message: `Are you sure you want to ${newState ? 'publish' : 'unpublish'} this schedule?`, confirmText: newState ? 'Publish' : 'Unpublish', cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      // optimistic update
      const prev = row.publish;
      row.publish = newState;
      const id = row.id || row.schedule_id;
      const action = newState ? 'activate' : 'deactivate';
      const url = `${this.baseUrl}/exam-schedule/${action}/${encodeURIComponent(String(id))}`;
      const payload = { current_user: (() => { try { const raw = sessionStorage.getItem('user'); return raw ? (JSON.parse(raw).user_id || JSON.parse(raw).userId) : undefined; } catch(e){ return undefined; } })() };
      this.http.put<any>(url, payload).subscribe({ next: (res) => {
        try { notify(res?.statusMessage || 'Schedule updated', 'success'); } catch (e) {}
      }, error: (err) => {
        console.error('Failed to update publish', err);
        row.publish = prev;
        const msg = err?.error?.statusMessage || err?.message || 'Failed to update schedule';
        try { notify(msg, 'error'); } catch(e) {}
      } });
    });
  }
  openScheduleExam(): void {
    this.saveScheduleReturnState();
    this.router.navigate(['/schedule-exam']);
  }

  saveScheduleReturnState(): void {
    try {
      sessionStorage.setItem('schedule_return_state', JSON.stringify({
        search: this.search,
        selectedInstitute: this.selectedInstitute,
        instituteSearch: this.instituteSearch,
        filterName: this.filterName,
        selectedDepartments: this.selectedDepartments,
        selectedTeams: this.selectedTeams,
        filterCreationDateAfter: this.filterCreationDateAfter ? this.filterCreationDateAfter.toISOString() : null,
        filterCreationDate: this.filterCreationDate ? this.filterCreationDate.toISOString() : null,
        filterActiveStatus: this.filterActiveStatus,
        filterCreatedByMe: this.filterCreatedByMe,
        hasAppliedFilters: this.hasAppliedFilters,
        schedules: this.schedules
      }));
    } catch (e) { }
  }

  private restoreScheduleReturnState(): void {
    try {
      const raw = sessionStorage.getItem('schedule_return_state');
      if (!raw) return;
      sessionStorage.removeItem('schedule_return_state');
      const state = JSON.parse(raw);
      this.search = state?.search || '';
      this.selectedInstitute = state?.selectedInstitute || '';
      this.instituteSearch = state?.instituteSearch || '';
      this.filterName = state?.filterName || '';
      this.selectedDepartments = Array.isArray(state?.selectedDepartments) ? state.selectedDepartments : [];
      this.selectedTeams = Array.isArray(state?.selectedTeams) ? state.selectedTeams : [];
      this.filterCreationDateAfter = state?.filterCreationDateAfter ? new Date(state.filterCreationDateAfter) : null;
      this.filterCreationDate = state?.filterCreationDate ? new Date(state.filterCreationDate) : null;
      this.filterActiveStatus = typeof state?.filterActiveStatus === 'undefined' ? null : state.filterActiveStatus;
      this.filterCreatedByMe = !!state?.filterCreatedByMe;
      this.hasAppliedFilters = !!state?.hasAppliedFilters;
      this.schedules = Array.isArray(state?.schedules) ? state.schedules : [];
      this.dataSource.data = this.schedules;
      this.applyFilter(this.search || '');
    } catch (e) {
      try { sessionStorage.removeItem('schedule_return_state'); } catch (_) { }
    }
  }
}
