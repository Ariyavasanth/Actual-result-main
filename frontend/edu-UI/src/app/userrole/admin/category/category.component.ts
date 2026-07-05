import { Component, OnInit, AfterViewInit, ViewChild,ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
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
export class CategoryComponent implements OnInit, AfterViewInit {
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

    this.pageMeta.setMeta('Categories', 'View and manage question bank categories');

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
        const iid = obj?.institute_id || obj?.instituteId || obj?.institute || null;
        if (iid) {
          this.loginInstituteId = String(iid);
          this.selectedInstitute = this.isSuperAdmin ? this.selectedInstitute : this.loginInstituteId;
        }
      }
    } catch (e) { /* ignore */ }
    this.loadFilterLists();
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

  refresh(){
    if (!this.hasAppliedFilters) {
      try { notify('Apply filters to fetch categories', 'info'); } catch(e) {}
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
    const scopedInstitute = this.isSuperAdmin ? this.selectedInstitute : (this.loginInstituteId || this.selectedInstitute);
    const instituteName = this.getInstituteLabel(scopedInstitute);
    if (instituteName) chips.push({ key: 'institute', label: `Institute: ${instituteName}`, removable: this.isSuperAdmin });
    if (this.filterName) chips.push({ key: 'category', label: `Category: ${this.filterName}`, removable: true });
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
    if (key === 'institute' && this.isSuperAdmin) {
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
    this.confirmService.confirm({ title: 'Delete Category', message: `Delete category ${c.name}? This action cannot be undone.`, confirmText: 'Delete', cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      // optimistic remove
      const prev = [...this.categories];
      this.categories = this.categories.filter(x => x.id !== c.id);
      this.dataSource.data = this.categories;
      const current_user = sessionStorage.getItem('user_id')
      const url = `${API_BASE}/delete/category/${encodeURIComponent(String(id))}?current_user=${encodeURIComponent(String(current_user))}`;
      // call backend generic manage route (category/delete)
      this.http.delete<any>(url , { }).subscribe({
        next: (res) => { try { notify('Category deleted', 'success'); } catch(e) {} },
        error: (err) => { console.error('Failed deleting category', err); try { notify('Failed to delete category', 'error'); } catch(e) {}; this.categories = prev; this.dataSource.data = this.categories; }
      });
    });
  }

  setName(v: string){ this.name = v || ''; }
  setDescription(v: string){ this.description = v || ''; }

  // load initial lists for institute/department/team filters (best-effort endpoints)
  loadFilterLists(){
    // Load institutes first, then load department/team lists according to the allowed institute scope.
    this.http.get<any>(`${API_BASE}/get-institute-list`).subscribe({ next: (res) => {
        const data = Array.isArray(res) ? res : (res?.data || []);
        this.institutes = (data || []).map((i: any) => ({ institute_id: i.institute_id || i.id || i.instituteId || null, short_name: i.short_name || i.name || i.institute_name || '' }));
        this.syncInstituteSearch();
        if (this.selectedInstitute) {
          this.onInstituteChange(this.selectedInstitute);
        } else if (this.isSuperAdmin) {
          this.loadGlobalDepartmentTeamLists();
        }
      }, error: () => {} });
  }

  private loadGlobalDepartmentTeamLists() {
    if (!this.isSuperAdmin) return;
    this.http.get<any>(`${API_BASE}/get-department-list`).subscribe({ next: (res) => { const data = Array.isArray(res) ? res : (res?.data || []); this.departments = (data || []).map((d:any)=> ({ id: d.department_id || d.dept_id || d.id || d.deptId, name: d.department_name || d.dept_name || d.name })); }, error: () => { this.departments = []; } });
    this.http.get<any>(`${API_BASE}/get-teams-list`).subscribe({ next: (res) => { const data = Array.isArray(res) ? res : (res?.data || []); this.teams = (data || []).map((t:any)=> ({ id: t.team_id || t.id || t.teamId, name: t.team_name || t.name })); }, error: () => { this.teams = []; } });
  }
  loadCategoryOptions() {
    const scopedInstitute = this.isSuperAdmin ? this.selectedInstitute : (this.loginInstituteId || this.selectedInstitute);
    let params = new HttpParams();
    if (scopedInstitute) params = params.set('institute', scopedInstitute);
    this.http.get<any>(`${API_BASE}/category-details`, { params }).subscribe({
      next: (res) => {
        const items = Array.isArray(res) ? res : (res?.data || []);
        this.categoryOptions = (items || []).map((it: any, idx: number) => ({
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
    const scopedInstitute = this.isSuperAdmin ? this.selectedInstitute : (this.loginInstituteId || this.selectedInstitute);
    if (this.filterName) params = params.set('name', this.filterName);
    if (scopedInstitute) params = params.set('institute', scopedInstitute);
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
        // normalize items
        this.categories = items.map((it: any, idx: number) => ({
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
    this.confirmService.confirm({ title: `${action[0].toUpperCase()+action.slice(1)} Category`, message: `${action[0].toUpperCase()+action.slice(1)} category ${element.name}?`, confirmText: action[0].toUpperCase()+action.slice(1), cancelText: 'Cancel' }).subscribe(ok => {
      if (!ok) return;
      const prev = element.active;
      element.active = newState;
      element.active_status = newState;
      const id = element.category_id || element.id;
      if (!id) { element.active = prev; return; }
      const url = `${API_BASE}/category/${action}/${encodeURIComponent(String(id))}`;
      this.http.put<any>(url, { current_user: sessionStorage.getItem('user_id') || sessionStorage.getItem('user') || '' }).subscribe({
        next: () => { try { notify(`Category ${action}d`, 'success'); } catch(e) {} },
        error: (err) => { console.error('Failed updating category state', err); try { notify('Failed to update category status', 'error'); } catch(e) {} ; element.active = prev; element.active_status = prev; }
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
      this.applyFilter(this.filter || '');
    } catch (e) {
      try { sessionStorage.removeItem('category_return_state'); } catch (_) { }
    }
  }
}
