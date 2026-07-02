import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { API_BASE } from 'src/app/shared/api.config';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatSlideToggleModule, MatStepperModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  name = '';
  description = '';
  institute = '';
  type = '';
  whoInputs = '';
  evaluation = '';
  status = '';
  markForEachQuestion: number | null = null;
  readonly ALL_OPTION_VALUE = '__all__';
  selectedDepartments: string[] = [];
  selectedTeams: string[] = [];
  publicAccess = false; // default No
  isEditing = false;
  editId: string | null = null;
  formSubmitted = false;
  categoryInfoSubmitted = false;

  institutesList: Array<{ id: string; name: string }> = [];
  typeOptions = [ { id: 'objective', name: 'Objective' }, { id: 'descriptive', name: 'Descriptive' } ];
  whoInputOptions = [ { id: 'instructor', name: 'Instructor' }, { id: 'student', name: 'Student' } ];
  evaluationOptions = [ { id: 'auto', name: 'Automatic' }, { id: 'manual', name: 'Manual' } ];
  statusOptions = [ { id: 'true', name: 'Active' }, { id: 'false', name: 'Inactive' } ];

  departments: Array<{ id: string; name: string }> = [];
  teams: Array<{ id: string; name: string }> = [];
  isSuperAdmin: boolean = false;
  currentUserId: string | null = null;

  constructor(private router: Router, private http: HttpClient, private loader: LoaderService,private pageMeta: PageMetaService, private snack: MatSnackBar){}

  ngOnInit(): void{
    try {
      const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      if (raw) {
        const u = JSON.parse(raw);
        this.isSuperAdmin = !!(u && (u.is_super_admin === true || u.isSuperAdmin || u.role === 'super_admin' || u.user_role === 'super_admin'));
        this.currentUserId = u?.user_id || u?.id || u?.userId || null;
        const instId = u?.institute_id || u?.instituteId || u?.institute || '';
        if (instId) this.institute = String(instId);
      }
    } catch (e) { /* ignore */ }

    // if we are editing an existing category, load it from sessionStorage
    try{
      const raw = sessionStorage.getItem('edit_category');
      if(raw){
        const c = JSON.parse(raw);
        this.applyEditCategory(c);
        // remove to avoid accidental reuse
        try{ sessionStorage.removeItem('edit_category'); }catch(e){}
      }
    }catch(e){ /* ignore parse errors */ }

    this.pageMeta.setMeta(this.isEditing ? 'Edit question bank':'Create question bank', this.isEditing ? 'Update the category details and click Update to save changes.' : 'Add a new category for the question bank. Fill required fields and save.');
    this.loadInstitutes();
    if (this.institute) {
      this.loadDepartments();
      this.loadTeams();
    }
  }

  private applyEditCategory(c: any): void {
    this.isEditing = true;
    this.editId = c.category_id || c.id || c._id || null;
    this.name = c.name || c.category_name || '';
    this.description = c.description || '';

    if (c.institute && typeof c.institute === 'object') {
      this.institute = c.institute.institute_id || c.institute.id || '';
    } else {
      this.institute = c.institute_id || c.institute || '';
    }

    this.type = c.type || '';
    this.whoInputs = c.answer_by || c.who_inputs || '';
    this.evaluation = c.evaluation || '';
    this.status = (typeof c.active_status !== 'undefined') ? String(c.active_status) : (c.status || '');
    this.markForEachQuestion = (typeof c.mark_each_question !== 'undefined') ? c.mark_each_question : (c.mark_for_each_question || null);
    this.publicAccess = !!c.public_access;
    this.selectedDepartments = this.normalizeEntityIds(c.departments || c.department_ids, 'department');
    this.selectedTeams = this.normalizeEntityIds(c.teams || c.team_ids, 'team');
  }

  private normalizeEntityIds(value: any, kind: 'department' | 'team'): string[] {
    const idKeys = kind === 'department'
      ? ['department_id', 'dept_id', 'id', '_id']
      : ['team_id', 'id', '_id'];
    const list = Array.isArray(value) ? value : (value && typeof value === 'object' ? Object.values(value) : []);
    return list
      .map((item: any) => {
        if (!item) return '';
        if (typeof item !== 'object') return String(item);
        const foundKey = idKeys.find(key => item[key]);
        return foundKey ? String(item[foundKey]) : '';
      })
      .filter((id: string) => !!id);
  }

  loadInstitutes(){
    const url = `${API_BASE}/get-institute-list`;
    this.http.get<any>(url).subscribe({ next: (res) => {
      const data = res?.data || [];
      this.institutesList = (Array.isArray(data) ? data : [])
        .map((i:any)=>({ id: i.institute_id || i.id || i.code, name: i.short_name || i.institute_name || i.name }))
        .filter((i:any) => !!i.id);
      if (!this.institute && !this.isSuperAdmin && this.institutesList.length === 1) {
        this.setInstitute(String(this.institutesList[0].id));
        return;
      }
      // if institute was prefilled from sessionStorage, trigger setInstitute to load dependent lists
      try{ if(this.institute) this.setInstitute(this.institute); }catch(e){}
    }, error: () => {
      this.institutesList = [];
      this.snack.open('Unable to load institutes. Please refresh and try again.', 'Close', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' });
    } });
  }

  loadDepartments(){
    const url = `${API_BASE}/get-department-list`;
    const params: any = {};
    if (this.institute) params.institute_id = this.institute;
    this.http.get<any>(url, { params }).subscribe({ next: (res) => {
      const data = res?.data || res || [];
      this.departments = (Array.isArray(data) ? data : [])
        .map((d:any)=> ({ id: d.department_id || d.id || d.code, name: d.department_name || d.name }))
        .filter((d:any) => !!d.id);
      this.selectedDepartments = this.onlyAvailableIds(this.selectedDepartments, this.departments);
    }, error: () => {
      this.departments = [];
      this.selectedDepartments = [];
    } });
  }

  loadTeams(){
    const url = `${API_BASE}/get-teams-list`;
    const params: any = {};
    if (this.institute) params.institute_id = this.institute;
    this.http.get<any>(url, { params }).subscribe({ next: (res) => {
      const data = res?.data || res || [];
      this.teams = (Array.isArray(data) ? data : [])
        .map((t:any)=> ({ id: t.team_id || t.id || t.code, name: t.team_name || t.name }))
        .filter((t:any) => !!t.id);
      this.selectedTeams = this.onlyAvailableIds(this.selectedTeams, this.teams);
    }, error: () => {
      this.teams = [];
      this.selectedTeams = [];
    } });
  }

  save(){
    this.formSubmitted = true;
    this.categoryInfoSubmitted = true;
    this.loader.show();
    if (this.isNameInvalid()){
      this.loader.hide();
      this.snack.open('Name is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' });
      return;
    }
    if (this.isInstituteInvalid()) { this.loader.hide(); this.snack.open('Institute is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    if (!this.type) { this.loader.hide(); this.snack.open('Type is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    if (this.isDepartmentsInvalid()) { this.loader.hide(); this.snack.open('Please select at least one department.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    if (this.isTeamsInvalid()) { this.loader.hide(); this.snack.open('Please select at least one team.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    // if (!this.whoInputs) { this.loader.hide(); this.snack.open('Who inputs the answer is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    // if (!this.evaluation) { this.loader.hide(); this.snack.open('Evaluation is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    if (!this.status) { this.loader.hide(); this.snack.open('Status is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }
    if (this.isMarkInvalid()){ this.loader.hide(); this.snack.open('Mark for each question is required and must be a number.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' }); return; }

    const payload: any = {
      name: String(this.name).trim(),
      description: this.description || null,
      // backend expects institute id as institute_id when present
      institute_id: this.institute || null,
      type: this.type,
      who_inputs: this.whoInputs,
      evaluation: this.evaluation,
      status: this.status,
      // public access flag
      public_access: !!this.publicAccess,
      mark_for_each_question: Number(this.markForEachQuestion),
      departments: Array.isArray(this.selectedDepartments) ? this.selectedDepartments : [],
      teams: Array.isArray(this.selectedTeams) ? this.selectedTeams : []
    };

    if (this.isEditing && this.editId) {
      // include who updated this category if available
      if (this.currentUserId) payload.updated_by = this.currentUserId;
      const url = `${API_BASE}/update-category/${encodeURIComponent(String(this.editId))}`;
      this.http.put<any>(url, payload).subscribe({ next: (res) => {
        this.snack.open(res?.message || 'Category updated successfully', 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        this.router.navigate(['/category']);
      }, complete: () => { this.loader.hide(); }, error: (err) => { this.loader.hide(); console.error('Failed to update category', err); const msg = err?.error?.statusMessage || err?.error?.message || err?.message || 'Failed to update category'; this.snack.open(msg, 'Close', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' }); } });
    } else {
      if (this.currentUserId) payload.created_by = this.currentUserId;
      const url = `${API_BASE}/add-categories`;
      this.http.post<any>(url, payload).subscribe({ next: (res) => {
        this.snack.open(res?.message || 'Category saved successfully', 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
        this.router.navigate(['/category']);
      }, complete: () => { this.loader.hide(); }, error: (err) => { this.loader.hide(); console.error('Failed to save category', err); const msg = err?.error?.statusMessage || err?.error?.message || err?.message || 'Failed to save category'; this.snack.open(msg, 'Close', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' }); } });
    }
  }
     // Reset the form fields to their defaults
     reset(): void {
       this.name = '';
       this.description = '';
       this.institute = '';
       this.type = '';
       this.whoInputs = '';
       this.evaluation = '';
       this.status = '';
       this.markForEachQuestion = null;
       this.selectedDepartments = [];
       this.selectedTeams = [];
        this.publicAccess = false;
        this.formSubmitted = false;
        this.categoryInfoSubmitted = false;
     }
  cancel(){ this.router.navigate(['/category']); }
  setName(v: string){ this.name = v || ''; }
  setDescription(v: string){ this.description = v || ''; }
  setInstitute(v: string){ this.institute = v || ''; this.loadDepartments(); this.loadTeams(); }
  setType(v: string){ this.type = v || ''; }
  setWhoInputs(v: string){ this.whoInputs = v || ''; }
  setEvaluation(v: string){ this.evaluation = v || ''; }
  setStatus(v: string){ this.status = v || ''; }
  setMark(v: string){ const n = Number(v); this.markForEachQuestion = isNaN(n) ? null : n; }
  setDepartments(v: string[]){ this.selectedDepartments = this.onlyAvailableIds(v, this.departments); }
  setTeams(v: string[]){ this.selectedTeams = this.onlyAvailableIds(v, this.teams); }

  goToAccessStep(stepper: any): void {
    this.categoryInfoSubmitted = true;
    if (this.isNameInvalid()) {
      this.snack.open('Name is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' });
      return;
    }
    if (this.isTypeInvalid()) {
      this.snack.open('Type is required.', 'Close', { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' });
      return;
    }
    stepper.next();
  }

  isNameInvalid(): boolean { return !this.name || !this.name.trim(); }
  isInstituteInvalid(): boolean { return !this.institute; }
  isTypeInvalid(): boolean { return !this.type; }
  isDepartmentsInvalid(): boolean { return !this.selectedDepartments || this.selectedDepartments.length === 0; }
  isTeamsInvalid(): boolean { return !this.selectedTeams || this.selectedTeams.length === 0; }
  isStatusInvalid(): boolean { return !this.status; }
  isMarkInvalid(): boolean { return this.markForEachQuestion === null || isNaN(Number(this.markForEachQuestion)); }

  get departmentSelectValue(): string[] {
    return this.withAllOption(this.selectedDepartments, this.departments);
  }

  get teamSelectValue(): string[] {
    return this.withAllOption(this.selectedTeams, this.teams);
  }

  toggleAllDepartments(event: any) {
    if (!event?.isUserInput) return;
    this.selectedDepartments = event?.source?.selected ? this.getOptionIds(this.departments) : [];
  }

  toggleAllTeams(event: any) {
    if (!event?.isUserInput) return;
    this.selectedTeams = event?.source?.selected ? this.getOptionIds(this.teams) : [];
  }

  setDepartmentOption(id: string, event: any) {
    if (!event?.isUserInput) return;
    this.selectedDepartments = this.updateOptionSelection(this.selectedDepartments, id, !!event?.source?.selected);
  }

  setTeamOption(id: string, event: any) {
    if (!event?.isUserInput) return;
    this.selectedTeams = this.updateOptionSelection(this.selectedTeams, id, !!event?.source?.selected);
  }

  private getOptionIds(options: Array<{ id: string; name: string }>): string[] {
    return (options || []).map(o => String(o.id)).filter(id => !!id);
  }

  private onlyAvailableIds(values: string[], options: Array<{ id: string; name: string }>): string[] {
    const allowed = new Set(this.getOptionIds(options));
    return (Array.isArray(values) ? values : []).map(v => String(v)).filter(v => allowed.has(v));
  }

  private withAllOption(selected: string[], options: Array<{ id: string; name: string }>): string[] {
    const selectedIds = this.onlyAvailableIds(selected, options);
    const optionIds = this.getOptionIds(options);
    const allSelected = optionIds.length > 0 && optionIds.every(id => selectedIds.includes(id));
    return allSelected ? [this.ALL_OPTION_VALUE, ...selectedIds] : selectedIds;
  }

  private updateOptionSelection(selected: string[], id: string, isSelected: boolean): string[] {
    const selectedIds = new Set((selected || []).map(v => String(v)).filter(v => v !== this.ALL_OPTION_VALUE));
    const optionId = String(id || '');
    if (!optionId) return Array.from(selectedIds);
    if (isSelected) selectedIds.add(optionId);
    else selectedIds.delete(optionId);
    return Array.from(selectedIds);
  }

  // Helper: get display name for institute id
  getInstituteName(id: string | null | undefined): string {
    if (!id) return '';
    const found = (this.institutesList || []).find(i => String(i.id) === String(id));
    return found ? found.name : String(id);
  }

  // Helper: get option label from a list of {id,name}
  getOptionName(list: Array<{id:any,name:string}>|null|undefined, id: any): string {
    if (!list || !id) return '';
    const f = list.find(x => String(x.id) === String(id));
    return f ? f.name : String(id);
  }

  getDepartmentName(id: string | null | undefined): string {
    if (!id) return '';
    const f = (this.departments || []).find(d => String(d.id) === String(id));
    return f ? f.name : String(id);
  }

  getTeamName(id: string | null | undefined): string {
    if (!id) return '';
    const f = (this.teams || []).find(t => String(t.id) === String(id));
    return f ? f.name : String(id);
  }
}
