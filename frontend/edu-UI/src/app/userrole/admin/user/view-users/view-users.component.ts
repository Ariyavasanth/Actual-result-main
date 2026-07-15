import { Component, OnInit, ViewChild,OnDestroy, AfterViewInit,ElementRef, TemplateRef,ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_BASE } from 'src/app/shared/api.config';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { notify } from 'src/app/shared/global-notify';
import { AuthService } from 'src/app/home/service/auth.service';
import { GlobalInstituteContextService } from 'src/app/shared/services/global-institute-context.service';
import { Subscription } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { TemplatePortal } from '@angular/cdk/portal';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { SharedModule } from 'src/app/shared/shared.module';

export interface UserRow {
  id: string;
  name: string;
  email: string;
  institute?: string;
  active: boolean;
  phone?: string;
  role?: string;
  raw?: any;
  department?: string;
  team?: string;
  privileges?: any[];
  user_privileges?: any[];
}

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatTabsModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, FormsModule, RouterModule, HttpClientModule, MatPaginatorModule, MatSortModule,OverlayModule, PortalModule, SharedModule],
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnDestroy, OnInit {
  // loading = false;
  // show full name, institute, role, department, team, active
  columns = ['name','institute','role','department','team','active','actions'];
  filter = '';
  selectedInstitute = '';
  instituteSearch = '';
  users: UserRow[] = [];
  dataSource = new MatTableDataSource<UserRow>([]);
  hasAppliedFilters = false;
  rawRecords: any[] = [];

  // pagination
  pageSize = 25;
  pageIndex = 0; // zero-based index for MatPaginator
  totalCount = 0; // total records from API

  // filter model and lists (match fields in the filters panel)
  filters: any = { institute: '', name: '', department: '', team: '', joining_from: '', joining_to: '', active_status: '', country: '', city: '', industry: '', sector: '' };
  // institutes: Array<{ id: string; name: string }> = [];
  institutes: Array<{ institute_name: string; short_name: string; institute_id?: string }> = [];
  countries: Array<{ code: string; name: string }> = [];
  states: Array<{ code: string; name: string }> = [];
  cities: Array<{ code: string; name: string }> = [];
  departments: Array<{ id: string; name: string }> = [];
  teams: Array<{ id: string; name: string }> = [];
  departmentSearch = '';
  teamSearch = '';

  // Industry -> Sector dependency (mirrors view-institutes.component.ts)
  industryTypes = ['School', 'College', 'BPO', 'Bank', 'IT'];
  industrySectors = ['School', 'Engineering', 'Arts', 'Healthcare', 'Finance', 'Banking', 'IT'];
  private sectorMap: Record<string, string[]> = {
    'School': ['School'],
    'College': ['Engineering', 'Arts'],
    'BPO': ['Healthcare', 'Finance'],
    'Bank': ['Bank'],
    'IT': ['IT']
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filtersBtn', { read: ElementRef }) filtersBtn!: ElementRef;
  @ViewChild('filtersPanel') filtersPanelTpl!: TemplateRef<any>;
  selectedUser: any = null;
  editing = false;
  editableUser: any = null;

  isSuperAdmin = false;
  isGlobalInstituteActive = false;
  // Country/City/Industry/Sector are Super Admin-only, and are further hidden while the
  // Super Admin has a Global Filter institute active (that institute already scopes the page).
  get showLocationAndIndustryFilters(): boolean {
    return this.isSuperAdmin && !this.isGlobalInstituteActive;
  }

  private _subs: Subscription | null = null;
  private _globalInstituteSub: Subscription | null = null;
  private activeInstituteId = '';
  constructor(private http: HttpClient, private router: Router, private loading: LoaderService, private auth: AuthService, private overlay: Overlay, private vcr: ViewContainerRef,private pageMeta: PageMetaService, private confirmService: ConfirmService, private globalInstituteContext: GlobalInstituteContextService) {
    // initialize isSuperAdmin from AuthService (synchronous helper)
    try {
      this.isSuperAdmin = this.checkSuperAdmin(this.auth.currentUserValue);
    } catch (e) { this.isSuperAdmin = false; }
    try {
      this._subs = this.auth.user$.subscribe((user: any) => {
        this.isSuperAdmin = this.checkSuperAdmin(user);
      });
    } catch (e) { /* ignore in tests */ }
    try {
      this._globalInstituteSub = this.globalInstituteContext.activeInstitute$.subscribe(context => {
        this.isGlobalInstituteActive = this.globalInstituteContext.isGlobalFilterActive();
        const instituteId = context?.institute_id || '';
        if (instituteId) {
          if (instituteId === this.activeInstituteId) return;
          this.resetForInstituteChange(instituteId);
          return;
        }
        if (this.activeInstituteId) this.resetAfterGlobalInstituteClear();
      });
    } catch (e) { /* ignore in tests */ }
  }

  private checkSuperAdmin(user: any): boolean {
    try {
      const role = (user?.role || user?.user_role || sessionStorage.getItem('userRole') || '').toString().toLowerCase();
      return ['super_admin', 'superadmin', 'super-admin'].includes(role);
    } catch (e) {
      return false;
    }
  }

  ngOnDestroy(): void {
    try { this._subs?.unsubscribe(); } catch (e) { /* ignore */ }
    try { this._globalInstituteSub?.unsubscribe(); } catch (e) { /* ignore */ }
    this.saveUsersReturnState();
  }
  private filtersOverlayRef: OverlayRef | null = null;
  ngOnInit(): void{

    this.pageMeta.setMeta('Users', 'Manage platform users');
    this.loadInstitutes();
    this.loadCountries();
    this.restoreUsersReturnState();
    // this.loadCities();

    try { } catch(e) {}
  }

  onInstituteChange(iid: string) {
    try {
      this.selectedInstitute = iid || '';
      this.filters.institute = iid || '';
      this.syncInstituteSearch();
      this.pageIndex = 0;
      // Department depends on Institute, Team depends on Department - clear both downstream.
      this.filters.department = '';
      this.filters.team = '';
      this.departmentSearch = '';
      this.teamSearch = '';

      if (iid) {
        this.loadDepartments(iid);
        this.loadTeams(iid);
      } else {
        // Clear institute filter and reload all users
        this.departments = [];
        this.teams = [];
      }
    } catch (e) { }
  }

  onDepartmentFilterChange() {
    // Team has no real data dependency on Department (no department_id on teams), so we only
    // gate its enabled state here - clearing the selection when Department is cleared.
    if (!this.filters.department) this.filters.team = '';
  }

  filteredDepartments() {
    const query = (this.departmentSearch || '').trim().toLowerCase();
    return query ? this.departments.filter(d => d.name.toLowerCase().includes(query)) : this.departments;
  }

  filteredTeams() {
    const query = (this.teamSearch || '').trim().toLowerCase();
    return query ? this.teams.filter(t => t.name.toLowerCase().includes(query)) : this.teams;
  }

  onDepartmentSearchChange() {
    const selected = this.departments.find(d => String(d.id) === String(this.filters.department));
    if (selected?.name !== this.departmentSearch) {
      this.filters.department = '';
      this.filters.team = '';
      this.teamSearch = '';
    }
  }

  onTeamSearchChange() {
    const selected = this.teams.find(t => String(t.id) === String(this.filters.team));
    if (selected?.name !== this.teamSearch) this.filters.team = '';
  }
  onDepartmentSelected(departmentName: string | null) {
    if (!departmentName) {
      // "Any" selected: clear the department filter (and dependent team filter) instead of
      // sending the literal "Any" value to the backend.
      this.filters.department = '';
      this.departmentSearch = 'Any';
      this.onDepartmentFilterChange();
      return;
    }
    const department = this.departments.find(d => d.name === departmentName);
    if (!department) return;
    this.filters.department = department.id;
    this.departmentSearch = department.name;
    this.onDepartmentFilterChange();
  }

  onTeamSelected(teamName: string | null) {
    if (!teamName) {
      // "Any" selected: clear the team filter instead of sending the literal "Any" value.
      this.filters.team = '';
      this.teamSearch = 'Any';
      return;
    }
    const team = this.teams.find(t => t.name === teamName);
    if (!team) return;
    this.filters.team = team.id;
    this.teamSearch = team.name;
  }
  // load departments for the selected institute
  loadDepartments(instituteId: string) {
    const url = `${API_BASE}/get-department-list`;
    this.http.get<any>(url, { params: { institute_id: instituteId } }).subscribe({ next: (res) => {
      try { const data = res?.data || []; this.departments = data.map((d: any) => ({ id: d.dept_id || d.id || d.deptId, name: d.name })); this.departmentSearch = this.departments.find(d => String(d.id) === String(this.filters.department))?.name || ''; } catch(e){ this.departments = []; }
    }, error: () => { this.departments = []; } });
  }

  // load teams for the selected institute
  loadTeams(instituteId: string) {
    const url = `${API_BASE}/get-teams-list`;
    this.http.get<any>(url, { params: { institute_id: instituteId } }).subscribe({ next: (res) => {
      try { const data = res?.data || []; this.teams = data.map((t: any) => ({ id: t.team_id || t.id || t.teamId, name: t.name })); this.teamSearch = this.teams.find(t => String(t.id) === String(this.filters.team))?.name || ''; } catch(e) { this.teams = []; }
    }, error: () => { this.teams = []; } });
  }

  ngAfterViewInit(): void {
    // Do NOT assign paginator to dataSource for server-side pagination
    // this.dataSource.paginator = this.paginator; // This enables client-side pagination - REMOVE IT
    try { this.dataSource.sort = this.sort; } catch(e) {}
    // Load initial data
    // this.loadUsers();
  }

 
  applyFilter(value: string){
    const q = (value || '').trim().toLowerCase();
    this.dataSource.filter = q;
    // Reset to first page when filter text changes
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  get filtered(){
    const q = (this.filter||'').toLowerCase();
    if (!q) return this.users;
    return this.users.filter(u =>
      (u.name||'').toLowerCase().includes(q) ||
      (u.email||'').toLowerCase().includes(q) ||
      (u.institute||'').toLowerCase().includes(q) ||
      (u.phone||'').toLowerCase().includes(q) ||
      (u.role||'').toLowerCase().includes(q)
    );
  }

  get appliedFilterChips(): Array<{ key: string; label: string; removable: boolean }> {
    if (!this.hasAppliedFilters) return [];
    const chips: Array<{ key: string; label: string; removable: boolean }> = [];
    const instituteId = this.filters.institute || this.selectedInstitute;
    if (instituteId) chips.push({ key: 'institute', label: `Institute: ${this.getInstituteLabel(instituteId)}`, removable: this.isSuperAdmin });
    if (this.filters.name) chips.push({ key: 'name', label: `Name: ${this.filters.name}`, removable: true });
    if (this.filters.department) chips.push({ key: 'department', label: `Department: ${this.getSelectedName(this.departments, this.filters.department)}`, removable: true });
    if (this.filters.team) chips.push({ key: 'team', label: `Team: ${this.getSelectedName(this.teams, this.filters.team)}`, removable: true });
    if (this.filters.country) chips.push({ key: 'country', label: `Country: ${this.getSelectedName(this.countries, this.filters.country, 'code')}`, removable: true });
    if (this.filters.city) chips.push({ key: 'city', label: `City: ${this.filters.city}`, removable: true });
    if (this.filters.active_status !== '') chips.push({ key: 'active_status', label: `Status: ${this.filters.active_status ? 'Active' : 'Inactive'}`, removable: true });
    return chips;
  }

  removeAppliedFilter(key: string) {
    if (!key) return;
    if (key === 'institute' && this.isSuperAdmin) {
      this.selectedInstitute = '';
      this.filters.institute = '';
      this.filters.department = '';
      this.filters.team = '';
      this.instituteSearch = '';
      this.departments = [];
      this.teams = [];
      this.countries = [];
      this.cities = [];
    } else if (key === 'name') this.filters.name = '';
    else if (key === 'department') { this.filters.department = ''; this.filters.team = ''; }
    else if (key === 'team') this.filters.team = '';
    else if (key === 'country') { this.filters.country = ''; this.filters.city = ''; }
    else if (key === 'city') this.filters.city = '';
    else if (key === 'active_status') this.filters.active_status = '';
    this.pageIndex = 0;
    this.refreshInstituteScope();
    this.refreshAfterFilterChipChange();
  }

  clearAppliedFilters() { this.resetFilters(); }

  private refreshAfterFilterChipChange() {
    if (this.appliedFilterChips.length) this.loadUsers();
    else { this.hasAppliedFilters = false; this.users = []; this.rawRecords = []; this.dataSource.data = []; this.totalCount = 0; }
  }

  private getInstituteLabel(id: any): string {
    const found = this.institutes.find(i => String(i.institute_id) === String(id));
    return found?.institute_name || found?.short_name || String(id || '');
  }

  private getSelectedName(list: any[], selectedId: any, idKey: string = 'id'): string {
    const found = (list || []).find(item => String(item?.[idKey]) === String(selectedId));
    return found?.name || String(selectedId || '');
  }
  toggleActive(u: UserRow){
    const newState = !u.active;
    const action = newState ? 'Activate' : 'Deactivate';
    this.confirmService.confirm({ title: `${action} User`, message: `${action} user ${u.name}?`, confirmText: action, cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      // optimistic update
      const prev = u.active;
      u.active = newState;
      this.loading.show();
      const id = u.id || (u.raw && (u.raw.user_id || u.raw.id));
      if (!id) { try { notify('User id missing', 'error'); } catch(e){}; u.active = prev; return; }
      const url = `${API_BASE}/user/${newState ? 'activate' : 'deactivate'}/${encodeURIComponent(String(id))}`;
      const currentUserRaw = sessionStorage.getItem('user') || sessionStorage.getItem('user_profile');
      let current_user: any = null;
      try { current_user = currentUserRaw ? JSON.parse(currentUserRaw) : null; } catch (e) { current_user = currentUserRaw || null; }
      this.http.put<any>(url, { current_user: current_user.user_id || '' }).subscribe({
        next: (res) => { try { notify(`User ${newState ? 'activated' : 'deactivated'}`, 'success'); } catch(e){} },
        error: (err) => { console.error('Failed toggling user active', err); try { notify('Failed to update user status', 'error'); } catch(e){}; u.active = prev; },
        complete: () => this.loading.hide()
      });
    });
  }


  loadUsers(instituteId?: string){
    // if an instituteId was explicitly provided, prefer it and keep local state in sync
    if (typeof instituteId !== 'undefined' && instituteId !== null) {
      try { this.selectedInstitute = instituteId as any; } catch (e) {}
      try { this.filters.institute = String(instituteId); } catch (e) {}
    }

    this.loading.show();
    const url = `${API_BASE}/get-users`;
    // build query params from filters (prefer explicit institute param, then filter model, then selectedInstitute)
    const params: any = {};
    const instituteParam = (typeof instituteId !== 'undefined' && instituteId !== null) ? instituteId : (this.filters.institute || this.selectedInstitute);
    if (instituteParam) params.institute_id = instituteParam;
    if (this.filters.name) params.name = this.filters.name;
    if (this.filters.department) params.department = this.filters.department;
    if (this.filters.team) params.team = this.filters.team;
    if (this.filters.country) params.country = this.filters.country;
    const cityId = this.resolveCityId(this.filters.city);
    if (cityId) params.city = cityId;
    if (this.filters.campus) params.campus = this.filters.campus;
    if (this.filters.joining_from) params.joining_from = this.filters.joining_from;
    if (this.filters.joining_to) params.joining_to = this.filters.joining_to;
    if (this.filters.active_status !== '') params.active_status = this.filters.active_status;
    // include pagination params (API expects pageNumber and pageSize)
    try {
      params.pageNumber = (this.pageIndex || 0) + 1; // send 1-based page number
      params.pageSize = this.pageSize || 25;
    } catch(e) {}

    this.http.get<any>(url, { params }).subscribe({
      next: (res) => {
        try{
          // support different shapes: top-level data array or res.data
          const data = res?.data || res?.users || res || [];
          // total count may be provided as totalCount or total_count
          this.totalCount = Number(res?.totalCount ?? res?.total_count ?? res?.data?.totalCount ?? res?.data?.total_count ?? res?.total ?? 0) || 0;
          // map API user shape to UserRow expected by the table
          this.rawRecords = data;
          this.users = data.map((u: any) => ({
            id: u.user_id || u.id,
            // prefer API full_name when available
            name: u.full_name || u.name || `${u.first_name||''} ${u.last_name||''}`.trim() || u.email,
            user_name: u.user_name,
            email: u.email,
            institute: (u.institute && (u.institute.institute_name || u.institute.short_name)) || u.institute_name || '',
            active: (typeof u.active_status === 'boolean') ? u.active_status : (u.active_status === 1 || u.active_status === '1'),
            phone: u.contact_no || u.phone || '',
            role: u.user_role || u.role || '',
            joining_date: u.joining_date || u.joining || '',
            department: (u.department && (u.department.department_name || u.department.name)) || u.department_name || '',
            team: (u.team && (u.team.team_name || u.team.name)) || u.team_name || '',
            campus: (u.campus && (u.campus.campus_name || u.campus.name)) || u.campus_name || '',
            country: (u.country && (u.country.country_name || u.country.name)) || u.country_name || '',
            state: (u.state && (u.state.state_name || u.state.name)) || u.state_name || '',
            city: (u.city && (u.city.city_name || u.city.name)) || u.city_name || '',
            created_by: u.created_by || '',
            created_date: u.created_date || u.created_at || '',
            updated_by: u.updated_by || '',
            updated_date: u.updated_date || u.updated_at || '',
            // normalize privileges from API (support multiple keys)
            privileges: (u.user_privileges || u.privileges || []).map((p: any) => ({
              page_id: p.page_id || p.pageId || p.id,
              page_name: p.page_name || p.pageName || p.page || p.name,
              can_add: !!p.can_add,
              can_delete: !!p.can_delete,
              can_edit: !!p.can_edit,
              can_view: !!p.can_view,
              raw: p
            })),
            user_privileges: u.user_privileges || u.privileges || [],
            raw: u
          }));
          this.dataSource.data = this.users;
          this.dataSource.filterPredicate = (d: UserRow, filter: string) => {
            const q = (filter || '').toLowerCase();
            return (d.name||'').toLowerCase().includes(q) || (d.email||'').toLowerCase().includes(q) || (d.institute||'').toLowerCase().includes(q) || (d.department||'').toLowerCase().includes(q) || (d.team||'').toLowerCase().includes(q);
          };
        }catch(e){ console.error('Error mapping users', e); this.users = []; }
        this.loading.hide();
      },
      error: (err) => { console.error('Failed loading users', err); this.loading.hide(); this.users = []; }
    });
  }
  private hasFilterValues(): boolean {
    return !!(
      this.filters.institute ||
      this.filters.name ||
      this.filters.department ||
      this.filters.team ||
      this.filters.joining_from ||
      this.filters.joining_to ||
      this.filters.active_status !== '' ||
      this.filters.country ||
      this.filters.city
    );
  }

  applyFilters(){
    if (!this.hasFilterValues()) {
      try { notify('Please add filters in the filter form.', 'info'); } catch (e) {}
      return;
    }
    this.pageIndex = 0;
    this.hasAppliedFilters = true;
    this.loadUsers();
    this.closeFiltersOverlay();
  }

  resetFilters(){
    this.pageIndex = 0;
    this.filters = { institute: '', name: '', department: '', team: '', joining_from: '', joining_to: '', active_status: '', country: '', city: '', industry: '', sector: '' };
    this.selectedInstitute = '';
    this.instituteSearch = '';
    this.departmentSearch = '';
    this.teamSearch = '';
    this.filter = '';
    this.dataSource.filter = '';
    this.states=[];
    this.cities = [];
    this.departments = [];
    this.teams = [];
    this.loadInstitutes();
    if (!this.isSuperAdmin) {
      try {
        const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
        const user = raw ? JSON.parse(raw) : null;
        const instId = user?.institute_id || user?.instituteId || user?.institute || '';
        if (instId) {
          this.selectedInstitute = instId;
          this.filters.institute = String(instId);
          this.syncInstituteSearch();
          this.loadDepartments(instId);
          this.loadTeams(instId);
          this.loadCountries(instId);
        }
      } catch (e) { /* ignore malformed session data */ }
    }
    this.users = [];
    this.rawRecords = [];
    this.dataSource.data = [];
    this.totalCount = 0;
    this.hasAppliedFilters = false;
  }

  onPageEvent(ev: PageEvent){
    try{
      this.pageIndex = ev.pageIndex || 0;
      this.pageSize = ev.pageSize || this.pageSize;
      if (!this.hasAppliedFilters) return;
      this.loadUsers();
    }catch(e){}
  }

  // load all cities (not scoped to a country) so city dropdown can show global options
  loadCities(){
    this.loading.show();
    this.cities = [];
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url).subscribe({ next: (res) => {
      try{
        // try top-level cities first
        let citiesRaw = res?.data?.cities || res?.cities || [];
        // if cities are nested under countries/states, aggregate them
        if ((!citiesRaw || citiesRaw.length === 0) && (res?.data?.countries || res?.countries)){
          const countries = res?.data?.countries || res?.countries || [];
          let agg: any[] = [];
          if (Array.isArray(countries)){
            countries.forEach((c:any)=>{ if (Array.isArray(c.cities)) agg = agg.concat(c.cities); if (Array.isArray(c.states)) c.states.forEach((s:any)=>{ if (Array.isArray(s.cities)) agg = agg.concat(s.cities); }); });
          }
          citiesRaw = agg;
        }
        this.cities = (citiesRaw || []).map((c:any)=> ({ code: c.city_code || c.code || c.id, name: c.city_name || c.name || c.city }));
      }catch(e){ this.cities = []; }
      this.loading.hide();
    }, error: () =>  { this.cities = []; this.loading.hide(); } });
  }

  loadInstitutes(){ 
    this.loading.show();
    const url = `${API_BASE}/get-institute-list`;
    this.http.get<any>(url).subscribe({ next: (res) => {
      const data = res?.data||[];
      // ensure each institute object includes an institute_id property so session-based lookup works
      this.institutes = data.map((i:any)=>({ institute_id: i.institute_id || i.id || i._id || '', institute_name: i.institute_name || i.name || i.short_name || '', short_name: i.short_name || i.institute_name || i.name || '' }));
          // If a selectedInstitute is already set (e.g. via route/session), prefer that
          try {
            if (this.selectedInstitute) {
              const found = this.institutes.find(i => String(i.institute_id) === String(this.selectedInstitute));
              if (found) {
                // ensure exact match type/value and load schedules
                this.selectedInstitute = found.institute_id as any;
                try { this.filters.institute = String(this.selectedInstitute); } catch (e) { /* ignore */ }
                this.syncInstituteSearch();
                this.loadDepartments(this.selectedInstitute);
                this.loadTeams(this.selectedInstitute);
                this.loadCountries(this.selectedInstitute);
                return;
              }
            }
          } catch (e) { /* ignore */ }

          // Fallback: try reading user's institute from sessionStorage and apply it
          try {
            const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
            if (!this.isSuperAdmin && raw) {
              const u = JSON.parse(raw);
              const instId = u?.institute_id || u?.instituteId || u?.institute || '';
              if (instId) {
                const found = this.institutes.find(i => String(i.institute_id) === String(instId));
                if (found) {
                  this.selectedInstitute = found.institute_id as any;
                  try { this.filters.institute = String(this.selectedInstitute); } catch (e) { /* ignore */ }
                  this.syncInstituteSearch();
                  this.loadDepartments(this.selectedInstitute);
                  this.loadTeams(this.selectedInstitute);
                  this.loadCountries(this.selectedInstitute);
                } else {
                  // institute list shape didn't match or id not present in fetched list - still set and load using raw instId
                  this.selectedInstitute = instId as any;
                  try { this.filters.institute = String(instId); } catch (e) { /* ignore */ }
                  this.syncInstituteSearch();
                  this.loadCountries(this.selectedInstitute);
                }
              }
            }
          } catch (e) { /* ignore malformed session data */ }
    }, error: () => { this.institutes = []; this.loading.hide(); } });
    this.loading.hide();
  }

  filteredInstitutes() {
    const q = (this.instituteSearch || '').trim().toLowerCase();
    if (!q) return this.institutes;
    return this.institutes.filter((i: any) => (i.institute_name || i.short_name || '').toLowerCase().includes(q));
  }

  onInstituteAutocompleteSelected(id: string) {
    this.selectedInstitute = id || '';
    this.filters.institute = this.selectedInstitute;
    this.syncInstituteSearch();
    this.onInstituteChange(this.selectedInstitute);
  }

  private syncInstituteSearch() {
    const found = this.institutes.find(i => String(i.institute_id) === String(this.selectedInstitute || ''));
    this.instituteSearch = found ? found.institute_name : '';
  }

  // Populate the Country filter only from countries used by registered institutes.
  loadCountries(instituteId?: string) {
    this.countries = [];
    const hierarchyUrl = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(hierarchyUrl).subscribe({
      next: (hierarchyRes) => {
        try {
          const locationCountries = hierarchyRes?.data?.countries || hierarchyRes?.countries || hierarchyRes?.data || [];
          const hierarchyCountries = (Array.isArray(locationCountries) ? locationCountries : []).map((country: any) => ({
            code: country.country_code || country.code || country.id,
            name: country.country_name || country.name || country.country
          })).filter((country: any) => country.code && country.name);

          this.http.get<any>(`${API_BASE}/get-institutes`).subscribe({
            next: (instituteRes) => {
              try {
                const institutes = Array.isArray(instituteRes?.data) ? instituteRes.data : [];
                const registeredCountries: Array<{ code: string; name: string }> = [];
                institutes.forEach((institute: any) => {
                  const locations = [institute, ...(Array.isArray(institute?.campuses) ? institute.campuses : [])];
                  locations.forEach((location: any) => {
                    const rawCountry = location?.country;
                    const countryCode = location?.country_id || location?.country_code
                      || (typeof rawCountry === 'object' ? rawCountry?.country_id || rawCountry?.id || rawCountry?.country_code || rawCountry?.code : rawCountry);
                    const countryName = location?.country_name
                      || (typeof rawCountry === 'object' ? rawCountry?.country_name || rawCountry?.name || rawCountry?.country : rawCountry);
                    const hierarchyMatch = hierarchyCountries.find((country: any) =>
                      (countryCode && String(country.code).toLowerCase() === String(countryCode).toLowerCase())
                      || (countryName && String(country.name).trim().toLowerCase() === String(countryName).trim().toLowerCase())
                    );
                    const resolved = hierarchyMatch || (countryCode && countryName ? { code: countryCode, name: countryName } : null);
                    if (resolved) registeredCountries.push({ code: String(resolved.code), name: String(resolved.name).trim() });
                  });
                });
                const uniqueByName = new Map<string, { code: string; name: string }>();
                registeredCountries.forEach(country => {
                  const key = country.name.toLowerCase();
                  if (!uniqueByName.has(key)) uniqueByName.set(key, country);
                });
                this.countries = Array.from(uniqueByName.values()).sort((a, b) => a.name.localeCompare(b.name));
              } catch (e) {
                this.countries = [];
              }
            },
            error: () => { this.countries = []; }
          });
        } catch (e) {
          this.countries = [];
        }
      },
      error: () => { this.countries = []; }
    });
  }
  // load states and cities for a selected country (aggregate from countries payload or request country scoped)
  onCountryChange(){
    this.states = [];
    this.cities = [];
    this.filters.city = '';
    if(!this.filters.country) { this.refreshInstituteScope(); return; }
    const url = `${API_BASE}/location-hierarchy`;
    const selectedCountry = this.filters.country;
    this.http.get<any>(url, { params: { country_id: selectedCountry } }).subscribe({ next: (res) => {
      try{
        // states: prefer top-level states array
        const statesRaw = res?.data?.states || res?.states || [];
        this.states = (Array.isArray(statesRaw) ? statesRaw : []).map((s:any)=> ({ code: s.state_code || s.code || s.id, name: s.state_name || s.name || s.state }));

        // cities: try top-level cities first (they may include state_id references)
        let citiesRaw = res?.data?.cities || res?.cities || [];
        let allCities: any[] = [];

        if (Array.isArray(citiesRaw) && citiesRaw.length > 0) {
          // filter top-level cities to those whose state belongs to the selected country
          const stateIds = (Array.isArray(statesRaw) ? statesRaw.map((s:any) => (s.id || s.state_id || s.code || s.state_code)).filter(Boolean) : []);
          if (stateIds.length > 0) {
            allCities = citiesRaw.filter((c:any) => stateIds.includes(c.state_id || c.state || c.stateId || c.state_code));
          } else {
            // no states returned; include all top-level cities as a fallback
            allCities = citiesRaw;
          }
        } else {
          // aggregate from countries -> cities and countries -> states -> cities, preferring the selected country
          const countries = res?.data?.countries || res?.countries || [];
          if (Array.isArray(countries) && countries.length > 0) {
            const foundCountry = countries.find((ct:any) => String(ct.id || ct.country_id || ct.country_code || ct.code) === String(selectedCountry));
            if (foundCountry) {
              if (Array.isArray(foundCountry.cities)) allCities = allCities.concat(foundCountry.cities);
              if (Array.isArray(foundCountry.states)) foundCountry.states.forEach((s:any) => { if (Array.isArray(s.cities)) allCities = allCities.concat(s.cities); });
            } else {
              // fallback: aggregate all countries
              countries.forEach((c:any) => {
                if (Array.isArray(c.cities)) allCities = allCities.concat(c.cities);
                if (Array.isArray(c.states)) c.states.forEach((s:any)=>{ if (Array.isArray(s.cities)) allCities = allCities.concat(s.cities); });
              });
            }
          } else {
            allCities = res?.data?.cities || res?.cities || [];
          }
        }

        this.cities = (allCities || []).map((c:any)=> ({ code: c.city_code || c.code || c.id, name: c.city_name || c.name || c.city }));
      }catch(e){ this.states = []; this.cities = []; }
      this.refreshInstituteScope();
    }, error: () => { this.states = []; this.cities = []; this.refreshInstituteScope(); } });
  }

  // City is a free-text/autocomplete field; suggestions are filtered by whatever the user typed.
  filteredCities() {
    const q = String(this.filters.city || '').trim().toLowerCase();
    if (!q) return this.cities;
    return this.cities.filter(c => (c.name || '').toLowerCase().includes(q));
  }

  // The backend's city filter (get-users / get-institutes) expects a city id, not a name, so
  // resolve the typed/selected city name back to its id here.
  private resolveCityId(cityName: string): string {
    const name = String(cityName || '').trim().toLowerCase();
    if (!name) return '';
    const found = this.cities.find(c => String(c.name || '').trim().toLowerCase() === name);
    return found ? String(found.code) : '';
  }

  onCityFilterChange() {
    this.refreshInstituteScope();
  }

  onIndustryFilterChange() {
    this.filters.sector = '';
    this.refreshInstituteScope();
  }

  scopedSectors(): string[] {
    const industry = this.filters.industry;
    if (!industry) return [];
    return this.sectorMap[industry] || [];
  }

  onSectorFilterChange() {
    this.refreshInstituteScope();
  }

  // Reload Institute options scoped to the currently selected Country/City/Industry/Sector.
  // Falls back to the full institute list (get-institute-list, via loadInstitutes) when none
  // of those are selected. Reuses the same get-institutes endpoint view-institutes uses.
  private refreshInstituteScope() {
    const params: any = {};
    if (this.filters.country) params.country = this.filters.country;
    const cityId = this.resolveCityId(this.filters.city);
    if (cityId) params.city = cityId;
    if (this.filters.industry) params.industry = this.filters.industry;
    if (this.filters.sector) params.sector = this.filters.sector;

    if (!Object.keys(params).length) {
      this.loadInstitutes();
      return;
    }

    this.http.get<any>(`${API_BASE}/get-institutes`, { params }).subscribe({
      next: (res) => {
        try {
          const data = Array.isArray(res?.data) ? res.data : [];
          this.institutes = data.map((r: any) => ({
            institute_id: r.institute_id || r.id || r._id || '',
            institute_name: r.institute_name || r.name || r.short_name || '',
            short_name: r.short_name || r.institute_name || r.name || ''
          }));
        } catch (e) {
          this.institutes = [];
        }
        if (this.selectedInstitute && !this.institutes.some(i => String(i.institute_id) === String(this.selectedInstitute))) {
          this.onInstituteChange('');
        }
      },
      error: () => { this.institutes = []; }
    });
  }

  onStateChange(){ this.cities = []; if(!this.filters.state) return; const url = `${API_BASE}/location-hierarchy`; this.http.get<any>(url, { params: { country: this.filters.country, state: this.filters.state } }).subscribe({ next: (res) => { try{ const cities = res?.data?.cities || res?.cities || res?.data || []; this.cities = cities.map((c:any)=> ({ code: c.city_code || c.code || c.id, name: c.city_name || c.name || c.city })); }catch(e){ this.cities = []; } }, error: () => { this.cities = []; } }); }

  openFiltersOverlay(){
    if(!this.filtersBtn) return;
    if(this.filtersOverlayRef){ try{ this.filtersOverlayRef.dispose(); }catch(e){}; this.filtersOverlayRef = null; }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.filtersBtn)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 }
      ])
      .withPush(true);

    this.filtersOverlayRef = this.overlay.create({ positionStrategy, hasBackdrop: true, backdropClass: 'cdk-overlay-transparent-backdrop', scrollStrategy: this.overlay.scrollStrategies.reposition() });
    this.filtersOverlayRef.backdropClick().subscribe(() => this.closeFiltersOverlay());
    this.filtersOverlayRef.keydownEvents().subscribe((ev:any) => { if(ev.key === 'Escape') this.closeFiltersOverlay(); });

    const portal = new TemplatePortal(this.filtersPanelTpl, this.vcr);
    this.filtersOverlayRef.attach(portal);
  }

  closeFiltersOverlay(){ if(this.filtersOverlayRef){ try{ this.filtersOverlayRef.dispose(); }catch(e){}; this.filtersOverlayRef = null; } }

  refresh(){
    if (!this.hasAppliedFilters) {
      try { notify('Apply filters to fetch users', 'info'); } catch (e) {}
      return;
    }
    this.loadUsers();
  }

  // Modal / actions
    viewDetails(u: UserRow){
      // store a lightweight view payload for future features (matches institutes behavior)
        const payload: any = { ...u };
        // ensure privileges are included in the view payload (prefer normalized privileges)
        try { payload.user_privileges = u.privileges && u.privileges.length ? u.privileges : (u.raw && u.raw.user_privileges) ? u.raw.user_privileges : (u.user_privileges || []); } catch(e) { payload.user_privileges = (u.user_privileges || []); }
          try { sessionStorage.setItem('view_user', JSON.stringify(payload)); } catch(e) {}
          // open detail modal using the prepared payload so normalized privileges are visible
          this.selectedUser = payload;
  }

  startEditUser(u: UserRow){
    // route to the user-register page and let that page handle editing
    try {
      const raw = u.raw || u || {};
      // normalize common alternate field names so the register form can patch correctly
      const payload: any = { ...raw };
      // ensure campus object or id fields
      payload.campus = payload.campus || (payload.campus_id ? { campus_id: payload.campus_id } : payload.campus);

      // Helper: produce YYYY-MM-DD from various date-like fields
      const fmtDate = (val: any) => {
        if (val == null || val === '') return '';
        try {
          if (val instanceof Date) return val.toISOString().slice(0,10);
          const s = String(val || '');
          // ISO-like or timestamp prefixed values
          if (s.length >= 10) return s.substring(0,10);
          return s;
        } catch(e) { return val; }
      };

      // ensure joining_date available as string YYYY-MM-DD (try many keys)
      if (!payload.joining_date) {
        payload.joining_date = fmtDate(payload.joining_date || payload.joining || payload.joiningDate || payload.joined_at || payload.joinedAt || payload.created_at || payload.createdAt || payload.joined_on || payload.joinedOn || payload.created_date || payload.createdDate || '');
      } else {
        payload.joining_date = fmtDate(payload.joining_date);
      }

      // normalize location nested objects if backend used different keys
      if (!payload.campus && payload.institute_campus) payload.campus = payload.institute_campus;

      // prefer explicit id/code fields for country/state/city. Try many possible keys and nested shapes.
      const pickId = (obj: any, candidates: string[]) => {
        try {
          for (const k of candidates) {
            const v = obj && obj[k];
            if (v !== undefined && v !== null && String(v) !== '') return String(v);
          }
        } catch(e) {}
        return '';
      };

      // country
      if (!payload.country || String(payload.country).length === 0) {
        payload.country = pickId(payload, ['country_id','countryCode','country_code','code','id']);
        if (!payload.country) payload.country = pickId(payload.country || payload, ['country_id','countryCode','country_code','code','id']);
        if (!payload.country) payload.country = pickId(payload.campus?.country || {}, ['country_id','countryCode','country_code','code','id']);
      }

      // state
      if (!payload.state || String(payload.state).length === 0) {
        payload.state = pickId(payload, ['state_id','stateCode','state_code','code','id']);
        if (!payload.state) payload.state = pickId(payload.state || payload, ['state_id','stateCode','state_code','code','id']);
        if (!payload.state) payload.state = pickId(payload.campus?.state || {}, ['state_id','stateCode','state_code','code','id']);
      }

      // city
      if (!payload.city || String(payload.city).length === 0) {
        payload.city = pickId(payload, ['city_id','cityCode','city_code','code','id']);
        if (!payload.city) payload.city = pickId(payload.city || payload, ['city_id','cityCode','city_code','code','id']);
        if (!payload.city) payload.city = pickId(payload.campus?.city || {}, ['city_id','cityCode','city_code','code','id']);
      }
      // ensure privileges are preserved when navigating to edit form (keep raw and also produce page_access for register form)
      try {
        if (!payload.user_privileges || payload.user_privileges.length === 0) payload.user_privileges = (u.privileges && u.privileges.length) ? u.privileges : (raw.user_privileges || raw.privileges || []);
      } catch(e) { payload.user_privileges = (raw.user_privileges || raw.privileges || []); }
      try {
        const ups = payload.user_privileges || [];
        if (Array.isArray(ups) && ups.length > 0) {
          // convert to page_access array expected by user-register (page_key + view/add/edit/delete)
          payload.page_access = ups.map((p: any) => ({
            page_key: p.page_id || p.pageId || p.page || p.page_key || p.key || p.page_name || p.pageName,
            view: !!(p.can_view || p.canView || p.view),
            add: !!(p.can_add || p.canAdd || p.add),
            edit: !!(p.can_edit || p.canEdit || p.edit),
            delete: !!(p.can_delete || p.canDelete || p.delete)
          }));
          // also provide a 'pages' alias in case some code looks there
          payload.pages = payload.page_access;
        }
      } catch(e) { /* ignore privilege shaping errors */ }

      // Normalize joining_date: convert common formats like DD-MM-YYYY or DD/MM/YYYY to YYYY-MM-DD
      const normalizeJoiningDate = (val: any) => {
        if (!val && val !== 0) return '';
        try {
          const s = String(val || '').trim();
          // already ISO-ish YYYY-MM-DD
          if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
          // dd-mm-yyyy or dd/mm/yyyy
          const m1 = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
          if (m1) {
            const d = m1[1].padStart(2,'0');
            const mo = m1[2].padStart(2,'0');
            const y = m1[3];
            return `${y}-${mo}-${d}`;
          }
          // try Date parse fallback
          const dt = new Date(s);
          if (!isNaN(dt.getTime())) return dt.toISOString().slice(0,10);
          return s.length >= 10 ? s.substring(0,10) : s;
        } catch(e) { return val; }
      };
      try { payload.joining_date = normalizeJoiningDate(payload.joining_date || payload.joining || payload.joiningDate || payload.joined_at || payload.joinedAt || payload.created_at || payload.createdAt || payload.joined_on || payload.joinedOn || payload.created_date || payload.createdDate || ''); } catch(e) { /* ignore */ }

      // Ensure top-level id fields for country/state/city/campus so user-register can patch selects
      try {
        // campus
        const campusId = (payload.campus && (payload.campus.campus_id || payload.campus.id)) || payload.campus_id || payload.campus || '';
        if (campusId) {
          payload.campus_id = String(campusId);
          if (!payload.campus || typeof payload.campus !== 'object') payload.campus = { campus_id: payload.campus_id };
          else payload.campus.campus_id = payload.campus.campus_id || payload.campus.id || payload.campus_id;
        }

        // country
        const countryId = (payload.country && (payload.country.country_id || payload.country.id)) || payload.country_id || payload.country || '';
        if (countryId) {
          payload.country_id = String(countryId);
          payload.country = payload.country_id;
        }

        // state
        const stateId = (payload.state && (payload.state.state_id || payload.state.id)) || payload.state_id || payload.state || '';
        if (stateId) {
          payload.state_id = String(stateId);
          payload.state = payload.state_id;
        }

        // city
        const cityId = (payload.city && (payload.city.city_id || payload.city.id)) || payload.city_id || payload.city || '';
        if (cityId) {
          payload.city_id = String(cityId);
          payload.city = payload.city_id;
        }
      } catch(e) { /* ignore */ }

      sessionStorage.setItem('edit_user', JSON.stringify(payload));
    } catch(e) {}
    this.saveUsersReturnState();
    this.router.navigate(['/user-register']);
  }

  saveEditUser(){
    if(!this.editableUser) return;
    const idx = this.users.findIndex(x => x.id === (this.editableUser.user_id || this.editableUser.id));
    if(idx >= 0){
      this.users[idx] = { ...this.users[idx], name: this.editableUser.user_name, email: this.editableUser.email, phone: this.editableUser.contact_no, role: this.editableUser.user_role, active: !!this.editableUser.active_status, raw: this.editableUser };
    }
    this.closeModal();
  }

  deleteUser(u: UserRow){
    try {
      this.confirmService.confirm({ title: 'Delete User', message: `Delete user ${u.name}? This action cannot be undone.`, confirmText: 'Delete', cancelText: 'Cancel' }).subscribe((ok) => {
        if (!ok) return;
        const uuid = u.id || (u.raw && (u.raw.user_id || u.raw.id || u.raw._id));
        if (!uuid) {
          // remove locally if no uuid
          this.users = this.users.filter(x => x.id !== u.id);
          try { notify('User removed locally', 'info'); } catch (e) {}
          return;
        }
        // let current_user= '';
        const current_user = sessionStorage.getItem('user_id')
        const url = `${API_BASE}/delete/user/${encodeURIComponent(String(uuid))}?current_user=${encodeURIComponent(String(current_user))}`;
        try { this.loading.show(); } catch(e) {}
        this.http.delete<any>(url, { observe: 'response' }).subscribe({
          next: (res) => {
            try { this.loading.hide(); } catch(e) {}
            // remove from list
            this.users = this.users.filter(x => (x.id !== uuid && x.id !== u.id));
            try { notify('User deleted successfully', 'success'); } catch (e) {}
            // reload current list to reflect server state
            try { if (this.hasAppliedFilters) this.loadUsers(this.selectedInstitute); } catch(e) {}
          },
          error: (err) => {
            try { this.loading.hide(); } catch(e) {}
            console.error('Failed to delete user', err);
            try {
              if (err && (err.status === 0 || err.status === 502 || err.status === 503)) {
                notify('Network error: cannot reach backend. Check server and network connection.', 'error');
              } else {
                notify('Failed to delete user. Please try again later.', 'error');
              }
            } catch (e) {}
          }
        });
      });
    } catch (e) {}
  }

  closeModal(){ this.selectedUser = null; this.editing = false; this.editableUser = null }
  openUserRegister(): void {
    this.saveUsersReturnState();
    this.router.navigate(['/user-register']);
  }

  saveUsersReturnState(): void {
    try {
      sessionStorage.setItem('users_return_state', JSON.stringify({
        instituteId: this.globalInstituteContext.activeInstituteId || this.selectedInstitute || '',
        globalInstituteActive: this.globalInstituteContext.isGlobalFilterActive(),
        filter: this.filter,
        selectedInstitute: this.selectedInstitute,
        instituteSearch: this.instituteSearch,
        filters: this.filters,
        users: this.users,
        rawRecords: this.rawRecords,
        hasAppliedFilters: this.hasAppliedFilters,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        totalCount: this.totalCount
      }));
    } catch (e) { }
  }

  private restoreUsersReturnState(): void {
    try {
      const raw = sessionStorage.getItem('users_return_state');
      if (!raw) return;
      sessionStorage.removeItem('users_return_state');
      const state = JSON.parse(raw);
      const activeInstituteId = this.globalInstituteContext.activeInstituteId;
      if (activeInstituteId && String(state?.instituteId || '') !== String(activeInstituteId)) return;
      if (activeInstituteId && state?.globalInstituteActive !== true) return;
      if (!activeInstituteId && state?.globalInstituteActive === true) return;
      if (!activeInstituteId && typeof state?.globalInstituteActive === 'undefined' && state?.instituteId) return;
      const restoredInstitute = state?.filters?.institute || state?.selectedInstitute || '';
      const globalInstitute = this.globalInstituteContext.activeContext;
      const globalInstituteChanged = !!globalInstitute?.institute_id &&
        String(restoredInstitute) !== String(globalInstitute.institute_id);
      this.filter = state?.filter || '';
      this.selectedInstitute = state?.selectedInstitute || '';
      this.instituteSearch = state?.instituteSearch || '';
      this.filters = state?.filters || this.filters;
      if (globalInstitute?.institute_id) {
        // The active Global Institute must override stale Users-page return state.
        this.selectedInstitute = globalInstitute.institute_id;
        this.filters.institute = globalInstitute.institute_id;
        this.instituteSearch = globalInstitute.institute_name || '';
      }
      this.users = !globalInstituteChanged && Array.isArray(state?.users) ? state.users : [];
      this.rawRecords = !globalInstituteChanged && Array.isArray(state?.rawRecords) ? state.rawRecords : [];
      this.hasAppliedFilters = !!state?.hasAppliedFilters;
      this.pageSize = Number(state?.pageSize || this.pageSize);
      this.pageIndex = Number(state?.pageIndex || 0);
      this.totalCount = Number(state?.totalCount || this.users.length || 0);
      this.dataSource.data = this.users;
      this.applyFilter(this.filter || '');
      if (globalInstituteChanged && this.hasAppliedFilters) this.loadUsers(globalInstitute!.institute_id);
    } catch (e) {
      try { sessionStorage.removeItem('users_return_state'); } catch (_) { }
    }
  }

  private resetForInstituteChange(instituteId: string): void {
    this.activeInstituteId = instituteId;
    this.selectedInstitute = instituteId;
    this.filters = { ...this.filters, institute: instituteId, name: '', department: '', team: '', joining_from: '', joining_to: '', active_status: '', country: '', city: '', industry: '', sector: '' };
    // Clear institute-specific state immediately to prevent cross-institute data leakage.
    this.users = []; this.rawRecords = []; this.dataSource.data = []; this.totalCount = 0;
    this.departments = []; this.teams = []; this.departmentSearch = ''; this.teamSearch = '';
    this.filter = ''; this.dataSource.filter = ''; this.pageIndex = 0; this.hasAppliedFilters = false;
    this.selectedUser = null; this.editing = false; this.editableUser = null;
    try { sessionStorage.removeItem('users_return_state'); } catch (e) {}
    this.loadDepartments(instituteId); this.loadTeams(instituteId); this.loadCountries(instituteId);
    // Primary records remain empty until the user applies filters.
  }

  private resetAfterGlobalInstituteClear(): void {
    this.activeInstituteId = '';
    this.selectedInstitute = '';
    this.instituteSearch = '';
    // Clear all global-scope UI data while preserving the normal filter workflow.
    this.users = []; this.rawRecords = []; this.dataSource.data = []; this.totalCount = 0;
    this.filters = { institute: '', name: '', department: '', team: '', joining_from: '', joining_to: '', active_status: '', country: '', city: '', industry: '', sector: '' };
    this.departments = []; this.teams = []; this.countries = []; this.states = []; this.cities = [];
    this.departmentSearch = ''; this.teamSearch = ''; this.filter = ''; this.dataSource.filter = '';
    this.pageIndex = 0; this.hasAppliedFilters = false; this.selectedUser = null; this.editing = false; this.editableUser = null;
    if (this.paginator) { this.paginator.firstPage(); this.paginator.length = 0; }
    this.closeFiltersOverlay();
    try { sessionStorage.removeItem('users_return_state'); } catch (e) {}
    this.loadInstitutes();
    this.loadCountries();
  }
}

