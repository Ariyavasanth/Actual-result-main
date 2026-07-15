import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit,ElementRef, TemplateRef,ViewContainerRef  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AuthService } from 'src/app/home/service/auth.service';
import { GlobalInstituteContextService } from 'src/app/shared/services/global-institute-context.service';
import { Subscription } from 'rxjs';
import { API_BASE } from 'src/app/shared/api.config';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { TemplatePortal } from '@angular/cdk/portal';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { notify } from 'src/app/shared/global-notify';

export type QuestionType = 'choose' | 'multi' | 'fill' | 'descriptive';
/* moduleName is moved into the component class as a property */
export interface QuestionOption {
  id?: string;
  text?: string;
  is_correct?: number;
}
export interface QuestionRow {
  id: number | string;
  question: string;
  category: string;
  category_description: string;
  category_id?: string | number;
  institute_id?: string | number;
  exam_id?: string | number;
  type: QuestionType | string;
  originalType?: string;
  options?: QuestionOption[]; // for MCQ
  answer?: string; // for subjective or correct answer
  marks?: number;
}

@Component({
  selector: 'app-view-questions',
  standalone: true,
  imports: [CommonModule,SharedModule, MatCardModule,  MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatPaginatorModule, FormsModule, RouterModule, HttpClientModule, MatDatepickerModule, MatTabsModule, MatCheckboxModule, MatSortModule, OverlayModule, PortalModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnDestroy,OnInit{
  // currently selected question for the details modal
  viewedQuestion: any = null;
  filter = '';
  institutes: Array<{ name: string; institute_id?: string }> = [];
  exams: Array<{ title: string; exam_id?: string }> = [];
  selectedInstitute = '';
  instituteSearch = '';
  // multi-select categories with search
  selectedCategories: string[] = [];
  categoryFilterName = '';
  categorySearch = '';
  // value used for the "select all" pseudo-option
  selectAllValue = '__SELECT_ALL_CATEGORIES__';
  questions: QuestionRow[] = [];
  displayedColumns: string[] = ['select','question', 'category', 'type', 'marks', 'actions'];
  dataSource = new MatTableDataSource<QuestionRow>([]);
  hasAppliedFilters = false;
  // selection for batch operations
  selectedQuestionIds = new Set<string|number>();
  targetCategories: Array<{ name: string; category_id?: string }> = [];
  copyMoveInProgress = false;
  selectedTargetCategory: string | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filtersBtn', { read: ElementRef }) filtersBtn!: ElementRef;
  @ViewChild('filtersPanel') filtersPanelTpl!: TemplateRef<any>;
  

  private _subs: Subscription | null = null;
  private _globalInstituteSub: Subscription | null = null;
  private activeInstituteId = '';

  private institutesUrl = `${API_BASE}/get-institute-list`;
  private examsUrl = `${API_BASE}/get-exams-list`;
  private questionsUrl = `${API_BASE}/get-questions-details`;
  private categoryDetailsUrl = `${API_BASE}/category-details`;
  private readonly questionsReturnStateKey = 'questions_return_state';
  categories: Array<any> = [];
  private questionBankMarksById = new Map<string, number>();
  private questionBankMarksByName = new Map<string, number>();
  categoryCtrl = new FormControl({ value: '', disabled: true });
  filteredCategories$: Observable<any[]> = of([]);
  departments: Array<any> = [];
  teams: Array<any> = [];
  // extra filters
  selectedDepartments: string[] = [];
  selectedTeams: string[] = [];
  filterCreationDateAfter: Date | null = null;
  filterCreationDate: Date | null = null;
  filterActiveStatus: boolean | null = null;
  filterCreatedByMe: boolean = false;
  filterPublicAccess: boolean | null = null;
  // location / industry filters that scope the Institute list (mirrors view-institutes.component.ts cascade)
  filterCountry: string = '';
  filterCity: string = '';
  filterIndustry: string = '';
  filterSector: string = '';
  countries: Array<{ code: string; name: string }> = [];
  filterCityOptions: Array<{ code: string; name: string }> = [];
  private locationHierarchyRaw: any[] = [];
  industryTypes = ['School', 'College', 'BPO', 'Bank', 'IT'];
  industrySectors = ['School', 'Engineering', 'Arts', 'Healthcare', 'Finance', 'Banking', 'IT'];
  // Industry -> Sector dependency map (mirrors institute-register.component.ts / view-institutes.component.ts)
  private sectorMap: Record<string, string[]> = {
    'School': ['School'],
    'College': ['Engineering', 'Arts'],
    'BPO': ['Healthcare', 'Finance'],
    'Bank': ['Bank'],
    'IT': ['IT']
  };
  countrySearch = '';
  industrySearch = '';
  sectorSearch = '';

  get filteredCategories() {
    const q = (this.categorySearch || '').toLowerCase();
    if (!q) return this.categories;
    return this.categories.filter((c: any) => (c.name || '').toLowerCase().includes(q) || (c.category_name || '').toLowerCase().includes(q));
  }

  private filtersOverlayRef: OverlayRef | null = null;

  ngOnInit(): void {
    this.pageMeta.setMeta('Questions', 'Browse and review question bank');
    this.restoreQuestionsReturnState();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    try { this.dataSource.paginator = this.paginator; } catch (e) { /* ignore during tests */ }
  }
 
  isSuperAdmin = false;
  isGlobalInstituteActive = false;
  // Country/City/Industry/Sector are Super Admin-only, and are further hidden while the
  // Super Admin has a Global Filter institute active (that institute already scopes the page).
  get showLocationAndIndustryFilters(): boolean {
    return this.isSuperAdmin && !this.isGlobalInstituteActive;
  }
  private loginInstituteId: string | null = null;
  constructor(private http: HttpClient, private router: Router, private loading: LoaderService, private auth: AuthService, private overlay: Overlay, private vcr: ViewContainerRef,private pageMeta: PageMetaService, private confirmService: ConfirmService, private globalInstituteContext: GlobalInstituteContextService) {
    
  this.initializeInstituteScopeFromSession();

  // subscribe to isSuperAdmin observable so UI stays reactive to role changes
  try {
    this._subs = this.auth.user$.subscribe((user: any) => {
      this.isSuperAdmin = !!user && ['super_admin', 'superadmin', 'super-admin'].includes((user.role || '').toLowerCase());
      if (!this.isSuperAdmin && user) {
        const instId = sessionStorage.getItem('global_institute_id') || user?.institute_id || user?.instituteId || user?.institute?.institute_id || user?.institute?.id || (typeof user?.institute === 'string' ? user.institute : '');
        if (instId) {
          this.loginInstituteId = String(instId);
          this.selectedInstitute = this.loginInstituteId;
          this.syncInstituteSearch();
        }
      }
    });
  } catch (e) { /* ignore in tests */ }

  // http is optional for tests; if present, load institutes
    if (this.http) this.loadInstitutes();
    if (this.http) this.loadCountries();
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
    // also load categories list for the Category filter, scoped for admins
    if (this.http) this.loadCategories(this.getScopedInstituteId());
  }

  ngOnDestroy(): void {
    try { this._subs?.unsubscribe(); } catch (e) { /* ignore */ }
    try { this._globalInstituteSub?.unsubscribe(); } catch (e) { /* ignore */ }
     this.saveQuestionsReturnState();
  }
  get appliedFilterChips(): Array<{ key: string; label: string; removable: boolean }> {
    // The context subscription populates this ID whenever the Global Institute Filter is selected.
    const globalInstituteId = this.activeInstituteId;
    // A normal Admin's login institute becomes an applied chip only after Apply is clicked.
    if (!this.hasAppliedFilters && !globalInstituteId) return [];
    const chips: Array<{ key: string; label: string; removable: boolean }> = [];
    if (this.filterCountry) chips.push({ key: 'country', label: `Country: ${this.getSelectedName(this.countries.map(c => ({ id: c.code, name: c.name })), this.filterCountry)}`, removable: true });
    if (this.filterCity) chips.push({ key: 'city', label: `City: ${this.filterCity}`, removable: true });
    if (this.filterIndustry) chips.push({ key: 'industry', label: `Industry: ${this.filterIndustry}`, removable: true });
    if (this.filterSector) chips.push({ key: 'sector', label: `Sector: ${this.filterSector}`, removable: true });
    const instituteId = globalInstituteId || this.selectedInstitute;
    if (instituteId) chips.push({ key: 'institute', label: `Institute: ${this.getInstituteLabel(instituteId)}`, removable: this.isSuperAdmin && !globalInstituteId });
    if (this.categoryFilterName) chips.push({ key: 'category_name', label: `Category: ${this.categoryFilterName}`, removable: true });
    (this.selectedCategories || []).forEach(id => chips.push({ key: `category:${id}`, label: `Category: ${this.getCategoryLabel(id)}`, removable: true }));
    (this.selectedDepartments || []).forEach(id => chips.push({ key: `department:${id}`, label: `Department: ${this.getSelectedName(this.departments, id)}`, removable: true }));
    (this.selectedTeams || []).forEach(id => chips.push({ key: `team:${id}`, label: `Team: ${this.getSelectedName(this.teams, id)}`, removable: true }));
    if (this.filterCreationDateAfter) chips.push({ key: 'created_after', label: `Created after: ${this.formatFilterDate(this.filterCreationDateAfter)}`, removable: true });
    if (this.filterCreationDate) chips.push({ key: 'created_before', label: `Created before: ${this.formatFilterDate(this.filterCreationDate)}`, removable: true });
    if (this.filterActiveStatus !== null && typeof this.filterActiveStatus !== 'undefined') chips.push({ key: 'active_status', label: `Status: ${this.filterActiveStatus ? 'Active' : 'Inactive'}`, removable: true });
    if (this.filterCreatedByMe) chips.push({ key: 'created_by_me', label: 'Created by me', removable: true });
    if (this.filterPublicAccess !== null && typeof this.filterPublicAccess !== 'undefined') chips.push({ key: 'public_access', label: `Access: ${this.filterPublicAccess ? 'Public' : 'Restricted'}`, removable: true });
    return chips;
  }

  removeAppliedFilter(key: string) {
    if (!key) return;
    if (key === 'country') { this.filterCountry = ''; this.filterCity = ''; this.filterCityOptions = []; this.refreshInstituteScope(); }
    else if (key === 'city') { this.filterCity = ''; this.refreshInstituteScope(); }
    else if (key === 'industry') { this.filterIndustry = ''; this.filterSector = ''; this.refreshInstituteScope(); }
    else if (key === 'sector') { this.filterSector = ''; this.refreshInstituteScope(); }
    else if (key === 'institute' && this.isSuperAdmin) { this.selectedInstitute = ''; this.instituteSearch = ''; this.selectedCategories = []; this.categoryFilterName = ''; this.categorySearch = ''; this.categoryCtrl.setValue(''); this.categoryCtrl.disable({ emitEvent: false }); this.departments = []; this.teams = []; this.loadCategories(); }
    else if (key === 'category_name') { this.categoryFilterName = ''; this.categorySearch = ''; this.categoryCtrl.setValue(''); }
    else if (key.startsWith('category:')) this.selectedCategories = this.selectedCategories.filter(id => String(id) !== key.substring('category:'.length));
    else if (key.startsWith('department:')) this.selectedDepartments = this.selectedDepartments.filter(id => String(id) !== key.substring('department:'.length));
    else if (key.startsWith('team:')) this.selectedTeams = this.selectedTeams.filter(id => String(id) !== key.substring('team:'.length));
    else if (key === 'created_after') this.filterCreationDateAfter = null;
    else if (key === 'created_before') this.filterCreationDate = null;
    else if (key === 'active_status') this.filterActiveStatus = null;
    else if (key === 'created_by_me') this.filterCreatedByMe = false;
    else if (key === 'public_access') this.filterPublicAccess = null;
    this.refreshAfterFilterChipChange();
  }

  clearAppliedFilters() { this.onReset(); }

  private refreshAfterFilterChipChange() {
    if (this.appliedFilterChips.length) this.loadQuestions();
    else { this.hasAppliedFilters = false; this.questions = []; this.dataSource.data = []; this.selectedQuestionIds.clear(); }
  }

  private initializeInstituteScopeFromSession(): void {
    try {
      const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      const user = raw ? JSON.parse(raw) : null;
      const role = String(user?.role || user?.user_role || user?.role_name || '').toLowerCase();
      this.isSuperAdmin = ['super_admin', 'superadmin', 'super-admin'].includes(role) || user?.is_super_admin === true || !!user?.isSuperAdmin;
      const instId = sessionStorage.getItem('global_institute_id') || user?.institute_id || user?.instituteId || user?.institute?.institute_id || user?.institute?.id || (typeof user?.institute === 'string' ? user.institute : '');
      if (instId) {
        this.loginInstituteId = String(instId);
        if (!this.isSuperAdmin) this.selectedInstitute = this.loginInstituteId;
      }
    } catch (e) { /* ignore */ }
  }

  private getScopedInstituteId(instId?: string): string {
    if (!this.isSuperAdmin && this.loginInstituteId) return String(this.loginInstituteId);
    return String(instId || this.selectedInstitute || '');
  }

  private getItemInstituteId(item: any): string {
    return String(
      item?.institute_id ??
      item?.instituteId ??
      item?.institute?.institute_id ??
      item?.institute?.id ??
      item?.institutes?.institute_id ??
      item?.institutes?.id ??
      ''
    );
  }

  private isAllowedForInstitute(item: any, scopedInstitute: string): boolean {
    if (this.isSuperAdmin || !scopedInstitute) return true;
    return this.getItemInstituteId(item) === String(scopedInstitute);
  }
  private getInstituteLabel(id: any): string { const found = this.institutes.find(i => String(i.institute_id) === String(id)); return found?.name || String(id || ''); }
  private getCategoryLabel(id: any): string { const found = (this.categories || []).find((c: any) => String(c.category_id || c.id || c._id) === String(id)); return found?.name || found?.category_name || String(id || ''); }
  private getSelectedName(list: any[], selectedId: any): string { const found = (list || []).find(item => String(item?.id) === String(selectedId)); return found?.name || String(selectedId || ''); }
  private formatFilterDate(value: Date): string { try { return value.toISOString().slice(0, 10); } catch (e) { return String(value || ''); } }
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

  refresh() {
    if (!this.hasAppliedFilters) {
      try { notify('Apply filters to fetch questions', 'info'); } catch(e) {}
      return;
    }
    this.loadQuestions();
  }

  loadInstitutes() {
    this.http!.get<any>(this.institutesUrl).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        // Prefer the full API name; short_name remains a fallback for legacy responses.
        this.institutes = arr.map((r: any) => ({ name: r.institute_name || r.name || r.short_name || '', institute_id: r.institute_id || r.id }));
          // If a selectedInstitute is already set (e.g. via route/session), prefer that
          try {
            if (this.selectedInstitute) {
              const found = this.institutes.find(i => String(i.institute_id) === String(this.selectedInstitute));
              if (found) {
                // ensure exact match type/value and load schedules
                this.selectedInstitute = found.institute_id as any;
                this.syncInstituteSearch();
                this.categoryCtrl.enable({ emitEvent: false });
                    // load dependent lists scoped to the institute
                    this.loadDepartments(this.selectedInstitute);
                    this.loadTeams(this.selectedInstitute);
                return;
              }
            }
          } catch (e) { /* ignore */ }

          // Fallback: try reading user's institute from sessionStorage and apply it
          try {
            const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
            if (!this.isSuperAdmin && raw) {
              const u = JSON.parse(raw);
              const instId = sessionStorage.getItem('global_institute_id') || u?.institute_id || u?.instituteId || u?.institute?.institute_id || u?.institute?.id || (typeof u?.institute === 'string' ? u.institute : '');
              if (instId) {
                const found = this.institutes.find(i => String(i.institute_id) === String(instId));
                if (found) {
                  this.selectedInstitute = found.institute_id as any;
                  this.syncInstituteSearch();
                  this.categoryCtrl.enable({ emitEvent: false });
                  // ensure departments/teams also load for this institute
                  this.loadDepartments(this.selectedInstitute);
                  this.loadTeams(this.selectedInstitute);
                  // this.loadQuestions(this.selectedInstitute);
                }
              }
            }
          } catch (e) { /* ignore malformed session data */ }
      },
      error: (err) => console.warn('Failed to load institutes', err)
    });
  }

  // ---- Country / City / Industry / Sector cascade (mirrors view-institutes.component.ts / category.component.ts) ----

  get filteredCountries(): Array<{ code: string; name: string }> {
    const term = (this.countrySearch || '').trim().toLowerCase();
    if (!term) return this.countries;
    return this.countries.filter(c => (c.name || '').toLowerCase().includes(term));
  }

  get filteredIndustryTypes(): string[] {
    const term = (this.industrySearch || '').trim().toLowerCase();
    if (!term) return this.industryTypes;
    return this.industryTypes.filter(t => t.toLowerCase().includes(term));
  }

  // Sectors scoped to the selected industry; empty until an industry is selected.
  private get scopedSectors(): string[] {
    if (!this.filterIndustry) return [];
    return this.sectorMap[this.filterIndustry] || [];
  }

  get filteredSectors(): string[] {
    const scoped = this.scopedSectors;
    const term = (this.sectorSearch || '').trim().toLowerCase();
    if (!term) return scoped;
    return scoped.filter(s => s.toLowerCase().includes(term));
  }

  onFilterSelectOpened(opened: boolean, field: 'country' | 'industry' | 'sector') {
    if (opened) {
      setTimeout(() => {
        try {
          const input = document.querySelector('.cdk-overlay-pane .select-search-input') as HTMLInputElement | null;
          input?.focus();
        } catch (e) { /* ignore non-browser environments */ }
      });
      return;
    }
    if (field === 'country') this.countrySearch = '';
    else if (field === 'industry') this.industrySearch = '';
    else if (field === 'sector') this.sectorSearch = '';
  }

  stopFilterSearchEvent(event: Event) {
    event.stopPropagation();
  }

  // Only show countries that have at least one registered institute (mirrors
  // view-institutes.component.ts loadRegisteredInstituteCountries), not the full world hierarchy.
  loadCountries(){
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        try {
          const countries = res?.data?.countries || res?.countries || res?.data || [];
          this.locationHierarchyRaw = Array.isArray(countries) ? countries : [];
          this.loadRegisteredInstituteCountries(this.locationHierarchyRaw);
        } catch (e) { this.countries = []; }
      },
      error: () => { this.countries = []; }
    });
  }

  private loadRegisteredInstituteCountries(locationCountries: any[]) {
    this.countries = [];
    this.http.get<any>(`${API_BASE}/get-institutes`).subscribe({
      next: (res) => {
        try {
          const institutes = Array.isArray(res?.data) ? res.data : [];
          const hierarchyCountries = (locationCountries || []).map((country: any) => ({
            code: country.country_code || country.code || country.id,
            name: country.country_name || country.name || country.country
          })).filter((country: any) => country.code && country.name);
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
  }

  private loadCitiesForCountry(countryCode: string) {
    this.filterCityOptions = [];
    if (!countryCode) return;
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url, { params: { country_id: countryCode } }).subscribe({
      next: (res) => {
        try {
          const data = Array.isArray(res?.data?.cities) ? res.data.cities : [];
          this.filterCityOptions = data.map((city: any) => ({
            code: city.id ?? city.city_id ?? city.city_code ?? city.code,
            name: city.name ?? city.city_name ?? city.city
          })).filter((city: any) => city.code && city.name).sort((a: any, b: any) => a.name.localeCompare(b.name));
        } catch (e) { this.filterCityOptions = []; }
      },
      error: () => { this.filterCityOptions = []; }
    });
  }

  // City is a free-text field holding the display name; resolve it back to its code
  // (the backend's city filter expects an id) before sending it to get-institutes.
  private resolveCityId(cityName: string): string {
    const name = String(cityName || '').trim().toLowerCase();
    if (!name) return '';
    const found = this.filterCityOptions.find(c => String(c.name || '').trim().toLowerCase() === name);
    return found ? String(found.code) : '';
  }

  onCountryFilterChange() {
    this.filterCity = '';
    this.loadCitiesForCountry(this.filterCountry);
    this.refreshInstituteScope();
  }

  onCityFilterChange() {
    this.refreshInstituteScope();
  }

  onIndustryFilterChange() {
    this.filterSector = '';
    this.refreshInstituteScope();
  }

  onSectorFilterChange() {
    this.refreshInstituteScope();
  }

  // Reload the Institute options scoped to the currently selected Country/City/Industry/Sector.
  // Falls back to the full institute list (get-institute-list) when none of those are selected.
  private refreshInstituteScope() {
    if (!this.isSuperAdmin) return;
    const params: any = {};
    if (this.filterCountry) params.country = this.filterCountry;
    const cityId = this.resolveCityId(this.filterCity);
    if (cityId) params.city = cityId;
    if (this.filterIndustry) params.industry = this.filterIndustry;
    if (this.filterSector) params.sector = this.filterSector;

    const clearStaleInstituteSelection = () => {
      if (this.selectedInstitute && !this.institutes.some(i => String(i.institute_id) === String(this.selectedInstitute))) {
        this.onInstituteAutocompleteSelected('');
      }
    };

    if (!Object.keys(params).length) {
      this.loadInstitutes();
      return;
    }

    this.http.get<any>(`${API_BASE}/get-institutes`, { params }).subscribe({
      next: (res) => {
        const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        this.institutes = (data || []).map((r: any) => ({
          name: r.institute_name || r.name || r.short_name || '',
          institute_id: r.institute_id || r.id || r._id || ''
        })).filter((i: any) => !!i.institute_id);
        clearStaleInstituteSelection();
      },
      error: () => { this.institutes = []; }
    });
  }

  loadExams(instId: string) {
    if (!instId) { this.exams = []; return; }
    const url = `${this.examsUrl}?institute_id=${encodeURIComponent(instId)}`;
    this.http!.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        this.exams = arr.map((e: any) => ({ title: e.title || e.name || '', exam_id: e.exam_id || e.id || e.examId }));
      },
      error: (err) => { console.warn('Failed to load tests', err); this.exams = []; }
    });
  }

  onInstituteChange(value: any) {
    const v = value !== undefined ? value : '';
    this.selectedInstitute = v;
    this.syncInstituteSearch();
    if (v) this.categoryCtrl.enable({ emitEvent: false }); else this.categoryCtrl.disable({ emitEvent: false });
    // this.loadExams(v);
    // reload categories for the selected institute (optional)
    this.loadCategories(v);
    // also load departments and teams scoped to this institute
    this.loadDepartments(v);
    this.loadTeams(v);
  }

  loadDepartments(instId?: string) {
    if (!instId) { this.departments = []; return; }
    const url = `${API_BASE}/get-department-list`;
    this.http!.get<any>(url, { params: { institute_id: instId } }).subscribe({ next: (res) => {
      const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
      this.departments = arr.map((d:any) => ({ id: d.dept_id || d.id || d.deptId, name: d.name || d.dept_name || d.title || '' }));
    }, error: (err) => { console.warn('Failed to load departments', err); this.departments = []; } });
  }

  loadTeams(instId?: string) {
    if (!instId) { this.teams = []; return; }
    const url = `${API_BASE}/get-teams-list`;
    this.http!.get<any>(url, { params: { institute_id: instId } }).subscribe({ next: (res) => {
      const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
      this.teams = arr.map((t:any) => ({ id: t.team_id || t.id || t.teamId, name: t.name || t.team_name || t.title || '' }));
    }, error: (err) => { console.warn('Failed to load teams', err); this.teams = []; } });
  }

  onCategoryChange(value: any) {
    // value for multi-select will be array when multiple selected
    if (Array.isArray(value)) {
      // filter out any internal sentinel values (like selectAllValue)
      this.selectedCategories = value.filter(v => v !== this.selectAllValue);
    } else {
      this.selectedCategories = value ? [value].filter(v => v !== this.selectAllValue) : [];
    }
  }

  isAllCategoriesSelected(): boolean {
    const ids = (this.filteredCategories || []).map((c: any) => String(c.category_id || c.id || c._id));
    if (!ids.length) return false;
    const sel = (this.selectedCategories || []).map(String);
    return ids.every(id => sel.includes(id));
  }

  isPartialCategorySelection(): boolean {
    const ids = (this.filteredCategories || []).map((c: any) => String(c.category_id || c.id || c._id));
    const sel = (this.selectedCategories || []).map(String);
    return sel.length > 0 && sel.length < ids.length;
  }

  toggleSelectAllCategories() {
    const ids = (this.filteredCategories || []).map((c: any) => String(c.category_id || c.id || c._id));
    if (!ids.length) return;
    if (this.isAllCategoriesSelected()) {
      // deselect all filtered
      this.selectedCategories = (this.selectedCategories || []).filter(s => !ids.includes(String(s)));
    } else {
      // select all filtered (merge)
      const set = new Set<string>((this.selectedCategories || []).map(String));
      ids.forEach(id => set.add(id));
      this.selectedCategories = Array.from(set);
    }
  }

  loadQuestions(instId?: string) {
    this.loading.show();
    // if an institute id was supplied, prefer that and keep component state in sync
    if (instId !== undefined && instId !== null && instId !== '') {
      this.selectedInstitute = instId as any;
    }
    // build query params from selected filters; call API only when Apply/Reset triggers
    const params: string[] = [];
  const scopedInstitute = this.getScopedInstituteId();
  if (scopedInstitute) params.push(`institute_id=${encodeURIComponent(scopedInstitute)}`);
  if (this.selectedCategories && this.selectedCategories.length) params.push(`category_id=${encodeURIComponent(this.selectedCategories.join(','))}`);
  else if (this.categoryFilterName) params.push(`category_name=${encodeURIComponent(this.categoryFilterName)}`);
  if (this.selectedDepartments && this.selectedDepartments.length) params.push(`departments=${encodeURIComponent(this.selectedDepartments.join(','))}`);
  if (this.selectedTeams && this.selectedTeams.length) params.push(`teams=${encodeURIComponent(this.selectedTeams.join(','))}`);
  if (this.filterCreationDateAfter) params.push(`created_after=${encodeURIComponent((this.filterCreationDateAfter as Date).toISOString().slice(0,10))}`);
  if (this.filterCreationDate) params.push(`created_before=${encodeURIComponent((this.filterCreationDate as Date).toISOString().slice(0,10))}`);
  if (this.filterActiveStatus !== null && typeof this.filterActiveStatus !== 'undefined') params.push(`active_status=${encodeURIComponent(String(this.filterActiveStatus))}`);

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
    } catch (e) {}
  }
  
  if (this.filterPublicAccess !== null && typeof this.filterPublicAccess !== 'undefined') params.push(`public_access=${encodeURIComponent(String(this.filterPublicAccess))}`);
    const url = params.length ? `${this.questionsUrl}?${params.join('&')}` : this.questionsUrl;
    this.http!.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        const scopedInstitute = this.getScopedInstituteId();
        const filteredArr = arr.filter((q: any) => {
          const itemInstituteId = this.getItemInstituteId(q);
          return !itemInstituteId || this.isAllowedForInstitute(q, scopedInstitute);
        });
        this.refreshQuestionBankMarkLookup(() => {
          this.questions = filteredArr.map((q: any, i: number) => this.mapQuestionRow(q, i));
          this.dataSource.data = this.questions;
          this.loading.hide();
        });
      },
      error: (err) => { console.warn('Failed to load questions', err); this.questions = []; this.dataSource.data = []; this.loading.hide(); }
    });
  }

  private mapQuestionRow(q: any, i: number): QuestionRow {
    const row: QuestionRow = {
      ...q,
      id: q.id || q.question_id || q._id || i + 1,
      question: q.question || q.text || q.title || '',
      type: (q.type || q.question_type || q.original_type || 'Subjective') as QuestionType,
      originalType: q.type || q.original_type || q.question_type,
      options: q.options || q.choices || [],
      answer: q.answer || q.answerText || q.correct || '',
      category: q.category || q.category_name || '',
      category_description: q.category_description || '',
      category_id: q.category_id || q.categoryId || q.categoryID || q.category?.category_id || q.category?.id || q.category?._id || '',
      institute_id: q.institute_id || q.instituteId || q.instituteID || q.institute?.institute_id || q.institute?.id || q.institute?._id || this.selectedInstitute || '',
      exam_id: q.exam_id || q.examId || q.examID || q.exam?.exam_id || q.exam?.id || q.exam?._id || ''
    };
    const bankMark = this.resolveQuestionBankMark(row);
    row.marks = bankMark ?? this.toNumber(q.marks ?? q.points) ?? 0;
    return row;
  }

  private refreshQuestionBankMarkLookup(done: () => void): void {
    const params: string[] = [];
    const scopedInstitute = this.getScopedInstituteId();
  if (scopedInstitute) params.push(`institute_id=${encodeURIComponent(scopedInstitute)}`);
    if (this.categoryFilterName) params.push(`name=${encodeURIComponent(this.categoryFilterName)}`);
    const url = params.length ? `${this.categoryDetailsUrl}?${params.join('&')}&_ts=${Date.now()}` : `${this.categoryDetailsUrl}?_ts=${Date.now()}`;
    this.http!.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        const scopedInstitute = this.getScopedInstituteId();
        const normalized = arr.filter((c: any) => this.isAllowedForInstitute(c, scopedInstitute)).map((c: any) => ({
          name: c.name || c.category_name || '',
          category_id: c.category_id || c.id || c._id,
          mark_each_question: (typeof c.mark_each_question !== 'undefined') ? c.mark_each_question : (c.mark_for_each_question ?? c.question_mark ?? c.marks ?? null),
          mark_for_each_question: c.mark_for_each_question ?? c.mark_each_question ?? c.question_mark ?? c.marks ?? null,
          institute: c.institute || { institute_id: c.institute_id || c.instituteId || null }
        }));
        this.rebuildQuestionBankMarkLookup(normalized);
      },
      error: (err) => { console.warn('Failed to load question bank marks', err); done(); },
      complete: () => done()
    });
  }

  private rebuildQuestionBankMarkLookup(categories: any[]): void {
    this.questionBankMarksById.clear();
    this.questionBankMarksByName.clear();
    (categories || []).forEach((category: any) => {
      const mark = this.getQuestionBankMark(category);
      if (mark === null) return;
      const id = category?.category_id || category?.id || category?._id;
      const name = category?.name || category?.category_name;
      if (id !== undefined && id !== null && id !== '') this.questionBankMarksById.set(String(id), mark);
      if (name) this.questionBankMarksByName.set(String(name).trim().toLowerCase(), mark);
    });
  }

  private resolveQuestionBankMark(q: any): number | null {
    const direct = this.getQuestionBankMark(q);
    if (direct !== null) return direct;
    const id = q?.category_id || q?.categoryId || q?.categoryID || q?.category?.category_id || q?.category?.id || q?.category?._id;
    if (id !== undefined && id !== null && this.questionBankMarksById.has(String(id))) return this.questionBankMarksById.get(String(id)) ?? null;
    const name = q?.category || q?.category_name || q?.category?.name;
    if (name) return this.questionBankMarksByName.get(String(name).trim().toLowerCase()) ?? null;
    return null;
  }

  private getQuestionBankMark(value: any): number | null {
    const raw = value?.mark_each_question ?? value?.mark_for_each_question ?? value?.question_mark ?? value?.category_mark ?? value?.category_marks ?? value?.marks_per_question ?? null;
    return this.toNumber(raw);
  }

  private toNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
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

  loadCategories(instId?: string) {
    instId = this.getScopedInstituteId(instId);
    let url = this.categoryDetailsUrl;
    if (instId) url += `?institute_id=${encodeURIComponent(instId)}`;
    this.http!.get<any>(url).subscribe({ next: (res) => {
      const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
      const scopedInstitute = this.getScopedInstituteId(instId);
      this.categories = arr.filter((c: any) => this.isAllowedForInstitute(c, scopedInstitute)).map((c: any) => ({
        name: c.name || c.category_name || '',
        category_id: c.category_id || c.id || c._id,
        mark_each_question: (typeof c.mark_each_question !== 'undefined') ? c.mark_each_question : (c.mark_for_each_question ?? c.question_mark ?? c.marks ?? null),
        mark_for_each_question: c.mark_for_each_question ?? c.mark_each_question ?? c.question_mark ?? c.marks ?? null
      }));
      this.rebuildQuestionBankMarkLookup(this.categories);
      try{
        this.filteredCategories$ = this.categoryCtrl.valueChanges.pipe(
          startWith(''),
          map((val:any)=>{
            const q = (typeof val === 'string' ? val : (val?.name||'')).toLowerCase();
            return (this.categories || []).filter((c:any)=> (c.name||'').toLowerCase().includes(q));
          })
        );
      }catch(e){ this.filteredCategories$ = of(this.categories || []); }
    }, error: (err) => { console.warn('Failed to load categories', err); this.categories = []; } });
  }

  toggleQuestionSelection(q: QuestionRow, checked: boolean){
    const id = (q as any).id ?? (q as any).question_id ?? (q as any)._id;
    if(checked) this.selectedQuestionIds.add(id as any);
    else this.selectedQuestionIds.delete(id as any);
  }

  async copySelectedQuestionsToCategory(categoryId: string | null){
    if(!categoryId || !this.selectedQuestionIds.size) return;
    const ids = Array.from(this.selectedQuestionIds).map(String);
    this.copyMoveInProgress = true;
    try{
      const url = `${API_BASE}/copy-questions-to-category`;
      await this.http.post<any>(url, { question_ids: ids, target_category_id: categoryId }).toPromise();
      try{ notify('Questions copied', 'success'); }catch(e){}
      this.selectedQuestionIds.clear();
      this.loadQuestions();
    }catch(e){ console.warn('Failed to copy questions', e); try{ notify('Failed to copy questions','error'); }catch(e){} }
    finally{ this.copyMoveInProgress = false; }
  }

  async moveSelectedQuestionsToCategory(categoryId: string | null){
    if(!categoryId || !this.selectedQuestionIds.size) return;
    const ids = Array.from(this.selectedQuestionIds).map(String);
    this.copyMoveInProgress = true;
    try{
      const url = `${API_BASE}/move-questions-to-category`;
      await this.http.post<any>(url, { question_ids: ids, target_category_id: categoryId }).toPromise();
      try{ notify('Questions moved', 'success'); }catch(e){}
      this.selectedQuestionIds.clear();
      this.loadQuestions();
    }catch(e){ console.warn('Failed to move questions', e); try{ notify('Failed to move questions','error'); }catch(e){} }
    finally{ this.copyMoveInProgress = false; }
  }

  // Template-friendly wrappers to avoid passing nullable values directly from the template
  copySelected() { this.copySelectedQuestionsToCategory(this.selectedTargetCategory); }
  moveSelected() { this.moveSelectedQuestionsToCategory(this.selectedTargetCategory); }

  toggleSelectAll(checked: boolean){
    if(checked){
      (this.dataSource.data || []).forEach(r => this.selectedQuestionIds.add(r.id as any));
    } else {
      (this.dataSource.data || []).forEach(r => this.selectedQuestionIds.delete(r.id as any));
    }
  }

  displayCategory(c: any){ return c ? (c.name || c.category_name || '') : ''; }

  onCategorySelected(c: any){
    if(!c) return;
    const categoryId = c.category_id || c.id || c._id || '';
    if (categoryId) {
      this.selectedCategories = [String(categoryId)];
      this.categoryFilterName = '';
      return;
    }
    this.selectedCategories = [];
    this.categoryFilterName = c.name || c.category_name || '';
  }

  editQuestion(q: QuestionRow) {
    // store the question into session storage and navigate to the editor
    this.saveQuestionsReturnState();
    try { sessionStorage.setItem('edit_question', JSON.stringify(q)); } catch (e) { /* ignore */ }
    this.viewedQuestion = null;
    // navigate to the questions editor route - reuse same route as Insert Question
    if (this.router) {
      this.router.navigate(['/questions']);
    } else {
      try { notify('Open the question editor to edit this question.', 'info'); } catch(e) {}
    }
  }

  deleteQuestion(q: QuestionRow) {
    this.confirmService.confirm({ title: 'Delete Question', message: 'Delete this question? This action cannot be undone.', confirmText: 'Delete', cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      // const url = `${this.questionsUrl}?question_id=${encodeURIComponent(String(q.id))}`;
      const url = `${API_BASE}/delete/question/${encodeURIComponent(String(q.id))}`;
      this.http!.delete<any>(url).subscribe({
        next: (res) => {
          // remove from local array
          this.questions = this.questions.filter(x => x.id !== q.id);
          try { 
            notify('Question deleted', 'success');
            this.loadQuestions();
           } catch(e) {}
        },
        error: (err) => { console.warn('Failed to delete question', err); try { notify('Failed to delete question', 'error'); } catch(e) {} }
      });
    });
  }

  // Apply fetches with filters; reset clears filters and leaves the table empty.
  private hasFilterValues(): boolean {
    return !!(
      this.filterCountry ||
      this.filterCity ||
      this.filterIndustry ||
      this.filterSector ||
      this.selectedInstitute ||
      this.selectedCategories.length ||
      this.categoryFilterName ||
      this.categorySearch ||
      this.selectedDepartments.length ||
      this.selectedTeams.length ||
      this.filterCreationDateAfter ||
      this.filterCreationDate ||
      this.filterActiveStatus !== null ||
      this.filterCreatedByMe ||
      this.filterPublicAccess !== null
    );
  }

  onApply() {
    if (!this.hasFilterValues()) {
      try { notify('Please add filters in the filter form.', 'info'); } catch (e) {}
      return;
    }
    this.hasAppliedFilters = false;
    this.loadQuestions();
    this.closeFiltersOverlay();
  }

  onReset() {
    this.selectedCategories = [];
    this.categoryFilterName = '';
    this.categorySearch = '';
    this.categoryCtrl.setValue('');
    this.selectedDepartments = [];
    this.selectedTeams = [];
    this.filterCreationDateAfter = null;
    this.filterCreationDate = null;
    this.filterActiveStatus = null;
    this.filterCreatedByMe = false;
    this.filterPublicAccess = null;
    this.filterCountry = '';
    this.filterCity = '';
    this.filterIndustry = '';
    this.filterSector = '';
    this.filterCityOptions = [];
    this.countrySearch = '';
    this.industrySearch = '';
    this.sectorSearch = '';
    if (this.isSuperAdmin) {
      // Institute is the top of the Institute -> Question Bank -> Department/Team chain;
      // it must be cleared here so those dependents reload unscoped instead of staying
      // pinned to whatever institute was previously selected.
      this.selectedInstitute = '';
      this.instituteSearch = '';
      this.categoryCtrl.disable({ emitEvent: false });
      this.departments = [];
      this.teams = [];
      this.loadInstitutes();
    }
    this.loadCategories(this.getScopedInstituteId());
    this.filter = '';
    this.dataSource.filter = '';
    this.questions = [];
    this.dataSource.data = this.questions;
    this.selectedQuestionIds.clear();
    this.hasAppliedFilters = false;
  }

  // keep existing constructor-less usage working for tests


  get filtered() {
    const q = (this.filter || '').toLowerCase();
    if (!q) return this.questions;
    return this.questions.filter(x => x.question.toLowerCase().includes(q) || (x.type || '').toLowerCase().includes(q));
  }

  applyFilter(value: string) {
    const q = (value || '').trim().toLowerCase();
    this.filter = q;
    this.dataSource.filterPredicate = (d: QuestionRow, filter: string) => {
      return (d.question || '').toLowerCase().includes(filter) || (d.type || '').toLowerCase().includes(filter);
    };
    this.dataSource.filter = q;
  }

  viewDetails(q: QuestionRow) {
    try { sessionStorage.setItem('view_question', JSON.stringify(q)); } catch (e) { }
    // set the viewed question so the modal in the template becomes visible
    try { this.viewedQuestion = (q as any).raw || q || null; } catch(e) { this.viewedQuestion = q || null; }
    try { notify(`Q: ${q.question}\nType: ${q.type}\nAnswer: ${q.answer || '—'}`, 'info'); } catch(e) { try { console.warn(`Q: ${q.question}\nType: ${q.type}\nAnswer: ${q.answer || '—'}`); } catch(_) {} }
  }

  closeViewModal(){ this.viewedQuestion = null; }

  formatQuestionType(type: string | undefined | null): string {
    if (!type) return '—';
    const typeMap: { [key: string]: string } = {
      'choose': 'Single Choice',
      'multi': 'Multiple Choice',
      'fill': 'Fill In The Blank',
      'descriptive': 'Descriptive'
    };
    const lowerType = type.toLowerCase();
    return typeMap[lowerType] || this.toTitleCase(type);
  }

  isAnswerType(type: string | undefined | null): boolean {
    const normalized = String(type || '').toLowerCase();
    return normalized === 'fill' || normalized === 'descriptive';
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  openAddQuestions(): void {
    this.saveQuestionsReturnState();
    this.router.navigate(['/questions']);
  }

  saveQuestionsReturnState(): void {
    try {
      const state = {
        instituteId: this.globalInstituteContext.activeInstituteId || this.selectedInstitute || '',
        globalInstituteActive: this.globalInstituteContext.isGlobalFilterActive(),
        filter: this.filter,
        filterCountry: this.filterCountry,
        filterCity: this.filterCity,
        filterIndustry: this.filterIndustry,
        filterSector: this.filterSector,
        selectedInstitute: this.selectedInstitute,
        selectedCategories: this.selectedCategories,
        categoryFilterName: this.categoryFilterName,
        categorySearch: this.categorySearch,
        selectedDepartments: this.selectedDepartments,
        selectedTeams: this.selectedTeams,
        filterCreationDateAfter: this.filterCreationDateAfter ? this.filterCreationDateAfter.toISOString() : null,
        filterCreationDate: this.filterCreationDate ? this.filterCreationDate.toISOString() : null,
        filterActiveStatus: this.filterActiveStatus,
        filterCreatedByMe: this.filterCreatedByMe,
        filterPublicAccess: this.filterPublicAccess,
        hasAppliedFilters: this.hasAppliedFilters,
        questions: this.questions
      };
      sessionStorage.setItem(this.questionsReturnStateKey, JSON.stringify(state));
    } catch (e) { /* ignore storage errors */ }
  }

  private restoreQuestionsReturnState(): void {
    try {
      const raw = sessionStorage.getItem(this.questionsReturnStateKey);
      if (!raw) return;
      const state = JSON.parse(raw);
      sessionStorage.removeItem(this.questionsReturnStateKey);
      const activeInstituteId = this.globalInstituteContext.activeInstituteId;
      if (activeInstituteId && String(state?.instituteId || '') !== String(activeInstituteId)) return;
      if (activeInstituteId && state?.globalInstituteActive !== true) return;
      if (!activeInstituteId && state?.globalInstituteActive === true) return;
      // Discard legacy institute-bound cache once; newly saved normal-filter state remains restorable.
      if (!activeInstituteId && typeof state?.globalInstituteActive === 'undefined' && state?.instituteId) return;

      this.filterCountry = state?.filterCountry || '';
      this.filterCity = state?.filterCity || '';
      this.filterIndustry = state?.filterIndustry || '';
      this.filterSector = state?.filterSector || '';
      this.selectedInstitute = state?.selectedInstitute || '';
      this.selectedCategories = Array.isArray(state?.selectedCategories) ? state.selectedCategories : [];
      this.categoryFilterName = state?.categoryFilterName || '';
      this.categorySearch = state?.categorySearch || '';
      this.categoryCtrl.setValue(this.categoryFilterName || '');
      this.selectedDepartments = Array.isArray(state?.selectedDepartments) ? state.selectedDepartments : [];
      this.selectedTeams = Array.isArray(state?.selectedTeams) ? state.selectedTeams : [];
      this.filterCreationDateAfter = state?.filterCreationDateAfter ? new Date(state.filterCreationDateAfter) : null;
      this.filterCreationDate = state?.filterCreationDate ? new Date(state.filterCreationDate) : null;
      this.filterActiveStatus = typeof state?.filterActiveStatus === 'undefined' ? null : state.filterActiveStatus;
      this.filterCreatedByMe = !!state?.filterCreatedByMe;
      this.filterPublicAccess = typeof state?.filterPublicAccess === 'undefined' ? null : state.filterPublicAccess;
      this.hasAppliedFilters = !!state?.hasAppliedFilters;
      this.questions = Array.isArray(state?.questions) ? state.questions : [];
      this.dataSource.data = this.questions;
      this.selectedQuestionIds.clear();
      if (this.selectedInstitute) {
        this.categoryCtrl.enable({ emitEvent: false });
        this.loadDepartments(this.selectedInstitute);
        this.loadTeams(this.selectedInstitute);
      } else {
        this.categoryCtrl.disable({ emitEvent: false });
      }
      if (this.filterCountry) this.loadCitiesForCountry(this.filterCountry);
      if (this.filterCountry || this.filterCity || this.filterIndustry || this.filterSector) this.refreshInstituteScope();
      this.applyFilter(state?.filter || '');
    } catch (e) {
      try { sessionStorage.removeItem(this.questionsReturnStateKey); } catch (_) {}
    }
  }

  private resetForInstituteChange(instituteId: string): void {
    this.activeInstituteId = instituteId;
    this.selectedInstitute = instituteId;
    // Clear institute-specific state immediately to prevent cross-institute data leakage.
    this.questions = []; this.dataSource.data = []; this.selectedQuestionIds.clear();
    this.selectedCategories = []; this.selectedDepartments = []; this.selectedTeams = [];
    this.departments = []; this.teams = []; this.categoryFilterName = ''; this.categorySearch = '';
    this.hasAppliedFilters = false;
    try { sessionStorage.removeItem(this.questionsReturnStateKey); } catch (e) {}
    this.categoryCtrl.enable({ emitEvent: false });
    // Reload filter options only; records remain empty until the user applies filters.
    this.loadDepartments(instituteId); this.loadTeams(instituteId); this.loadCategories(instituteId);
  }

  private resetAfterGlobalInstituteClear(): void {
    this.activeInstituteId = '';
    this.selectedInstitute = '';
    this.instituteSearch = '';
    // Clear only global-scope UI state so normal Super Admin filtering remains available.
    this.questions = []; this.dataSource.data = []; this.selectedQuestionIds.clear();
    this.selectedCategories = []; this.selectedDepartments = []; this.selectedTeams = [];
    this.categories = []; this.departments = []; this.teams = [];
    this.filter = ''; this.dataSource.filter = ''; this.categoryFilterName = ''; this.categorySearch = '';
    this.filterCountry = ''; this.filterCity = ''; this.filterIndustry = ''; this.filterSector = '';
    this.filterCityOptions = []; this.countrySearch = ''; this.industrySearch = ''; this.sectorSearch = '';
    this.filterCreationDateAfter = null; this.filterCreationDate = null; this.filterActiveStatus = null;
    this.filterCreatedByMe = false; this.filterPublicAccess = null; this.hasAppliedFilters = false;
    this.viewedQuestion = null;
    this.categoryCtrl.setValue('', { emitEvent: false });
    this.categoryCtrl.disable({ emitEvent: false });
    if (this.paginator) { this.paginator.firstPage(); this.paginator.length = 0; }
    this.closeFiltersOverlay();
    try { sessionStorage.removeItem(this.questionsReturnStateKey); } catch (e) {}
    this.loadInstitutes();
    this.loadCategories();
  }
}


