import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/home/service/auth.service';
import { API_BASE } from 'src/app/shared/api.config';
import { HttpClient, HttpClientModule, HttpEventType, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-admin-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatIconModule, MatStepperModule, MatDatepickerModule, MatTooltipModule, RouterModule],
  providers: [
    DatePipe
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class AdminUserRegisterComponent implements OnInit {
  filteredStates: Array<any> = [];
  filteredCities: Array<any> = [];
  form: FormGroup;
  // { value: 'super_admin', label: 'Super Admin' },
  roles = [
     { value: 'super_admin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

  get availableRoles() {
    if (this.isSuperAdmin && this.isProfluentInstituteSelected()) return this.roles;
    return this.roles.filter(r => r.value !== 'super_admin');
  }

  private isProfluentInstituteSelected(): boolean {
    const selectedInstituteId = this.form?.get('institute')?.value;
    const selectedInstitute = this.institutes.find((institute) => String(institute.id) === String(selectedInstituteId));
    const instituteName = (selectedInstitute?.name || '').trim().toLowerCase();
    return instituteName === 'profluent lab' || instituteName === 'profluent labs';
  }
  institutes: Array<{ id: string; name: string }> = [];
  loadingInstitutes = false;
  submitting = false;
  // campus & location lists
  campuses: Array<any> = [];
  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];
  // Bulk upload state
  bulkFile: File | null = null;
  bulkUploading = false;
  bulkUploadResult: string | null = null;
  bulkPreviewRows: Array<any> = [];
  bulkValidated: boolean = false;
  bulkValidationReport: any = null;
  uploadProgress: number = 0;
  // toggle for bulk upload mode (bound by template)
  bulkMode: boolean = true;
  bulkInstitute: string = '';
  isDragOver = false;
  // bulk institute user limit info
  bulkUserLimit: { max_user_limit?: number | null; available_licenses?: number | null; already_assigned?: number | null } = { max_user_limit: null, available_licenses: null, already_assigned: null };
  bulkLimitLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  get bulkUploadAllowed(): boolean {
    return (this.bulkUserLimit.available_licenses ?? 0) > 0 && !this.bulkLimitLoading;
  }
  departmentsLoading = false;
  isEditing = false;
  editingUserId: string | null = null;
  // logged-in user's institute and role
  loggedInstitute: string = '';
  isSuperAdmin = false;
  private _authSub: any = null;
  private destroy$ = new Subject<void>();
  // lists populated from institute-scoped APIs
  departments: Array<{ id: string; name: string }> = [];
  teams: Array<{ id: string; name: string }> = [];
  // pages and permissions for user-management block
  pagesList: Array<{ key: string; name: string; id?: string }> = [];
  pagesPermissions: { [pageKey: string]: { view: boolean; add: boolean; edit: boolean; delete: boolean } } = {};
  showUserManagement: boolean = false;
  // header select-all checkbox state for pages permissions
  selectAll: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthService, private pageMeta: PageMetaService, private notify: NotificationService, private loader: LoaderService) {
    this.form = this.fb.group({
      institute: ['', Validators.required],
      role: ['', Validators.required],
      campus: [''],
      country: [''],
      state: [''],
      city: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      joining_date: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      department: [''],
      team: [''],
      phone: ['', []],
      active: [true],
      note: ['']
    }, { validators: this.passwordsMatch });
  }

  ngOnInit(): void {
    this.loader.show();
    try{
      const raw = sessionStorage.getItem('edit_user');
      if (raw) this.isEditing = true;
    } catch(e) { /* ignore */ }
    this.pageMeta.setMeta(this.isEditing ? 'Edit user':'Register user', this.isEditing ? 'Edit user information and save changes' : 'Register a new user and assign role & institute');
    // orchestrate initialization (small helpers)
    this.setupAuth();
    this.setupFormListeners();
    this.loadInitialData();
    this.handleEditUserPrefill();
    this.loader.hide();
  }

  private setupAuth() {
    try {
      if (this._authSub && this._authSub.unsubscribe) {
        try { this._authSub.unsubscribe(); } catch (e) { }
      }
      // subscribe and ensure teardown via destroy$
      this._authSub = this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user: any) => {
        this.isSuperAdmin = !!user && ['super_admin', 'superadmin', 'super-admin'].includes((user.role || '').toLowerCase());
        const ctrl = this.form.get('institute');
        if (!this.isSuperAdmin) {
          try { ctrl?.disable({ emitEvent: false }); } catch (e) { }
        } else {
          try { ctrl?.enable({ emitEvent: false }); } catch (e) { }
        }
      });
    } catch (e) { this.isSuperAdmin = false; }
  }

  private setupFormListeners() {
    // role changes: adjust validators and lazy-load pages list for admin
    const roleCtrl = this.form.get('role');
    roleCtrl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      const deptCtrl = this.form.get('department');
      const teamCtrl = this.form.get('team');
      if (val === 'user') {
        deptCtrl?.setValidators([Validators.required]);
        teamCtrl?.setValidators([Validators.required]);
      } else {
        deptCtrl?.clearValidators();
        teamCtrl?.clearValidators();
      }
      deptCtrl?.updateValueAndValidity();
      teamCtrl?.updateValueAndValidity();

      // show user-management only for admin role (lazy-load pages list)
      try {
        this.showUserManagement = (val === 'admin');
        if (this.showUserManagement) {
          if (!this.pagesList || this.pagesList.length === 0) this.loadPagesList();
          this.initPermissions();
        } else {
          this.pagesPermissions = {};
        }
      } catch (e) { }
    });

    // institute changes
    this.form.get('institute')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((iid) => {
      if (!this.isProfluentInstituteSelected() && this.form.get('role')?.value === 'super_admin') {
        // Super Admin users can only be created under Profluent Lab/Labs.
        this.form.patchValue({ role: '' }, { emitEvent: false });
      }
      if (iid) {
        this.loadDepartments(iid);
        this.loadTeams(iid);
        this.loadCampusList(iid);
        this.loadLocationHierarchy(iid);
      } else {
        this.departments = [];
        this.teams = [];
        this.campuses = [];
        this.countries = [];
        this.states = [];
        this.cities = [];
      }
    });

    // country selection: populate filteredStates
    this.form.get('country')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((countryId) => {
      const cid = countryId == null ? '' : String(countryId);
      if (!cid) {
        this.filteredStates = [];
        try { this.form.patchValue({ state: '', city: '' }); } catch (e) {}
        return;
      }
      // Prefer pre-loaded states; fallback to deriving from campuses
      let statesSource: any[] = [];
      if (this.states && this.states.length) statesSource = this.states.map((s: any) => ({ code: String(s.code || s.id || ''), name: s.name || '', country_id: String(s.country_id || '') }));
      else statesSource = (this.campuses || []).map((c: any) => ({ code: String(c.state?.state_id || c.state?.id || ''), name: c.state?.state_name || c.state?.name || '', country_id: String(c.country?.country_id || c.country?.id || '') }));
      this.filteredStates = (statesSource || []).filter((s: any) => !s.country_id || String(s.country_id) === String(cid)).map((s: any) => ({ code: String(s.code || ''), name: s.name || '' }));
      try { this.form.patchValue({ state: '', city: '' }); } catch (e) {}
    });

    // state selection: populate filteredCities
    this.form.get('state')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((stateId) => {
      const sid = stateId == null ? '' : String(stateId);
      if (!sid) {
        this.filteredCities = [];
        try { this.form.patchValue({ city: '' }); } catch (e) {}
        return;
      }
      try {
        this.filteredCities = this.resolveCitiesForState(sid);
      } catch (e) { this.filteredCities = []; }
      try { this.form.patchValue({ city: '' }); } catch (e) {}
    });

    // campus selection: fetch campus location details and populate the location fields
    this.form.get('campus')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((cid) => {
      if (!cid) {
        this.form.patchValue({ country: '', state: '', city: '' });
        this.states = [];
        this.cities = [];
        this.filteredStates = [];
        this.filteredCities = [];
        return;
      }
      this.loadCampusLocation(cid);
    });
  }

  private loadInitialData() {
    this.loader.show();
    // load institutes early so selects render; other lists are loaded when institute selected
    try { this.loadInstitutes(); } catch (e) {}

    // read logged in user profile and set institute defaults
    try {
      const cur = this.auth?.currentUserValue || null;
      const raw = (!cur) ? (sessionStorage.getItem('user_profile') || sessionStorage.getItem('user')) : null;
      const obj = cur || (raw ? JSON.parse(raw) : null) || null;
      const globalInstituteId = sessionStorage.getItem('global_institute_id') || '';
      this.loggedInstitute = globalInstituteId || obj?.institute_id || obj?.instituteId || obj?.institute || '';
      if (!this.isEditing && this.loggedInstitute) {
        this.bulkInstitute = this.loggedInstitute;
        try { this.form.patchValue({ institute: this.loggedInstitute }); } catch (e) { }
        this.fetchBulkUserLimit(this.bulkInstitute);
        try {
          this.loadDepartments(this.loggedInstitute);
          this.loadTeams(this.loggedInstitute);
          this.loadCampusList(this.loggedInstitute);
          this.loadLocationHierarchy(this.loggedInstitute);
          this.loader.hide();
        } catch (e) { this.loader.hide(); }
      } else {
        this.loader.hide();
      }
    } catch (e) { 
      this.loader.hide(); }
  }

  private handleEditUserPrefill() {
    try {
      const raw = sessionStorage.getItem('edit_user');
      if (!raw) return;
      const u = JSON.parse(raw);
      this.isEditing = true;
      this.editingUserId = u.user_id || u.id || null;
      this.form.patchValue({
        institute: u.institute?.institute_id || u.institute_id || u.institute || '',
        role: u.user_role || u.role || '',
        username: u.user_name || '',
        name: u.full_name || u.user_name || u.name || '',
        email: u.email || '',
        joining_date: u.joining_date ? (typeof u.joining_date === 'string' ? (u.joining_date.length >= 10 ? u.joining_date.substring(0, 10) : u.joining_date) : '') : '',
        department: u.department?.department_id || u.department_id || u.department || '',
        team: u.team?.team_id || u.team_id || u.team || '',
        phone: u.contact_no || u.phone || '',
        active: (typeof u.active_status === 'boolean') ? u.active_status : (u.active_status === 1 || u.active_status === '1'),
        note: u.notes || u.note || ''
      });
      const iid = this.form.get('institute')?.value;
      if (iid) { this.loadDepartments(iid); this.loadTeams(iid); this.loadCampusList(iid); this.loadLocationHierarchy(iid);}
      try {
        const campusId = u.campus?.campus_id || u.campus_id || u.campus || '';
        const countryId = u.campus?.country?.country_id || u.country || u.country_id || '';
        const stateId = u.campus?.state?.state_id || u.state || u.state_id || '';
        const cityId = u.campus?.city?.city_name || u.campus?.city?.name || u.campus?.city?.city_id || u.city || u.city_id || '';
        this.form.patchValue({ campus: campusId, country: countryId, state: stateId, city: cityId });
      } catch (e) { }
      try {
        this.showUserManagement = (['admin', 'super_admin'].includes(this.form.get('role')?.value));
        if (this.showUserManagement) {
          if (!this.pagesList || this.pagesList.length === 0) this.loadPagesList();
        }
        this.initPermissions();
        this.setPermissionsFromUser(u);
      } catch (e) { }
      sessionStorage.removeItem('edit_user');
      try {
        if (this.isEditing) {
          const pwd = this.form.get('password');
          const cpwd = this.form.get('confirmPassword');
          pwd?.clearValidators(); pwd?.setValue(''); pwd?.updateValueAndValidity();
          cpwd?.clearValidators(); cpwd?.setValue(''); cpwd?.updateValueAndValidity();
        }
      } catch (e) { }
    } catch (e) { /* ignore parse errors */ }
  }

  loadPagesList() {
    this.loader.show();
    const url = `${API_BASE}/get_pages_list`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        try {
          const data = res?.data || res?.pages || [];
          this.pagesList = (data || []).map((p: any) => ({ key: p.key || p.page_id || p.id || p.name, name: p.name || p.page_name || p.page || p.key }));
          this.initPermissions();
        } catch (e) { this.pagesList = []; }
          finally { this.loader.hide(); }
      },
      error: (err) => { console.warn('Failed to load pages list', err); this.pagesList = []; this.loader.hide(); }
    });
  }

  initPermissions() {
    if (!this.pagesList) this.pagesList = [];
    for (const p of this.pagesList) {
      if (!this.pagesPermissions[p.key]) {
        this.pagesPermissions[p.key] = { view: false, add: false, edit: false, delete: false };
      }
    }
  }

  // helper to set permissions from existing user object when editing
  setPermissionsFromUser(u: any) {
    try {
      const src = u.page_access || u.pages || u.page_permissions || u.pages_list || [];
      // support array of {page_key, view, add, edit, delete} or object map
      if (Array.isArray(src)) {
        src.forEach((it: any) => {
          const key = it.page_key || it.key || it.page || it.id;
          if (!key) return;
          this.pagesPermissions[key] = { view: !!it.view, add: !!it.add, edit: !!it.edit, delete: !!it.delete };
        });
      } else if (typeof src === 'object' && src !== null) {
        Object.keys(src).forEach(k => {
          const it = src[k];
          this.pagesPermissions[k] = { view: !!it.view, add: !!it.add, edit: !!it.edit, delete: !!it.delete };
        });
      }
    } catch (e) { /* ignore */ }
  }

  // Toggle all pages for a specific action (column header)
  toggleAllAction(action: 'view' | 'add' | 'edit' | 'delete', checked: boolean) {
    Object.keys(this.pagesPermissions || {}).forEach(k => { if (this.pagesPermissions[k]) this.pagesPermissions[k][action] = !!checked; });
  }

  // Toggle all actions for a single page (row-level 'All')
  toggleAllForPage(pageKey: string, checked: boolean) {
    if (!this.pagesPermissions[pageKey]) return;
    const keys: Array<'view' | 'add' | 'edit' | 'delete'> = ['view', 'add', 'edit', 'delete'];
    keys.forEach(a => this.pagesPermissions[pageKey][a] = !!checked);
  }

  // Toggle all permissions for all pages (header 'select all')
  toggleSelectAll(checked: boolean) {
    this.selectAll = !!checked;
    const keys = Object.keys(this.pagesPermissions || {});
    for (const k of keys) {
      const p = this.pagesPermissions[k];
      if (!p) continue;
      p.view = this.selectAll;
      p.add = this.selectAll;
      p.edit = this.selectAll;
      p.delete = this.selectAll;
    }
  }

  // helpers for header checkbox state
  isAllChecked(action: 'view' | 'add' | 'edit' | 'delete') {
    const keys = Object.keys(this.pagesPermissions || {});
    if (keys.length === 0) return false;
    return keys.every(k => this.pagesPermissions[k] && this.pagesPermissions[k][action]);
  }

  isIndeterminate(action: 'view' | 'add' | 'edit' | 'delete') {
    const keys = Object.keys(this.pagesPermissions || {});
    if (keys.length === 0) return false;
    const some = keys.some(k => this.pagesPermissions[k] && this.pagesPermissions[k][action]);
    const all = keys.every(k => this.pagesPermissions[k] && this.pagesPermissions[k][action]);
    return some && !all;
  }

  // row-level helpers
  isAllActionsForPage(pageKey: string) {
    const p = this.pagesPermissions[pageKey];
    if (!p) return false;
    return p.view && p.add && p.edit && p.delete;
  }

  loadInstitutes() {
    this.loader.show();
    this.loadingInstitutes = true;
    const url = `${API_BASE}/get-institute-list`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        try {
          const data = res?.data || [];
          this.institutes = data.map((i: any) => ({ id: i.institute_id, name: i.short_name }));
        } catch (e) { this.institutes = []; }
        this.loadingInstitutes = false;
        this.loader.hide();
      },
      error: (err) => { console.error('Failed loading institutes', err); this.loadingInstitutes = false; this.institutes = []; this.loader.hide(); }
    });
  }

  loadDepartments(instituteId: string) {
    this.loader.show();
    const url = `${API_BASE}/get-department-list`;
    this.departmentsLoading = true;
    // try with institute_id param first, then fallback to institute if empty
    const attempt = (params: any, retryIfEmpty = false) => {
      this.http.get<any>(url, { params }).subscribe({
        next: (res) => {
          try {
            const data = res?.data || [];
            if ((!data || data.length === 0) && retryIfEmpty) {
              // retry with alternate param name
              attempt({ institute: instituteId }, false);
              return;
            }
            this.departments = data.map((d: any) => ({ id: d.dept_id || d.id || d.deptId, name: d.name }));
          } catch (e) { this.departments = []; }
          finally { this.departmentsLoading = false; this.loader.hide(); }
        },
        error: (err) => { console.warn('Failed to load departments', err); this.departments = []; this.departmentsLoading = false; this.loader.hide(); }
      });
    };

    attempt({ institute_id: instituteId }, true);
  }

  loadTeams(instituteId: string) {
    this.loader.show();
    const url = `${API_BASE}/get-teams-list`;
    this.http.get<any>(url, { params: { institute_id: instituteId } }).subscribe({
      next: (res) => {
        try { const data = res?.data || []; this.teams = data.map((t: any) => ({ id: t.team_id || t.id || t.teamId, name: t.name })); } catch (e) { this.teams = []; }
        finally { this.loader.hide(); }
      }, error: (err) => { console.warn('Failed to load teams', err); this.teams = []; this.loader.hide(); }
    });
  }


  // New: call the dedicated campus-list endpoint
  loadCampusList(instituteId: string) {
    this.loader.show();
    const url = `${API_BASE}/get-campus-list`;
    this.http.get<any>(url, { params: { institute_id: instituteId } }).subscribe({
      next: (res) => {
        try {
          const data = res?.data || res?.campuses || [];
          this.campuses = (data || []).map((c: any) => ({
            id: c.campus_id || c.id || c.campusId,
            name: c.name || c.campus_name || c.label || '',
            address: c.address || '',
            // Keep campus location in the dropdown data so campus changes can reflect immediately.
            country: c.country || null,
            country_id: c.country?.country_id || c.country_id || '',
            state: c.state || null,
            state_id: c.state?.state_id || c.state_id || '',
            city: c.city || null,
            city_id: c.city?.city_id || c.city_id || '',
            city_name: c.city?.city_name || c.city_name || ''
          }));
        } catch (e) { this.campuses = []; }
        finally { this.loader.hide(); }
      }, error: (err) => { console.warn('Failed to load campus-list', err); this.campuses = []; this.loader.hide(); }
    });
  }

  // New: load country/state/city hierarchy scoped to institute
  loadLocationHierarchy(instituteId: string) {
    this.loader.show();
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url, { params: { institute_id: instituteId } }).subscribe({
      next: (res) => {
        try {
          // Prefer structured countries list
          const countries = res?.data?.countries || res?.countries || [];
          this.countries = (countries || []).map((c: any) => ({ code: String(c.country_code || c.code || c.id || ''), name: c.country_name || c.name || c.country || '' }));

          // Collect states and cities from the structured payload, being defensive about shapes
          const allCities: any[] = [];
          const statesAcc: any[] = [];

          if (Array.isArray(countries)) {
            countries.forEach((country: any) => {
              const countryId = country?.country_code || country?.code || country?.id || '';
              if (Array.isArray(country.states)) {
                country.states.forEach((s: any) => {
                  const stateCode = s?.state_code || s?.code || s?.id || '';
                  statesAcc.push({ code: stateCode, name: s?.state_name || s?.name || s?.state || '', country_id: String(s?.country_id || s?.countryId || countryId || '') });
                  if (Array.isArray(s.cities)) {
                    s.cities.forEach((city: any) => allCities.push(Object.assign({}, city, { __state_code: stateCode })));
                  }
                });
              }
              if (Array.isArray(country.cities)) {
                country.cities.forEach((city: any) => allCities.push(Object.assign({}, city, { __country_id: countryId })));
              }
            });
          }

          // Fallback to top-level cities if none found in structured countries
          if (allCities.length === 0 && (res?.data?.cities || res?.cities)) {
            (res?.data?.cities || res?.cities || []).forEach((city: any) => allCities.push(city));
          }

          // Normalize cities and states
          this.cities = allCities.map((c: any) => ({ code: String(c.city_code || c.code || c.id || ''), name: c.city_name || c.name || c.city || '', state_id: String(c.__state_code || c.state_id || c.stateId || c.state || '') }));

          // include any top-level states from response
          if (Array.isArray(res?.data?.states)) res.data.states.forEach((s: any) => statesAcc.push({ code: String(s.state_code || s.code || s.id || ''), name: s.state_name || s.name || s.state || '', country_id: String(s.country_id || s.countryId || '') }));
          else if (Array.isArray(res?.states)) res.states.forEach((s: any) => statesAcc.push({ code: String(s.state_code || s.code || s.id || ''), name: s.state_name || s.name || s.state || '', country_id: String(s.country_id || s.countryId || '') }));

          this.states = statesAcc.filter((x: any, i: number, a: any[]) => x.code && a.findIndex(y => y.code === x.code) === i).map((s: any) => ({ code: String(s.code), name: s.name, country_id: String(s.country_id || '') }));

          // Populate filtered lists used by the selects so UI shows options immediately
          const curCountry = String(this.form.get('country')?.value || '');
          if (curCountry) {
            this.filteredStates = (this.states || []).filter((s: any) => !s.country_id || String(s.country_id) === curCountry).map((s: any) => ({ code: s.code, name: s.name }));
          } else {
            this.filteredStates = (this.states || []).map((s: any) => ({ code: s.code, name: s.name }));
          }

          const curState = String(this.form.get('state')?.value || '');
          if (curState) {
            this.filteredCities = this.resolveCitiesForState(curState);
          } else {
            this.filteredCities = [];
          }
        } catch (e) {
          this.countries = [];
          this.states = [];
          this.cities = [];
        } finally {
          this.loader.hide();
        }
      }, error: (err) => {
        console.warn('Failed to load location-hierarchy for institute', err);
        this.countries = [];
        this.states = [];
        this.cities = [];
        this.filteredStates = [];
        this.filteredCities = [];
        this.loader.hide();
      }
    });
  }

  private loadCampusLocation(campusId: string) {
    if (!campusId) {
      this.form.patchValue({ country: '', state: '', city: '' });
      this.filteredStates = [];
      this.filteredCities = [];
      return;
    }
    const selectedCampus = (this.campuses || []).find((campus: any) => String(campus.id || campus.campus_id || '') === String(campusId));
    if (selectedCampus) {
      // Reflect the selected campus location immediately; the API response below can refresh the same fields.
      this.patchCampusLocation(selectedCampus);
    }
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url, { params: { campus_id: campusId } }).subscribe({
      next: (res) => {
        try {
          const data = res?.data || {};
          const cities = Array.isArray(data.cities) ? data.cities : [];
          const states = Array.isArray(data.states) ? data.states : [];
          const countries = Array.isArray(data.countries) ? data.countries : [];

          const city = cities[0] || {};
          const selectedCityId = String(city.id || city.city_id || city.code || city.city_code || '').trim();
          const selectedCityName = String(city.name || city.city_name || city.city || '').trim();
          const selectedStateId = String(city.state_id || city.stateId || city.state || '').trim();
          const fallbackStateId = states[0] ? String(states[0].id || states[0].state_id || states[0].code || states[0].state_code || '').trim() : '';

          const selectedState = states.find((s: any) => String(s.id || s.state_id || s.code || s.state_code || '').trim() === selectedStateId);
          const selectedCountryId = String(
            (selectedState && (selectedState.country_id || selectedState.countryId || selectedState.country)) ||
            (countries[0] && (countries[0].id || countries[0].country_id || countries[0].code || '')) ||
            ''
          ).trim();

          if (countries.length) {
            this.countries = countries.map((c: any) => ({ code: String(c.id || c.country_id || c.code || ''), name: c.name || c.country_name || '' }));
          }
          if (states.length) {
            this.states = states.map((s: any) => ({ code: String(s.id || s.state_id || s.code || ''), name: s.name || s.state_name || '', country_id: String(s.country_id || s.countryId || s.country || '') }));
          }
          if (cities.length) {
            this.cities = cities.map((c: any) => ({ code: String(c.id || c.city_id || c.code || ''), name: c.name || c.city_name || '', state_id: String(c.state_id || c.stateId || c.state || '') }));
          }

          const countryId = selectedCountryId || this.extractLocationId(data, 'country');
          const stateId = selectedStateId || fallbackStateId || this.extractLocationId(data, 'state');
          const cityId = selectedCityName || selectedCityId || this.extractLocationId(data, 'city');

          this.patchCampusLocation({ country_id: countryId, state_id: stateId, city: cityId });
        } catch (e) {
          console.warn('Failed to parse campus location response', e);
        }
      },
      error: (err) => { console.warn('Failed to load location-hierarchy for campus', err); }
    });
  }

  private extractLocationId(payload: any, key: 'country' | 'state' | 'city'): string {
    if (!payload) return '';
    const raw = payload[key] ?? payload[`${key}_id`] ?? payload[`${key}Id`] ?? payload[`${key}_code`] ?? payload[`${key}Code`] ?? '';
    if (!raw && key === 'country') {
      // if response is a single location object with its own name/code values
      return String(payload.country_id || payload.countryCode || payload.country_code || payload.country || '');
    }
    if (!raw) return '';
    if (typeof raw === 'object') {
      return String(raw[`${key}_id`] || raw.id || raw.code || raw[`${key}_code`] || raw[`${key}Id`] || raw[`${key}Code`] || '').trim();
    }
    return String(raw).trim();
  }

  private patchCampusLocation(campus: any) {
    const countryId = campus?.country?.country_id || campus?.country?.id || campus?.country_id || campus?.country || '';
    const stateId = campus?.state?.state_id || campus?.state?.id || campus?.state_id || campus?.state || '';
    const cityValue = campus?.city?.city_name || campus?.city?.name || campus?.city_name || campus?.city || campus?.city_id || '';

    // Patch without firing country/state listeners, because those listeners clear dependent fields.
    this.form.patchValue({
      country: countryId || '',
      state: stateId || '',
      city: cityValue || ''
    }, { emitEvent: false });

    this.updateLocationFilters(countryId, stateId);
  }

  private updateLocationFilters(countryId: string, stateId: string) {
    const countryKey = String(countryId || '');
    if (countryKey) {
      this.filteredStates = (this.states || []).filter((s: any) => !s.country_id || String(s.country_id) === countryKey).map((s: any) => ({ code: s.code, name: s.name }));
    } else {
      this.filteredStates = (this.states || []).map((s: any) => ({ code: s.code, name: s.name }));
    }
    this.filteredCities = stateId ? this.resolveCitiesForState(String(stateId)) : [];
  }

  // Return normalized list of cities for a given state identifier
  resolveCitiesForState(stateIdentifier: string) {
    const sid = stateIdentifier == null ? '' : String(stateIdentifier);
    if (!sid) return [];
    const candidates: any[] = [];
    try {
      if (this.cities && this.cities.length) {
        for (const c of this.cities) {
          const cs = String(c.state_id || c.state || c.stateId || '');
          const cc = String(c.code || c.city_code || c.id || '');
          if (cs === sid || cc === sid) candidates.push({ code: cc, name: c.name || c.city_name || '' });
        }
      }
      // fallback: derive from campuses
      if (candidates.length === 0 && this.campuses && this.campuses.length) {
        for (const cp of this.campuses) {
          const cps = String(cp.state?.state_id || cp.state?.id || cp.state || '');
          if (cps === sid) {
            const city = cp.city || {};
            const cityCode = String(city?.city_id || city?.id || '');
            if (cityCode) candidates.push({ code: cityCode, name: city?.city_name || city?.name || '' });
          }
        }
      }
    } catch (e) { return []; }
    // dedupe
    const unique: any[] = [];
    for (const it of candidates) {
      if (!it || !it.code) continue;
      if (!unique.find(u => u.code === it.code)) unique.push(it);
    }
    return unique.map(c => ({ code: String(c.code), name: c.name || '' }));
  }

  // --- Review helpers: name lookups ---
  getInstituteName(instId: any): string | null {
    if (!instId) return null;
    try { const i = this.institutes.find(x => String(x.id) === String(instId)); return i ? i.name : null; } catch (e) { return null; }
  }

  getRoleLabel(roleKey: any): string | null {
    if (!roleKey) return null;
    try { const r = this.roles.find(x => x.value === roleKey); return r ? r.label : String(roleKey); } catch (e) { return String(roleKey); }
  }

  getDepartmentName(deptId: any): string | null { if (!deptId) return null; try { const d = this.departments.find(x => String(x.id) === String(deptId)); return d ? d.name : null; } catch (e) { return null; } }
  getTeamName(teamId: any): string | null { if (!teamId) return null; try { const t = this.teams.find(x => String(x.id) === String(teamId)); return t ? t.name : null; } catch (e) { return null; } }
  getCampusName(campusId: any): string | null { if (!campusId) return null; try { const c = this.campuses.find(x => String(x.id) === String(campusId)); return c ? c.name : null; } catch (e) { return null; } }
  getCountryName(code: any): string | null { if (!code) return null; try { const c = this.countries.find(x => String(x.code) === String(code)); return c ? c.name : null; } catch (e) { return null; } }
  getStateName(code: any): string | null { if (!code) return null; try { const s = this.states.find(x => String(x.code) === String(code)); return s ? s.name : null; } catch (e) { return null; } }
  getCityName(code: any): string | null { if (!code) return null; try { const c = this.cities.find(x => String(x.code) === String(code)); return c ? c.name : null; } catch (e) { return null; } }

  // --- Privileges helpers for review ---
  getPrivilegesOverview(): Array<any> {
    try {
      const pages = this.pagesList || [];
      return pages.map(p => ({ key: p.key, name: p.name, ...(this.pagesPermissions[p.key] || {}) }));
    } catch (e) { return []; }
  }

  getPrivilegesCounts() {
    try {
      const overview = this.getPrivilegesOverview();
      const counts = { total: overview.length, view: 0, add: 0, edit: 0, delete: 0 };
      for (const p of overview) {
        if (p.view) counts.view++;
        if (p.add) counts.add++;
        if (p.edit) counts.edit++;
        if (p.delete) counts.delete++;
      }
      return counts;
    } catch (e) { return { total: 0, view: 0, add: 0, edit: 0, delete: 0 }; }
  }

  // navigate step helper used by review edit buttons
  goToStep(stepper: any, index: number) {
    try { if (stepper && typeof stepper.selectedIndex !== 'undefined') stepper.selectedIndex = index; } catch (e) { }
  }


  passwordsMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }

  back() {
    // navigate back to view users
    this.router.navigate(['/view-users']);
  }

  submit(stepper?: any) {
    this.loader.show();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const roleControl = this.form.get('role');
      if (roleControl?.invalid) {
        roleControl.markAsTouched();
        this.goToStep(stepper, this.isEditing ? 1 : 2);
        this.notify.error('Please select a role before registering.');
      }
      this.loader.hide();
      return;
    }
    const v = this.form.value;
    const currentUserRaw = sessionStorage.getItem('user') || sessionStorage.getItem('user_profile');
    let current_user: any = null;
    try { current_user = currentUserRaw ? JSON.parse(currentUserRaw) : null; } catch (e) { current_user = currentUserRaw || null; }
    const payload: any = {
      // prefer sending both username and display name
      user_name: v.username || v.name,
      display_name: v.name,
      email: v.email,
      password: v.password,
      user_role: v.role,
      institute_id: v.institute,
      campus_id: v.campus || null,
      country_id: v.country || null,
      state_id: v.state || null,
      city_id: v.city || null,
      department_id: v.department || null,
      team_id: v.team || null,
      joining_date: v.joining_date || null,
      contact_no: v.phone,
      active_status: v.active,
      note: v.note,
      current_user: (current_user && (current_user.user_id || current_user.id)) ? (current_user.user_id || current_user.id) : null
    };
    // include page-level permissions if any
    try {
      const pages: any[] = [];
      Object.keys(this.pagesPermissions || {}).forEach(k => {
        const p = this.pagesPermissions[k];
        pages.push({ page_key: k, view: !!p.view, add: !!p.add, edit: !!p.edit, delete: !!p.delete });
      });
      if (pages.length) payload.page_access = pages;
    } catch (e) { }
    this.submitting = true;

    if (this.isEditing && this.editingUserId) {
      // update existing user
      const url = `${API_BASE}/update-user/${this.editingUserId}`;
      this.http.put<any>(url, payload).subscribe({
        next: (res) => {
          this.submitting = false;
          this.notify.success(res?.statusMessage || 'User updated');
          this.router.navigate(['/view-users']);
        },
        error: (err) => { this.submitting = false; console.error('Update failed', err); this.notify.error('Failed to update user. See console.'); this.loader.hide(); }
      });
    } else {
      const url = `${API_BASE}/register-user`;
      // if user cannot change institute (non-super admin), ensure payload uses loggedInstitute
      if (this.loggedInstitute) payload.institute_id = this.loggedInstitute;
      this.http.post<any>(url, payload).subscribe({
        next: (res) => { this.submitting = false; this.notify.success(res?.statusMessage || 'User registered'); this.router.navigate(['/view-users']); },
        complete: () => { this.loader.hide(); },
        error: (err) => {
          this.submitting = false;
          this.loader.hide();
          console.error('Register failed', err);
          const serverMsg = err?.error?.statusMessage || err?.error?.message || err?.statusMessage || err?.message || (typeof err === 'string' ? err : null);
          this.notify.error(serverMsg ? `Failed to register user. ${serverMsg}` : 'Failed to register user.');
        }
      });
    }
  }

  ngOnDestroy(): void {
    try { if (this._authSub && this._authSub.unsubscribe) this._authSub.unsubscribe(); } catch (e) { }
    try { this.destroy$.next(); this.destroy$.complete(); } catch(e) {}
  }

  // ----- Bulk upload helpers -----
  downloadTemplate() {
    // Create a simple CSV template that Excel can open.
    const headers = [
      'full_name',
      'username',
      'email',
      'contact_no',
      'role',
      'department',
      'team',
      'campus',
      'joining_date',
      'password',
    ];
    const sample = [
      ['John Doe', 'jdoe', 'jdoe@example.com', '+911234567890', 'user', 'Sales', 'Alpha', 'Main Campus', '2025-01-01', 'Secret123']
    ];
    const rows = [headers, ...sample].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-upload-template.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  onBulkFileChange(ev: any) {
    const f = ev?.target?.files?.[0] || null;
    this.bulkFile = f;
    this.bulkUploadResult = null;
  }

  triggerBulkFileSelect() {
    const el = document.getElementById('bulkFileInput') as HTMLInputElement | null;
    if (el) el.click();
  }

  onDragOver(ev: DragEvent) { ev.preventDefault(); this.isDragOver = true; }
  onDragLeave(ev: DragEvent) { ev.preventDefault(); this.isDragOver = false; }
  onDrop(ev: DragEvent) {
    ev.preventDefault(); this.isDragOver = false;
    const f = ev.dataTransfer?.files?.[0] || null;
    if (f) { this.bulkFile = f; this.bulkUploadResult = null; }
  }

  // Validate file on server without committing (dry-run)
  validateBulk() {
    if (!this.bulkFile) { this.notify.error('Please select a file to validate'); return; }
    const url = `${API_BASE}/bulk-register-users`;
    const fd = new FormData();
    fd.append('file', this.bulkFile, this.bulkFile.name);
    if (this.bulkInstitute) fd.append('institute_id', this.bulkInstitute);
    fd.append('current_user', this.getCurrentUserId() || 'admin');
    fd.append('validateOnly', 'true');
    this.bulkUploading = true; this.bulkUploadResult = null; this.bulkValidated = false; this.bulkPreviewRows = [];
    this.http.post<any>(url, fd).subscribe({
      next: (res) => {
        this.bulkUploading = false;
        this.bulkValidationReport = res?.data || res?.report || null;
        this.bulkPreviewRows = (this.bulkValidationReport?.preview || []).slice(0,5);
        this.bulkValidated = true;
        this.bulkUploadResult = res?.statusMessage || 'Validation finished';
      },
      error: (err) => { console.error('Bulk validation failed', err); this.bulkUploading = false; this.bulkUploadResult = 'Validation failed. See console.'; }
    });
  }

  // Confirm upload after successful validation or direct upload
  confirmUpload() {
    this.loader.show();
    if (!this.bulkFile) { this.notify.error('Please select a file to upload'); this.loader.hide(); return; }
    const url = `${API_BASE}/bulk-register-users`;
    const fd = new FormData();
    fd.append('file', this.bulkFile, this.bulkFile.name);
    if (this.bulkInstitute) fd.append('institute_id', this.bulkInstitute);
    fd.append('current_user', this.getCurrentUserId() || 'admin');
    this.bulkUploading = true; this.bulkUploadResult = null; this.uploadProgress = 0;
    this.http.post(url, fd, { reportProgress: true, observe: 'events', responseType: 'blob' }).subscribe({
      next: (ev: HttpEvent<Blob>) => {
        if (ev.type === HttpEventType.UploadProgress && ev.total) {
          this.uploadProgress = Math.round(100 * (ev.loaded / ev.total));
        } else if (ev.type === HttpEventType.Response) {
          this.bulkUploading = false;
          this.bulkValidated = false;
          this.bulkPreviewRows = [];
          const contentType = ev.headers.get('Content-Type') || '';
          const disposition = ev.headers.get('Content-Disposition') || '';

          if (contentType.includes('application/json')) {
            if (ev.body) {
              this.readBlobAsJson(ev.body).then((data) => {
                this.bulkUploadResult = data?.statusMessage || 'Upload finished';
              }).catch(() => {
                this.bulkUploadResult = 'Upload finished';
              });
            } else {
              this.bulkUploadResult = 'Upload finished';
            }
          } else if (contentType.includes('text/csv') || disposition.includes('attachment')) {
            if (ev.body) {
              const filename = this.getFileNameFromContentDisposition(disposition) || 'bulk_upload_errors.csv';
              this.downloadBlob(ev.body, filename);
              this.bulkUploadResult = 'Upload failed. Error report downloaded.';
            } else {
              this.bulkUploadResult = 'Upload failed. Error report returned without body.';
            }
          } else {
            this.bulkUploadResult = 'Upload finished';
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        this.bulkUploading = false;
        this.loader.hide();
        if (err.error instanceof Blob) {
          const contentType = err.error.type || '';
          const disposition = err.headers?.get('Content-Disposition') || '';
          if (contentType.includes('text/csv') || disposition.includes('attachment')) {
            const filename = this.getFileNameFromContentDisposition(disposition) || 'bulk_upload_errors.csv';
            this.downloadBlob(err.error, filename);
            this.bulkUploadResult = 'Upload failed. Error report downloaded.';
            return;
          }
          this.readBlobAsJson(err.error).then((data) => {
            this.bulkUploadResult = data?.statusMessage || 'Upload failed. See console for details.';
          }).catch(() => {
            this.bulkUploadResult = 'Upload failed. See console for details.';
          });
        } else {
          console.error('Bulk upload failed', err);
          this.bulkUploadResult = 'Upload failed. See console for details.';
        }
      },
      complete: () => { this.loader.hide(); }
    });
  }

  private readBlobAsJson(blob: Blob): Promise<any> {
    return blob.text().then((text) => {
      try { return JSON.parse(text); } catch { return null; }
    });
  }

  private getFileNameFromContentDisposition(contentDisposition: string | null): string | null {
    if (!contentDisposition) {
      return null;
    }
    const match = /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition) || /filename="?([^";]+)"?/i.exec(contentDisposition);
    return match ? decodeURIComponent(match[1]) : null;
  }

  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  private getCurrentUserId(): string | null {
    try {
      const storedUser = sessionStorage.getItem('user');
      const storedProfile = sessionStorage.getItem('user_profile');
      const raw = storedUser || storedProfile || sessionStorage.getItem('user_id');
      if (!raw) {
        return null;
      }
      if (raw.startsWith('{')) {
        const parsed = JSON.parse(raw);
        return parsed?.user_id || parsed?.id || null;
      }
      return raw;
    } catch {
      return sessionStorage.getItem('user_id');
    }
  }

  // Convenience wrapper kept for compatibility (direct upload)
  uploadBulk() { this.confirmUpload(); }

  // fetch user license/limit info for the selected institute (used by bulk upload UI)
  fetchBulkUserLimit(instituteId: string) {
    this.loader.show();
    if (!instituteId) {
      this.bulkUserLimit = { max_user_limit: null, available_licenses: null, already_assigned: null };
      this.loader.hide();
      return;
    }
    this.bulkLimitLoading = true;
    const url = `${API_BASE}/get-user-limit`;
    this.http.get<any>(url, { params: { institute_id: instituteId } }).subscribe({
      next: (res) => {
        try {
          const d = res?.data || {};
          this.bulkUserLimit = {
            max_user_limit: d?.max_user_limit ?? null,
            available_licenses: d?.available_licenses ?? null,
            already_assigned: d?.already_assigned ?? null
          };
        } catch (e) { this.bulkUserLimit = { max_user_limit: null, available_licenses: null, already_assigned: null }; }
        this.bulkLimitLoading = false;
      },
      error: (err) => { console.warn('Failed to load user limits', err); this.bulkLimitLoading = false; this.bulkUserLimit = { max_user_limit: null, available_licenses: null, already_assigned: null }; this.loader.hide(); },
      complete: () => { this.loader.hide(); }

    });
  }

  // Helpers to render preview rows in template
  get previewHeaders(): string[] {
    if (!this.bulkPreviewRows || this.bulkPreviewRows.length === 0) return [];
    const first = this.bulkPreviewRows[0];
    if (typeof first === 'object' && first !== null) return Object.keys(first);
    return [];
  }

  rowValues(row: any): any[] {
    if (!row) return [];
    if (Array.isArray(row)) return row;
    if (typeof row === 'object') return Object.keys(row).map(k => row[k]);
    return [row];
  }
}

