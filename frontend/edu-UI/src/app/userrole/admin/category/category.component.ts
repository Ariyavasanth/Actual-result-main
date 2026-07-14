import { Component, OnInit, AfterViewInit, ViewChild,ElementRef, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router , RouterModule} from '@angular/router';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { notify } from 'src/app/shared/global-notify';
import { API_BASE } from 'src/app/shared/api.config';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-category',
  standalone: true,
  // imports: [CommonModule, SharedModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatSlideToggleModule, MatSortModule, HttpClientModule],
  imports: [CommonModule, SharedModule, FormsModule, MatPaginatorModule, HttpClientModule, RouterModule, MatTableModule, MatIconModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatSlideToggleModule, MatButtonModule, MatCheckboxModule, MatTabsModule, OverlayModule, PortalModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit,OnDestroy  {
  filter = '';
  name = '';
  description = '';
  // filters
  filterName = '';
  categoryOptions: Array<{ id: string; name: string }> = [];
  selectedCategory: any = null;
  editing = false;
  selectedInstitute: string | null = null;
  instituteSearch = '';
  selectedDepartments: string[] = [];
  selectedTeams: string[] = [];
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
  // additional filters
  filterCreationDateAfter: Date | null = null;
  filterCreationDate: Date | null = null;
  filterActiveStatus: boolean | null = null;
  // checkbox filters
  filterCreatedByMe: boolean = false; // if true, only categories created by current user
  filterPublicAccess: boolean | null = null; // tri-state: null = any, true = public, false = restricted
  // role
  isSuperAdmin: boolean = false;
  private loginInstituteId: string | null = null;
  institutes: Array<{ institute_id: string; short_name: string }> = [];
  departments: Array<{ id: string; name: string }> = [];
  teams: Array<{ id: string; name: string }> = [];

  categories: Array<{ id: string; name: string; description?: string; institute?: any; departments?: any[]; teams?: any[] }> = [];
  dataSource = new MatTableDataSource<any>([]);
  columns = ['name','description','active','actions'];
  hasAppliedFilters = false;

  private filtersOverlayRef: OverlayRef | null = null;
  constructor(private http: HttpClient, private router: Router, private loader: LoaderService, private pageMeta: PageMetaService, private overlay: Overlay, private vcr: ViewContainerRef, private confirmService: ConfirmService) {}

  ngOnInit(): void {

    this.pageMeta.setMeta('Question Banks', 'View and manage question banks');

    // try to auto-select institute based on logged-in user
    try {
      const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      if (raw) {
        const obj = JSON.parse(raw);
        // detect super admin role
        const role = obj?.role || obj?.user_role || obj?.role_name || '';
        const normalizedRole = String(role || '').toLowerCase();
        this.isSuperAdmin = ['super_admin', 'superadmin', 'super-admin'].includes(normalizedRole);
        // if user belongs to an institute, pre-select it
        const iid = sessionStorage.getItem('global_institute_id') || obj?.institute_id || obj?.instituteId || obj?.institute?.institute_id || obj?.institute?.id || (typeof obj?.institute === 'string' ? obj.institute : null);
        if (iid) {
          this.loginInstituteId = String(iid);
          this.selectedInstitute = this.isSuperAdmin ? this.selectedInstitute : this.loginInstituteId;
        }
      }
    } catch (e) { /* ignore */ }
    this.loadFilterLists();
    this.loadCountries();
    this.applyGlobalInstituteScopeIfActive();
    this.restoreCategoryReturnState();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filtersBtn', { read: ElementRef }) filtersBtn!: ElementRef;
  @ViewChild('filtersPanel') filtersPanelTpl!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
  this.saveCategoryReturnState();
}

  refresh(){
    if (!this.hasAppliedFilters) {
      try { notify('Apply filters to fetch question banks', 'info'); } catch(e) {}
      return;
    }
    this.fetchCategories();
  }

  addCategory(){
    const title = (this.name||'').trim();
    if (!title) return;
    const id = Date.now().toString();
    this.categories.unshift({ id, name: title, description: (this.description||'').trim() });
    this.dataSource.data = this.categories;
    this.name = '';
    this.description = '';
  }

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

  applyFilter(value: any) {
    const q = (value || '').trim().toLowerCase();
    this.filter = q;
    // this.dataSource.filterPredicate = (d: categories, filter: string) => {
    //   return (d.name || '').toLowerCase().includes(filter) || (d.description || '').toLowerCase().includes(filter);
    // };
    this.dataSource.filter = q;
  }
  get appliedFilterChips(): Array<{ key: string; label: string; removable: boolean }> {
    if (!this.hasAppliedFilters) return [];
    const chips: Array<{ key: string; label: string; removable: boolean }> = [];
    if (this.filterCountry) chips.push({ key: 'country', label: `Country: ${this.getSelectedName(this.countries.map(c => ({ id: c.code, name: c.name })), this.filterCountry)}`, removable: true });
    if (this.filterCity) chips.push({ key: 'city', label: `City: ${this.filterCity}`, removable: true });
    if (this.filterIndustry) chips.push({ key: 'industry', label: `Industry: ${this.filterIndustry}`, removable: true });
    if (this.filterSector) chips.push({ key: 'sector', label: `Sector: ${this.filterSector}`, removable: true });
    const scopedInstitute = this.getScopedInstituteId();
    const instituteName = this.getInstituteLabel(scopedInstitute);
    if (instituteName) chips.push({ key: 'institute', label: `Institute: ${instituteName}`, removable: this.isSuperAdmin });
    if (this.filterName) chips.push({ key: 'category', label: `Question Bank: ${this.filterName}`, removable: true });
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
    else if (key === 'institute' && this.isSuperAdmin) {
      this.selectedInstitute = null;
      this.instituteSearch = '';
      this.selectedDepartments = [];
      this.selectedTeams = [];
      this.loadGlobalDepartmentTeamLists();
      this.loadCategoryOptions();
    } else if (key === 'category') this.filterName = '';
    else if (key.startsWith('department:')) this.selectedDepartments = this.selectedDepartments.filter(id => String(id) !== key.split(':')[1]);
    else if (key.startsWith('team:')) this.selectedTeams = this.selectedTeams.filter(id => String(id) !== key.split(':')[1]);
    else if (key === 'created_after') this.filterCreationDateAfter = null;
    else if (key === 'created_before') this.filterCreationDate = null;
    else if (key === 'active_status') this.filterActiveStatus = null;
    else if (key === 'created_by_me') this.filterCreatedByMe = false;
    else if (key === 'public_access') this.filterPublicAccess = null;

    if (this.appliedFilterChips.length) {
      this.fetchCategories();
    } else {
      this.hasAppliedFilters = false;
      this.categories = [];
      this.dataSource.data = [];
      if (this.paginator) this.paginator.length = 0;
    }
  }

  clearAppliedFilters() {
    this.onReset();
  }

  private getScopedInstituteId(): string | null {
    if (this.isSuperAdmin) return this.selectedInstitute ? String(this.selectedInstitute) : null;
    return this.loginInstituteId || this.selectedInstitute || null;
  }

  private getCategoryInstituteId(item: any): string {
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

  private isAllowedCategoryForInstitute(item: any, scopedInstitute: string | null): boolean {
    if (this.isSuperAdmin || !scopedInstitute) return true;
    const itemInstituteId = this.getCategoryInstituteId(item);
    return itemInstituteId === String(scopedInstitute);
  }
  private getInstituteLabel(id: any): string {
    if (!id) return '';
    const found = this.institutes.find(i => String(i.institute_id) === String(id));
    return found?.short_name || String(id);
  }

  private getSelectedName(list: Array<{ id: string; name: string }>, selectedId: string): string {
    return list.find(item => String(item.id) === String(selectedId))?.name || String(selectedId);
  }

  private formatFilterDate(value: Date): string {
    try { return value.toISOString().slice(0, 10); } catch(e) { return String(value || ''); }
  }
  deleteCategory(c: any){
    const id = c.category_id || c.id;
    if (!id) return;
    this.confirmService.confirm({ title: 'Delete Question Bank', message: `Delete question bank ${c.name}? This action cannot be undone.`, confirmText: 'Delete', cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      // optimistic remove
      const prev = [...this.categories];
      this.categories = this.categories.filter(x => x.id !== c.id);
      this.dataSource.data = this.categories;
      const current_user = sessionStorage.getItem('user_id')
      const url = `${API_BASE}/delete/category/${encodeURIComponent(String(id))}?current_user=${encodeURIComponent(String(current_user))}`;
      // call backend generic manage route (category/delete)
      this.http.delete<any>(url , { }).subscribe({
        next: (res) => { try { notify('Question Bank deleted', 'success'); } catch(e) {} },
        error: (err) => { console.error('Failed deleting question bank', err); try { notify('Failed to delete question bank', 'error'); } catch(e) {}; this.categories = prev; this.dataSource.data = this.categories; }
      });
    });
  }

  setName(v: string){ this.name = v || ''; }
  setDescription(v: string){ this.description = v || ''; }

  // load initial lists for institute/department/team filters (best-effort endpoints)
  loadFilterLists(){
    // Load institutes first, then load department/team lists according to the allowed institute scope.
    this.loadInstituteOptions(() => {
      if (this.selectedInstitute) {
        this.onInstituteChange(this.selectedInstitute);
      } else if (this.isSuperAdmin) {
        this.loadGlobalDepartmentTeamLists();
      }
    });
  }

  // load the unscoped institute list (get-institute-list); used at init and whenever
  // Country/City/Industry/Sector filters are cleared back to "Any".
  private loadInstituteOptions(onLoaded?: () => void){
    this.http.get<any>(`${API_BASE}/get-institute-list`).subscribe({ next: (res) => {
        const data = Array.isArray(res) ? res : (res?.data || []);
        this.institutes = (data || []).map((i: any) => ({ institute_id: i.institute_id || i.id || i.instituteId || null, short_name: i.short_name || i.name || i.institute_name || '' }));
        this.syncInstituteSearch();
        if (onLoaded) onLoaded();
      }, error: () => {} });
  }

  // ---- Country / City / Industry / Sector cascade (mirrors view-institutes.component.ts) ----

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
        this.onInstituteAutocompleteSelected(null);
      }
    };

    if (!Object.keys(params).length) {
      this.loadInstituteOptions(clearStaleInstituteSelection);
      return;
    }

    this.http.get<any>(`${API_BASE}/get-institutes`, { params }).subscribe({
      next: (res) => {
        const data = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        this.institutes = (data || []).map((r: any) => ({
          institute_id: r.institute_id || r.id || r._id || null,
          short_name: r.short_name || r.name || r.institute_name || ''
        })).filter((i: any) => !!i.institute_id);
        this.syncInstituteSearch();
        clearStaleInstituteSelection();
      },
      error: () => { this.institutes = []; }
    });
  }

  private loadGlobalDepartmentTeamLists() {
    if (!this.isSuperAdmin) return;
    this.http.get<any>(`${API_BASE}/get-department-list`).subscribe({ next: (res) => { const data = Array.isArray(res) ? res : (res?.data || []); this.departments = (data || []).map((d:any)=> ({ id: d.department_id || d.dept_id || d.id || d.deptId, name: d.department_name || d.dept_name || d.name })); }, error: () => { this.departments = []; } });
    this.http.get<any>(`${API_BASE}/get-teams-list`).subscribe({ next: (res) => { const data = Array.isArray(res) ? res : (res?.data || []); this.teams = (data || []).map((t:any)=> ({ id: t.team_id || t.id || t.teamId, name: t.team_name || t.name })); }, error: () => { this.teams = []; } });
  }
  loadCategoryOptions() {
    const scopedInstitute = this.getScopedInstituteId();
    let params = new HttpParams();
    if (scopedInstitute) params = params.set('institute_id', scopedInstitute);
    this.http.get<any>(`${API_BASE}/category-details`, { params }).subscribe({
      next: (res) => {
        const items = Array.isArray(res) ? res : (res?.data || []);
        const scopedInstitute = this.getScopedInstituteId();
        this.categoryOptions = (items || []).filter((it: any) => this.isAllowedCategoryForInstitute(it, scopedInstitute)).map((it: any, idx: number) => ({
          id: it.category_id || it.id || it._id || String(idx),
          name: it.name || it.category_name || ''
        })).filter((c: any) => !!c.name);
      },
      error: () => { this.categoryOptions = []; }
    });
  }

  displayInstitute = (value: string | null): string => {
    if (!value) return '';
    const found = this.institutes.find(i => String(i.institute_id) === String(value));
    return found ? found.short_name : String(value);
  };

  filteredInstitutes() {
    const q = (this.instituteSearch || '').trim().toLowerCase();
    if (!q) return this.institutes;
    return this.institutes.filter((i: any) => (i.short_name || '').toLowerCase().includes(q));
  }

  onInstituteAutocompleteSelected(id: string | null) {
    if (!this.isSuperAdmin && this.loginInstituteId) {
      id = this.loginInstituteId;
    }
    this.selectedInstitute = id;
    this.syncInstituteSearch();
    this.onInstituteChange(id);
  }

  private syncInstituteSearch() {
    const found = this.institutes.find(i => String(i.institute_id) === String(this.selectedInstitute || ''));
    this.instituteSearch = found ? found.short_name : '';
  }

  onInstituteChange(iid: any) {
    if (!this.isSuperAdmin && this.loginInstituteId) {
      iid = this.loginInstituteId;
      this.selectedInstitute = this.loginInstituteId;
    }
    this.selectedDepartments = [];
    this.selectedTeams = [];
    this.filterName = '';
    this.categoryOptions = [];
    // called when institute selection changes; fetch departments and teams scoped to institute
    if (!iid) {
      this.departments = [];
      this.teams = [];
      if (this.isSuperAdmin) {
        this.loadGlobalDepartmentTeamLists();
        this.loadCategoryOptions();
      }
      return;
    }
    this.loadCategoryOptions();
    // departments
    this.http.get<any>(`${API_BASE}/get-department-list`, { params: { institute_id: iid } }).subscribe({
      next: (res) => {
        const data = Array.isArray(res) ? res : (res?.data || []);
        this.departments = (data || []).map((d:any)=> ({ id: d.department_id || d.dept_id || d.id || d.deptId, name: d.department_name || d.dept_name || d.name }));
      }, error: () => { this.departments = []; }
    });
    // teams
    this.http.get<any>(`${API_BASE}/get-teams-list`, { params: { institute_id: iid } }).subscribe({
      next: (res) => {
        const data = Array.isArray(res) ? res : (res?.data || []);
        this.teams = (data || []).map((t:any)=> ({ id: t.team_id || t.id || t.teamId, name: t.team_name || t.name }));
      }, error: () => { this.teams = []; }
    });
  }

  // fetch categories, optionally with current filter values
  fetchCategories(){
    this.loader.show();
    let params = new HttpParams();
    const scopedInstitute = this.getScopedInstituteId();
    if (this.filterName) params = params.set('name', this.filterName);
    if (scopedInstitute) params = params.set('institute_id', scopedInstitute);
    if (this.selectedDepartments && this.selectedDepartments.length) params = params.set('departments', this.selectedDepartments.join(','));
    if (this.selectedTeams && this.selectedTeams.length) params = params.set('teams', this.selectedTeams.join(','));
    // optional date filters
    if (this.filterCreationDateAfter) {
      try { params = params.set('created_after', (this.filterCreationDateAfter as Date).toISOString().slice(0,10)); } catch(e){}
    }
    if (this.filterCreationDate) {
      try { params = params.set('created_before', (this.filterCreationDate as Date).toISOString().slice(0,10)); } catch(e){}
    }
    if (this.filterActiveStatus !== null && typeof this.filterActiveStatus !== 'undefined') {
      params = params.set('active_status', String(this.filterActiveStatus));
    }
    // created-by-me filter (boolean flag)
    if (this.filterCreatedByMe) {
      // Assign current login user's user_id for created_by filter
      try {
        const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
        if (raw) {
          const obj = JSON.parse(raw);
          const userId = obj?.user_id || obj?.id || obj?._id;
          if (userId) {
        params = params.set('created_by', String(userId));
          }
        }
      } catch (e) {}
    }
    // public access checkbox — when true/false filter explicitly; when null, don't add param
    if (this.filterPublicAccess !== null && typeof this.filterPublicAccess !== 'undefined') {
      params = params.set('public_access', String(this.filterPublicAccess));
    }

  this.http.get<any>(`${API_BASE}/category-details`, { params }).subscribe({
      next: (res) => {
        // response may be array or {data: array}
        const items = Array.isArray(res) ? res : (res?.data || []);
        const scopedInstitute = this.getScopedInstituteId();
        // normalize items
        this.categories = items.filter((it: any) => this.isAllowedCategoryForInstitute(it, scopedInstitute)).map((it: any, idx: number) => ({
          category_id: it.category_id || it.id || it._id || String(idx),
          id: it.category_id || it.id || it._id || String(idx),
          name: it.name || it.category_name || '',
          description: it.description || '',
          answer_by: it.answer_by || '',
          type: it.type || '',
          evaluation: it.evaluation || '',
          mark_each_question: (typeof it.mark_each_question !== 'undefined') ? it.mark_each_question : (it.mark_for_each_question ?? null),
          active_status: typeof it.active_status !== 'undefined' ? it.active_status : (it.active ?? false),
          active: typeof it.active_status !== 'undefined' ? it.active_status : (it.active ?? false),
          public_access: typeof it.public_access !== 'undefined' ? it.public_access : (it.public ?? false),
          institute: (it.institute && typeof it.institute === 'object')
            ? {
          institute_id: it.institute.institute_id || it.institute.id || null,
          institute_name: it.institute.institute_name || it.institute.name || null
              }
            : (typeof it.institute === 'string' ? { institute_id: null, institute_name: it.institute } : (it.institute || null)),
          // normalize departments/teams to arrays (handles {} or arrays)
          departments: this.iterableList(it.departments || it.department_ids),
          teams: this.iterableList(it.teams || it.team_ids),
          created_by: it.created_by,
          updated_by: it.updated_by,
          created_date: it.created_date,
          updated_date: it.updated_date,
          // keep full raw item for reference if needed
          raw: it
        }));
        this.loader.hide();
        this.dataSource.data = this.categories;

      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.categories = []; 
        this.dataSource.data = this.categories;
      },
      complete: () => {
        this.loader.hide();
      }

    });
  }
  private hasFilterValues(): boolean {
    return !!(
      this.filterCountry ||
      this.filterCity ||
      this.filterIndustry ||
      this.filterSector ||
      this.filterName ||
      this.selectedInstitute ||
      this.selectedDepartments.length ||
      this.selectedTeams.length ||
      this.filterCreationDateAfter ||
      this.filterCreationDate ||
      this.filterActiveStatus !== null ||
      this.filterCreatedByMe ||
      this.filterPublicAccess !== null
    );
  }

  onApply(){
    if (!this.hasFilterValues()) {
      try { notify('Please add filters in the filter form.', 'info'); } catch(e) {}
      return;
    }
    this.hasAppliedFilters = true;
    this.fetchCategories();
    this.closeFiltersOverlay();
  }

  onReset(){
    this.filterName = '';
    if (this.selectedInstitute || this.loginInstituteId || this.isSuperAdmin) this.loadCategoryOptions();
    // this.selectedInstitute = null;
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
    if (this.isSuperAdmin) this.loadInstituteOptions();
    this.filter = '';
    this.dataSource.filter = '';
    this.categories = [];
    this.dataSource.data = [];
    this.hasAppliedFilters = false;
  }

  // toggle active state locally and try to persist to server (best-effort)
  toggleActive(element: any){
    const newState = !element.active;
    const action = newState ? 'activate' : 'deactivate';
    this.confirmService.confirm({ title: `${action[0].toUpperCase()+action.slice(1)} Question Bank`, message: `${action[0].toUpperCase()+action.slice(1)} question bank ${element.name}?`, confirmText: action[0].toUpperCase()+action.slice(1), cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      const prev = element.active;
      element.active = newState;
      element.active_status = newState;
      const id = element.category_id || element.id;
      if (!id) { element.active = prev; return; }
      const url = `${API_BASE}/category/${action}/${encodeURIComponent(String(id))}`;
      this.http.put<any>(url, { current_user: sessionStorage.getItem('user_id') || sessionStorage.getItem('user') || '' }).subscribe({
        next: () => { try { notify(`Question Bank ${action}d`, 'success'); } catch(e) {} },
        error: (err) => { console.error('Failed updating category state', err); try { notify('Failed to update question bank status', 'error'); } catch(e) {} ; element.active = prev; element.active_status = prev; }
      });
    });
  }

  viewDetails(element: any){
    const id = element.category_id || element.id;
    if (!id) return;
    this.selectedCategory = element;
  }

  EditCategory(element: any){
    const id = element?.category_id || element?.id;
    if (!id) return;
    this.loader.show();
    this.http.get<any>(`${API_BASE}/category-details`, { params: { category_id: String(id) } }).subscribe({
      next: (res) => {
        const items = Array.isArray(res) ? res : (res?.data || []);
        const category = items && items.length ? items[0] : element;
        this.saveCategoryReturnState();
        try{ sessionStorage.setItem('edit_category', JSON.stringify(category)); }catch(e){}
        this.router.navigate(['/category/create']);
      },
      error: () => {
        this.saveCategoryReturnState();
        try{ sessionStorage.setItem('edit_category', JSON.stringify(element)); }catch(e){}
        this.router.navigate(['/category/create']);
      },
      complete: () => {
        this.loader.hide();
      }
    });
  }

  closeModal(){
    this.selectedCategory = null;
    this.editing = false;
  }

  // utility used by template: return numeric length for arrays or object keys
  keysLength(v: any): number {
    if (!v) return 0;
    if (Array.isArray(v)) return v.length;
    if (typeof v === 'object') return Object.keys(v).length;
    return 0;
  }

  // helper to normalize iterable departments/teams for *ngFor if backend sometimes returns an object
  iterableList(v: any): any[] {
    if (!v) return [];
    if (Array.isArray(v)) return v;
    if (typeof v === 'object') return Object.keys(v).map(k => v[k]);
    return [];
  }
  openCreateCategory(): void {
    this.saveCategoryReturnState();
    this.router.navigate(['/category/create']);
  }

  saveCategoryReturnState(): void {
    try {
      sessionStorage.setItem('category_return_state', JSON.stringify({
        filter: this.filter,
        filterCountry: this.filterCountry,
        filterCity: this.filterCity,
        filterIndustry: this.filterIndustry,
        filterSector: this.filterSector,
        filterName: this.filterName,
        selectedInstitute: this.selectedInstitute,
        instituteSearch: this.instituteSearch,
        selectedDepartments: this.selectedDepartments,
        selectedTeams: this.selectedTeams,
        filterCreationDateAfter: this.filterCreationDateAfter ? this.filterCreationDateAfter.toISOString() : null,
        filterCreationDate: this.filterCreationDate ? this.filterCreationDate.toISOString() : null,
        filterActiveStatus: this.filterActiveStatus,
        filterCreatedByMe: this.filterCreatedByMe,
        filterPublicAccess: this.filterPublicAccess,
        hasAppliedFilters: this.hasAppliedFilters,
        categories: this.categories
      }));
    } catch (e) { }
  }

  private restoreCategoryReturnState(): void {
    try {
      const raw = sessionStorage.getItem('category_return_state');
      if (!raw) return;
      sessionStorage.removeItem('category_return_state');
      const state = JSON.parse(raw);
      this.filter = state?.filter || '';
      this.filterCountry = state?.filterCountry || '';
      this.filterCity = state?.filterCity || '';
      this.filterIndustry = state?.filterIndustry || '';
      this.filterSector = state?.filterSector || '';
      this.filterName = state?.filterName || '';
      this.selectedInstitute = state?.selectedInstitute || this.selectedInstitute;
      this.instituteSearch = state?.instituteSearch || '';
      this.selectedDepartments = Array.isArray(state?.selectedDepartments) ? state.selectedDepartments : [];
      this.selectedTeams = Array.isArray(state?.selectedTeams) ? state.selectedTeams : [];
      this.filterCreationDateAfter = state?.filterCreationDateAfter ? new Date(state.filterCreationDateAfter) : null;
      this.filterCreationDate = state?.filterCreationDate ? new Date(state.filterCreationDate) : null;
      this.filterActiveStatus = typeof state?.filterActiveStatus === 'undefined' ? null : state.filterActiveStatus;
      this.filterCreatedByMe = !!state?.filterCreatedByMe;
      this.filterPublicAccess = typeof state?.filterPublicAccess === 'undefined' ? null : state.filterPublicAccess;
      this.hasAppliedFilters = !!state?.hasAppliedFilters;
      this.categories = Array.isArray(state?.categories) ? state.categories : [];
      this.dataSource.data = this.categories;
      if (this.filterCountry) this.loadCitiesForCountry(this.filterCountry);
      if (this.filterCountry || this.filterCity || this.filterIndustry || this.filterSector) this.refreshInstituteScope();
      this.applyFilter(this.filter || '');
    } catch (e) {
      try { sessionStorage.removeItem('category_return_state'); } catch (_) { }
    }
  }

  private applyGlobalInstituteScopeIfActive(): void {
    const iid = sessionStorage.getItem('global_institute_id') || '';
    if (!iid) return;
    this.selectedInstitute = iid;
    this.hasAppliedFilters = false;
    try { this.onInstituteChange(iid); } catch (e) {}
    this.categories = []; this.dataSource.data = [];
  }
}

