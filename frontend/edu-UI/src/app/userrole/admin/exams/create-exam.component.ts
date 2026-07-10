import { Component, HostBinding, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/home/service/auth.service';
import { API_BASE } from 'src/app/shared/api.config';
import { notify } from 'src/app/shared/global-notify';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatButtonModule, MatIconModule, MatListModule, MatCheckboxModule, MatDatepickerModule, RouterModule, HttpClientModule, MatStepperModule, OverlayModule, PortalModule],
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit, AfterViewInit, OnDestroy {
  title = '';
  description = '';
  institute = '';
  durationMinutes: number | null = 10;
  passMark: number | null = 50;
  startDateTime = '';
  numberOfAttempts: number | null = 1; 
  institutes: Array<{ id: string; name: string }> = [];
  // categories UI model
  categories: Array<any> = [];
  selectedCategory = '';
  categoryCtrl = new FormControl('');
  filteredCategories$: Observable<any[]> = of([]);
  newCategory: { questions: number; randomize_questions?: boolean; question_type?: string; marks_per_question?: number | null } = { questions: 0, randomize_questions: false, question_type: '', marks_per_question: null };
  model: { categories?: Array<{ category_id?: string; name?: string; questions: number; question_ids?: any[]; randomize_questions?: boolean; question_type?: string; marks_per_question?: number | null; total_marks?: number | null }> } = { categories: [] };
  readOnly = false;
  filterEnabled = false;
  @ViewChild('filterAnchor', { static: false }) filterAnchor?: ElementRef;
  @ViewChild('filtersBtn', { read: ElementRef }) filtersBtn!: ElementRef;
  @ViewChild('filtersPanel') filtersPanelTpl!: TemplateRef<any>;

  private _docClickHandler: ((ev: any) => void) | null = null;
  private _randomBlockClickHandler: ((ev: any) => void) | null = null;
  // filter state for categories
  selectedDepartments: string[] = [];
  selectedTeams: string[] = [];
  filterCreationDateAfter: Date | null = null;
  filterCreationDate: Date | null = null;
  filterCreatedByMe: boolean = false;
  filterPublicAccess: boolean | null = null;
  appliedQuestionBankFilters: string[] = [];
  departments: Array<{ id: string; name: string }> = [];
  teams: Array<{ id: string; name: string }> = [];

  // question selection for currently selected category
  questionsForCategory: Array<any> = [];
  selectedQuestionIds: string[] = [];
  selectAllQuestions = false;
  activeQuestionCategoryId = '';
  activeQuestionCategoryName = '';
  questionCountError = '';
  tempQuestionsForCategory: Array<any> = [];
  private lastAddedQuestionSelectionByCategory: { [categoryId: string]: string } = {};

  private baseUrl = 'http://127.0.0.1:5001/edu/api';

  isSuperAdmin = false;
  private _subs: Subscription | null = null;
  editMode: boolean = false;
  editExamId: string | null = null;
  private filtersOverlayRef: OverlayRef | null = null;
  private categoryLoadSeq = 0;
  private questionLoadSeq = 0;
  private selectionLoadSeq = 0;
  private trackedInstituteForQuestionBanks = '';
  private hasTrackedInstituteForQuestionBanks = false;

  @HostBinding('class.hide-random-questions')
  get hideRandomQuestionsSection(): boolean {
    return !this.activeQuestionCategoryId || !this.questionsForCategory.length;
  }

  constructor(private router: Router, private http: HttpClient, private auth: AuthService, private pageMeta: PageMetaService, private overlay: Overlay, private vcr: ViewContainerRef, private loader: LoaderService) {
    try {
      this._subs = this.auth.user$.subscribe((user: any) => {
        this.isSuperAdmin = !!user && ['super_admin', 'superadmin', 'super-admin'].includes((user.role || '').toLowerCase());
      });
    } catch (e) { /* ignore */ }
  }

  openFiltersOverlay() {
    if (!this.filtersBtn) return;
    this.filterEnabled = true;
    if (this.filtersOverlayRef) { try { this.filtersOverlayRef.dispose(); } catch (e) { }; this.filtersOverlayRef = null; }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.filtersBtn)
      .withPositions([
        // prefer right side, vertically centered relative to trigger
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
        // fallback: place below trigger
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 }
      ])
      .withPush(true);

    this.filtersOverlayRef = this.overlay.create({ positionStrategy, hasBackdrop: true, backdropClass: 'cdk-overlay-transparent-backdrop', panelClass: 'overlay-filters-panel', scrollStrategy: this.overlay.scrollStrategies.reposition() });
    this.filtersOverlayRef.backdropClick().subscribe(() => this._closeOverlayInternal());
    this.filtersOverlayRef.keydownEvents().subscribe((ev: any) => { if (ev.key === 'Escape') this._closeOverlayInternal(); });

    const portal = new TemplatePortal(this.filtersPanelTpl, this.vcr);
    this.filtersOverlayRef.attach(portal);
  }

  closeFiltersOverlay() { if (this.filtersOverlayRef) { try { this.filtersOverlayRef.dispose(); } catch (e) { }; this.filtersOverlayRef = null; } }

  // ensure UI flag clears when overlay is closed programmatically
  private _closeOverlayInternal() {
    try { this.filtersOverlayRef?.dispose(); } catch(e) {}
    this.filtersOverlayRef = null;
    this.filterEnabled = false;
  }

  ngAfterViewInit(): void {
    try {
      this._docClickHandler = (ev: any) => {
        if (!this.filterEnabled) return;
        try {
          const anchorEl = this.filterAnchor?.nativeElement;
          if (!anchorEl) return;
          if (anchorEl.contains(ev.target)) return; // click inside anchor — keep open
          // clicked outside — close filter
          this.filterEnabled = false;
        } catch (e) { /* ignore */ }
      };
      document.addEventListener('click', this._docClickHandler);
      this._randomBlockClickHandler = (ev: any) => {
        const target = ev.target as HTMLElement | null;
        const button = target?.closest ? target.closest('button.next-btn') : null;
        if (!button || !this.shouldBlockRandomAllQuestionSelection()) return;
        ev.preventDefault();
        ev.stopImmediatePropagation();
        this.validateNewCategoryQuestionCount(true);
      };
      document.addEventListener('click', this._randomBlockClickHandler, true);
    } catch (e) { /* ignore */ }
  }


  ngOnDestroy(): void {
    try { this._subs?.unsubscribe(); } catch (e) { }
    try { if (this._docClickHandler) document.removeEventListener('click', this._docClickHandler); } catch (e) { }
    try { if (this._randomBlockClickHandler) document.removeEventListener('click', this._randomBlockClickHandler, true); } catch (e) { }
  }

  // Called when the Enable Filters checkbox toggles
  onFilterToggle(enabled: boolean) {
    this.filterEnabled = !!enabled;
  }
  ngOnInit(): void {
    if (this.editMode) {
      this.pageMeta.setMeta('Update Test', 'Update the exam details and click Update to save changes.')
    } else {
      this.pageMeta.setMeta('Create Test', 'Fill required fields and save the exam.')
    }

    // load institutes and edit payload, then ensure institute selection is reconciled
    this.loadInstitutes();
    // load edit payload first so it can override session
    this.loadEditTest();

    // if an institute is already present (from edit payload), ensure dependent lists load
    if (this.institute) {
      try { this.onInstituteChange(this.institute); } catch (e) { /* ignore */ }
    } else {
      // try to auto-select from session user
      try {
        const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
        if (raw) {
          const u = JSON.parse(raw);
          const inst = sessionStorage.getItem('global_institute_id') || u?.institute_id || u?.instituteId || (u?.institute && (u.institute.institute_id || u.institute.id || u.institute)) || u?.institute || '';
          if (inst && (sessionStorage.getItem('global_institute_id') || !this.isSuperAdmin)) {
            this.institute = String(inst);
            try { this.onInstituteChange(this.institute); } catch (e) { /* ignore */ }
          }
        }
      } catch (e) { /* ignore */ }
    }

    this.updateFilteredCategoriesStream();
  }

  /**
   * If an exam has been marked for edit (stored in sessionStorage by the list page),
   * populate the form with its values so the user can edit and save.
   */
  loadEditTest() {
    this.loader.show();
    try {
      const raw = sessionStorage.getItem('edit_exam');
      if (!raw) return;
      const e = JSON.parse(raw);
      if (!e) return;
      this.editMode = true;
      this.editExamId = e.exam_id || e.test_id || e.id || null;
      this.title = e.title || e.name || '';
      this.description = e.description || e.desc || '';
      this.institute = (e.institute && (e.institute.institute_id || e.institute.institute_id)) || e.institute_id || '';
      this.durationMinutes = e.duration_mins || e.duration || null;
      this.passMark = e.pass_mark ?? e.passMark ?? null;
      this.numberOfAttempts = e.number_of_attempts ?? e.numberOfAttempts ?? null;
      this.startDateTime = e.start_time || e.start || '';

      // normalize categories if present in the payload
      const srcCats = Array.isArray(e.categories) ? e.categories : (Array.isArray(e.category_list) ? e.category_list : []);
      this.model.categories = srcCats.map((c: any) => this.normalizeEditCategory(c));
      this.hydrateMissingEditCategoryMarks();
    } catch (_) { /* ignore malformed edit payload */ }
    finally { this.loader.hide(); }
  }

  setStartNow() {
    const d = new Date();
    const tz = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - tz).toISOString().slice(0, 16);
    this.startDateTime = local;
  }

  addCategory() {
    this.addSelectedQuestionBankQuestions();
  }

  addSelectedQuestionBankQuestions() {
    const catId = this.activeQuestionCategoryId || this.selectedCategory || '';
    if (!catId) return;

    const existingIndex = Array.isArray(this.model.categories)
      ? this.model.categories.findIndex((c: any) => String(c.category_id) === String(catId))
      : -1;
    const existing = existingIndex >= 0 ? this.model.categories![existingIndex] : null;
    const cat = this.categories.find(c => String(c.category_id) === String(catId));
    const isDraft = String(catId) === String(this.selectedCategory);
    const randomizeQuestions = isDraft ? !!this.newCategory.randomize_questions : !!existing?.randomize_questions;

    if (isDraft && !this.validateNewCategoryQuestionCount(true)) return;
    if (!randomizeQuestions && !this.selectedQuestionIds.length) return;

    const selectedIds = randomizeQuestions ? [] : [...this.selectedQuestionIds];
    const requestedQuestions = randomizeQuestions ? (Number(this.newCategory.questions) || 0) : selectedIds.length;
    const selectionKey = this.getQuestionSelectionKey(selectedIds);
    const draftName = this.getQuestionBankDraftName();
    const item = {
      category_id: catId,
      name: isDraft ? draftName : (existing?.name || cat?.name || this.activeQuestionCategoryName || ''),
      questions: requestedQuestions,
      question_ids: selectedIds,
      randomize_questions: randomizeQuestions,
      question_type: isDraft ? (this.newCategory.question_type || '') : (existing?.question_type || cat?.type || ''),
      marks_per_question: isDraft ? (this.newCategory.marks_per_question ?? null) : (this.getMarksPerQuestion(existing) ?? this.getMarksPerQuestion(cat) ?? null),
      total_marks: this.calculateTotalMarks(requestedQuestions, isDraft ? this.newCategory.marks_per_question : (this.getMarksPerQuestion(existing) ?? this.getMarksPerQuestion(cat)))
    };

    if (existingIndex >= 0) {
      this.model.categories = this.model.categories!.map((c, i) => i === existingIndex ? item : c);
    } else {
      this.model.categories = [...(this.model.categories || []), item];
    }
    this.activeQuestionCategoryId = catId;
    this.activeQuestionCategoryName = item.name || this.activeQuestionCategoryName;
    this.newCategory.questions = requestedQuestions;
    this.lastAddedQuestionSelectionByCategory[String(catId)] = selectionKey;
    if (isDraft) this.resetQuestionBankDraft(true);
  }

  removeCategory(index: number) {
    if (!Array.isArray(this.model.categories)) return;
    const removed = this.model.categories[index];
    if (removed?.category_id) delete this.lastAddedQuestionSelectionByCategory[String(removed.category_id)];
    this.model.categories = this.model.categories.filter((_, i) => i !== index);
    if (removed && removed.category_id === this.activeQuestionCategoryId) {
      const next = this.model.categories[0];
      if (next) this.viewCategoryQuestions(next);
      else {
        this.activeQuestionCategoryId = '';
        this.activeQuestionCategoryName = '';
        this.questionsForCategory = [];
        this.selectedQuestionIds = [];
        this.selectAllQuestions = false;
      }
    }
  }

  loadInstitutes() {
    this.loader.show();
    const url = `${API_BASE}/get-institute-list`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.institutes = arr.map((r: any) => ({ id: String(r.institute_id || r.id || r.instituteId || ''), name: r.short_name || r.name || r.institute_name || '' }));

        // If an institute is already selected (from edit payload or elsewhere), try to reconcile
        try {
          if (this.institute) {
            const want = String(this.institute);
            const found = this.institutes.find(x => String(x.id) === want || String(x.id) === String(Number(want || 0)));
            if (found) {
              this.institute = String(found.id);
              this.onInstituteChange(this.institute);
              return;
            }
          }
        } catch (e) { /* ignore */ }
        finally { this.loader.hide(); }

        // Fallback: try reading user's institute from sessionStorage
        try {
          const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
          if (raw) {
            const u = JSON.parse(raw);
            const instId = sessionStorage.getItem('global_institute_id') || u?.institute_id || u?.instituteId || (u?.institute && (u.institute.institute_id || u.institute.id || u.institute)) || u?.institute || '';
            if (instId) {
              const found = this.institutes.find(x => String(x.id) === String(instId));
              if (found) {
                this.institute = String(found.id);
                this.onInstituteChange(this.institute);
              }
            }
          }
        } catch (e) { /* ignore malformed session data */ }

      }, error: () => { /* ignore - keep empty list */ }
      , complete: () => { this.loader.hide(); }
    });
  }

  loadCategories() {
    this.loader.show();
    const requestSeq = ++this.categoryLoadSeq;
    const url = `${API_BASE}/get-categories-list`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (requestSeq !== this.categoryLoadSeq) return;
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.categories = arr.map((c: any) => this.normalizeCategoryOption(c));
        this.reconcileAttachedQuestionBankMarks();
        // update autocomplete stream
        this.updateFilteredCategoriesStream();
      }, error: (err) => {
        if (requestSeq !== this.categoryLoadSeq) return;
        console.warn('Failed to load categories', err);
        this.categories = [];
        this.updateFilteredCategoriesStream();
      }
      , complete: () => { this.loader.hide(); }
    });
  }

  displayCategory(c: any) { return c ? (c.name || c.category_name || '') : ''; }

  onQuestionBankNameInput(event: Event) {
    if (!this.selectedCategory) return;
    const name = ((event.target as HTMLInputElement)?.value || '').trim();
    if (name) this.activeQuestionCategoryName = name;
  }

  private getQuestionBankDraftName(): string {
    const value: any = this.categoryCtrl.value;
    const typedName = typeof value === 'string'
      ? value.trim()
      : String(value?.name || value?.category_name || '').trim();
    return typedName || this.activeQuestionCategoryName || '';
  }

  private normalizeCategoryOption(c: any): any {
    return {
      ...c,
      category_id: c?.category_id || c?.id || c?._id || '',
      name: c?.name || c?.category_name || c?.title || '',
      type: c?.type || c?.category_type || c?.question_type || '',
      mark_each_question: this.getMarksPerQuestion(c)
    };
  }

  private toNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return isNaN(n) ? null : n;
  }

  private getMarksPerQuestion(value: any): number | null {
    return this.toNumber(
      value?.marks_per_question ??
      value?.marksPerQuestion ??
      value?.mark_each_question ??
      value?.markEachQuestion ??
      value?.mark_for_each_question ??
      value?.marks_for_each_question ??
      value?.marksForEachQuestion ??
      value?.question_mark ??
      value?.question_marks ??
      value?.category_mark ??
      value?.category_marks ??
      value?.marks ??
      value?.mark ??
      value?.points ??
      value?.category?.marks_per_question ??
      value?.category?.mark_each_question ??
      value?.category?.mark_for_each_question ??
      value?.category?.marks ??
      value?.category?.mark
    );
  }

  private getTotalMarks(value: any): number | null {
    return this.toNumber(
      value?.total_marks ??
      value?.totalMarks ??
      value?.total_mark ??
      value?.marks_total ??
      value?.total_score ??
      value?.category?.total_marks
    );
  }

  private getQuestionCount(value: any): number {
    const count = this.toNumber(
      (Array.isArray(value?.questions) ? null : value?.questions) ??
      value?.number_of_questions ??
      value?.total_questions ??
      value?.questions_count ??
      value?.question_count ??
      value?.count
    );
    if (count !== null) return count;
    if (Array.isArray(value?.question_ids)) return value.question_ids.length;
    if (Array.isArray(value?.questionIds)) return value.questionIds.length;
    if (Array.isArray(value?.questions)) return value.questions.length;
    if (Array.isArray(value?.question_list)) return value.question_list.length;
    return 0;
  }

  private getQuestionIds(value: any): any[] {
    if (Array.isArray(value?.question_ids)) return value.question_ids;
    if (Array.isArray(value?.questionIds)) return value.questionIds;
    const questionArray = Array.isArray(value?.questions) ? value.questions : (Array.isArray(value?.question_list) ? value.question_list : []);
    return questionArray.map((q: any) => q?.question_id || q?.id || q?._id || null).filter(Boolean);
  }

  private calculateTotalMarks(questions: any, marksPerQuestion: any): number | null {
    const questionCount = this.toNumber(questions);
    const marks = this.toNumber(marksPerQuestion);
    return questionCount !== null && marks !== null ? questionCount * marks : null;
  }

  private deriveMarksFromQuestionList(value: any): number | null {
    const questionArray = Array.isArray(value?.questions) ? value.questions : (Array.isArray(value?.question_list) ? value.question_list : []);
    const marks = Array.from(new Set(questionArray.map((q: any) => this.getMarksPerQuestion(q)).filter((v: number | null) => v !== null))) as number[];
    return marks.length === 1 ? marks[0] : null;
  }

  getCategoryMarksPerQuestion(category: any): number {
    const categoryId = String(category?.category_id || category?.category?.category_id || '');
    const option = (this.categories || []).find((c: any) => String(c?.category_id || '') === categoryId);
    return this.getMarksPerQuestion(category) ?? this.deriveMarksFromQuestionList(category) ?? this.getMarksPerQuestion(option) ?? 0;
  }

  getCategoryTotalMarks(category: any): number {
    const savedTotal = this.getTotalMarks(category);
    const calculatedTotal = this.calculateTotalMarks(this.getQuestionCount(category), this.getCategoryMarksPerQuestion(category));
    if (savedTotal !== null && savedTotal > 0) return savedTotal;
    return calculatedTotal ?? savedTotal ?? 0;
  }

  private normalizeEditCategory(c: any) {
    const catObj = c?.category || {};
    const questions = this.getQuestionCount(c);
    const marksPerQuestion = this.getMarksPerQuestion(c) ?? this.deriveMarksFromQuestionList(c);
    return {
      category_id: c?.category_id || catObj?.category_id || c?.id || c?._id || c?.categoryId || '',
      name: c?.category_name || catObj?.category_name || c?.name || catObj?.name || c?.title || '',
      questions,
      question_ids: this.getQuestionIds(c),
      randomize_questions: typeof c?.randomize_questions !== 'undefined' ? !!c.randomize_questions : !!c?.randomize,
      question_type: c?.question_type || catObj?.question_type || c?.type || catObj?.type || c?.category_type || catObj?.category_type || '',
      marks_per_question: marksPerQuestion,
      total_marks: this.getTotalMarks(c) ?? this.calculateTotalMarks(questions, marksPerQuestion)
    };
  }

  private hydrateMissingEditCategoryMarks() {
    if (!this.editMode || !Array.isArray(this.model.categories) || !this.model.categories.length) return;
    this.model.categories
      .filter((category: any) => category?.category_id && this.getCategoryMarksPerQuestion(category) <= 0)
      .forEach((category: any) => {
        const categoryId = String(category.category_id);
        const url = `${API_BASE}/category-details?category_id=${encodeURIComponent(categoryId)}`;
        this.http.get<any>(url).subscribe({
          next: (res) => {
            const items = Array.isArray(res) ? res : (res?.data || []);
            const detail = Array.isArray(items) && items.length ? items[0] : (res?.data && !Array.isArray(res.data) ? res.data : res);
            const normalized = this.normalizeCategoryOption(detail || {});
            const marksPerQuestion = this.getMarksPerQuestion(normalized);
            if (marksPerQuestion === null) return;
            this.model.categories = (this.model.categories || []).map((item: any) => {
              if (String(item?.category_id || '') !== categoryId) return item;
              const questions = this.getQuestionCount(item);
              return {
                ...item,
                question_type: item.question_type || normalized.type || '',
                marks_per_question: marksPerQuestion,
                total_marks: this.calculateTotalMarks(questions, marksPerQuestion)
              };
            });
          },
          error: (err) => { console.warn('Failed to load marks for attached question bank', err); }
        });
      });
  }

  private reconcileAttachedQuestionBankMarks() {
    if (!this.editMode || !Array.isArray(this.model.categories) || !this.model.categories.length || !this.categories.length) return;
    this.model.categories = this.model.categories.map((category: any) => {
      const categoryId = String(category?.category_id || '');
      const option = this.categories.find((c: any) => String(c?.category_id || '') === categoryId);
      const marksPerQuestion = this.getMarksPerQuestion(category) ?? this.getMarksPerQuestion(option);
      if (marksPerQuestion === null) return category;
      const questions = this.getQuestionCount(category);
      return {
        ...category,
        question_type: category.question_type || option?.type || '',
        marks_per_question: marksPerQuestion,
        total_marks: this.getTotalMarks(category) && this.getTotalMarks(category)! > 0 ? this.getTotalMarks(category) : this.calculateTotalMarks(questions, marksPerQuestion)
      };
    });
  }

  private resetQuestionBanksAndQuestionsSection() {
    this.selectionLoadSeq++;
    this.questionLoadSeq++;
    this.selectedCategory = '';
    this.categoryCtrl.setValue('');
    this.newCategory = { questions: 0, randomize_questions: false, question_type: '', marks_per_question: null };
    this.model.categories = [];
    this.tempQuestionsForCategory = [];
    this.questionsForCategory = [];
    this.selectedQuestionIds = [];
    this.selectAllQuestions = false;
    this.activeQuestionCategoryId = '';
    this.activeQuestionCategoryName = '';
    this.questionCountError = '';
    this.lastAddedQuestionSelectionByCategory = {};
  }
  private resetQuestionBankDraft(clearDisplayedQuestions = false) {
    this.selectedCategory = '';
    this.categoryCtrl.setValue('');
    this.newCategory = { questions: 0, randomize_questions: false, question_type: '', marks_per_question: null };
    this.tempQuestionsForCategory = [];
    this.questionCountError = '';
    if (clearDisplayedQuestions) {
      this.activeQuestionCategoryId = '';
      this.activeQuestionCategoryName = '';
      this.questionsForCategory = [];
      this.selectedQuestionIds = [];
      this.selectAllQuestions = false;
    }
  }

  formatQuestionBankType(type: any): string {
    const value = String(type || '').trim();
    if (!value) return '--';
    return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  private deriveQuestionTypeFromQuestions(questions: Array<any>): string {
    const types = Array.from(new Set((questions || []).map(q => String(q.type || q.question_type || '').trim()).filter(Boolean)));
    if (!types.length) return '';
    return types.length === 1 ? types[0] : 'Mixed';
  }

  private deriveMarksFromQuestions(questions: Array<any>): number | null {
    const marks = Array.from(new Set((questions || []).map((q: any) => this.getMarksPerQuestion(q)).filter((v: number | null) => v !== null))) as number[];
    return marks.length === 1 ? marks[0] : null;
  }
  onCategoryAutocompleteSelected(c: any) {
    if (!c) return;
    const normalized = this.normalizeCategoryOption(c);
    const existing = (this.model.categories || []).find((item: any) => String(item.category_id) === String(normalized.category_id));
    if (existing) {
      this.loadAttachedQuestionBankDraft(normalized, existing);
      return;
    }
    this.loadQuestionBankDraft(c);
  }
  private loadAttachedQuestionBankDraft(category: any, attached: any) {
    const catId = String(attached?.category_id || category?.category_id || '');
    if (!catId) return;
    const requestSeq = ++this.selectionLoadSeq;
    this.questionLoadSeq++;
    this.selectedCategory = catId;
    this.categoryCtrl.setValue(category);
    this.questionCountError = '';
    this.tempQuestionsForCategory = [];
    this.questionsForCategory = [];
    this.selectedQuestionIds = Array.isArray(attached.question_ids) ? attached.question_ids.map((id: any) => String(id)) : [];
    this.selectAllQuestions = false;
    this.activeQuestionCategoryId = catId;
    this.activeQuestionCategoryName = attached.name || category.name || 'Selected category';
    this.newCategory = {
      questions: Number(attached.questions) || 0,
      randomize_questions: !!attached.randomize_questions,
      question_type: attached.question_type || category.type || '',
      marks_per_question: this.getMarksPerQuestion(attached) ?? this.getMarksPerQuestion(category)
    };
    this.loadAttachedQuestionBankDraftQuestions(catId, requestSeq, this.selectedQuestionIds, !!attached.randomize_questions);
  }

  private loadAttachedQuestionBankDraftQuestions(catId: string, requestSeq: number, selectedIds: string[], randomizeQuestions: boolean) {
    this.loader.show();
    const url = `${API_BASE}/get-questions-details?category_id=${encodeURIComponent(catId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (requestSeq !== this.selectionLoadSeq || String(this.selectedCategory) !== String(catId)) return;
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.tempQuestionsForCategory = arr.map((q: any, i: number) => ({ id: q.id || q.question_id || q._id || String(i), question: q.question || q.text || q.title || '', type: q.type || q.question_type || '', marks: this.getMarksPerQuestion(q), raw: q }));
        this.questionsForCategory = [...this.tempQuestionsForCategory];
        this.selectedQuestionIds = randomizeQuestions ? [] : selectedIds.map(id => String(id));
        this.selectAllQuestions = !randomizeQuestions && this.questionsForCategory.length > 0 && this.questionsForCategory.every(q => this.selectedQuestionIds.includes(String(q.id)));
        if (!this.newCategory.question_type) this.newCategory.question_type = this.deriveQuestionTypeFromQuestions(this.tempQuestionsForCategory);
        if (this.newCategory.marks_per_question === null || typeof this.newCategory.marks_per_question === 'undefined') this.newCategory.marks_per_question = this.deriveMarksFromQuestions(this.tempQuestionsForCategory);
        this.validateNewCategoryQuestionCount(false);
      },
      error: (err) => {
        if (requestSeq !== this.selectionLoadSeq) return;
        console.warn('Failed to load questions for attached question bank', err);
        this.tempQuestionsForCategory = [];
        this.questionsForCategory = [];
        this.selectedQuestionIds = [];
        this.selectAllQuestions = false;
        this.questionCountError = 'Unable to load questions for the selected Question Bank.';
      },
      complete: () => { if (requestSeq === this.selectionLoadSeq) this.loader.hide(); }
    });
  }
  private loadQuestionBankDraft(category: any) {
    const normalized = this.normalizeCategoryOption(category);
    const catId = normalized.category_id || '';
    if (!catId) return;
    const requestSeq = ++this.selectionLoadSeq;
    this.selectedCategory = catId;
    this.questionCountError = '';
    this.tempQuestionsForCategory = [];
    this.questionsForCategory = [];
    this.selectedQuestionIds = [];
    this.selectAllQuestions = false;
    this.activeQuestionCategoryId = catId;
    this.activeQuestionCategoryName = normalized.name || 'Selected category';
    this.newCategory = {
      questions: 0,
      randomize_questions: true,
      question_type: normalized.type || '',
      marks_per_question: this.getMarksPerQuestion(normalized)
    };
    this.loadQuestionBankDraftDetails(catId, requestSeq);
    this.loadQuestionBankDraftQuestions(catId, requestSeq);
  }

  private loadQuestionBankDraftDetails(catId: string, requestSeq: number) {
    const url = `${API_BASE}/category-details?category_id=${encodeURIComponent(catId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (requestSeq !== this.selectionLoadSeq || String(this.selectedCategory) !== String(catId)) return;
        const items = Array.isArray(res) ? res : (res?.data || []);
        const detail = Array.isArray(items) && items.length ? items[0] : (res?.data && !Array.isArray(res.data) ? res.data : res);
        if (!detail) return;
        const normalized = this.normalizeCategoryOption(detail);
        this.newCategory.question_type = normalized.type || this.newCategory.question_type || '';
        this.newCategory.marks_per_question = this.getMarksPerQuestion(normalized) ?? this.newCategory.marks_per_question ?? null;
      },
      error: (err) => { console.warn('Failed to load question bank details', err); }
    });
  }

  private loadQuestionBankDraftQuestions(catId: string, requestSeq: number) {
    this.loader.show();
    const url = `${API_BASE}/get-questions-details?category_id=${encodeURIComponent(catId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (requestSeq !== this.selectionLoadSeq || String(this.selectedCategory) !== String(catId)) return;
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.tempQuestionsForCategory = arr.map((q: any, i: number) => ({ id: q.id || q.question_id || q._id || String(i), question: q.question || q.text || q.title || '', type: q.type || q.question_type || '', marks: this.getMarksPerQuestion(q), raw: q }));
        this.questionsForCategory = [...this.tempQuestionsForCategory];
        this.selectedQuestionIds = [];
        this.selectAllQuestions = false;
        this.newCategory.questions = this.tempQuestionsForCategory.length;
        if (!this.newCategory.question_type) this.newCategory.question_type = this.deriveQuestionTypeFromQuestions(this.tempQuestionsForCategory);
        if (this.newCategory.marks_per_question === null || typeof this.newCategory.marks_per_question === 'undefined') this.newCategory.marks_per_question = this.deriveMarksFromQuestions(this.tempQuestionsForCategory);
        this.validateNewCategoryQuestionCount(false);
      },
      error: (err) => {
        if (requestSeq !== this.selectionLoadSeq) return;
        console.warn('Failed to load questions for selected question bank', err);
        this.tempQuestionsForCategory = [];
        this.questionsForCategory = [];
        this.selectedQuestionIds = [];
        this.selectAllQuestions = false;
        this.newCategory.questions = 0;
        this.questionCountError = 'Unable to load questions for the selected Question Bank.';
      },
      complete: () => { if (requestSeq === this.selectionLoadSeq) this.loader.hide(); }
    });
  }
  // load categories with filters (called by Apply)
  loadCategoriesWithFilters(filters: any = {}) {
    this.loader.show();
    const requestSeq = ++this.categoryLoadSeq;
    const currentUser = this.getCurrentUserId();
    const base = `${API_BASE}/get-categories-list`;
    const params: string[] = [];
    if (filters.institute_id) params.push(`institute_id=${encodeURIComponent(filters.institute_id)}`);
    if (filters.departments && filters.departments.length) params.push(`departments=${encodeURIComponent(filters.departments.join(','))}`);
    if (filters.teams && filters.teams.length) params.push(`teams=${encodeURIComponent(filters.teams.join(','))}`);
    if (filters.created_after) params.push(`created_after=${encodeURIComponent(filters.created_after)}`);
    if (filters.created_before) params.push(`created_before=${encodeURIComponent(filters.created_before)}`);
    if (typeof filters.created_by !== 'undefined' && filters.created_by && currentUser) params.push(`created_by=${encodeURIComponent(String(currentUser))}`);
    if (typeof filters.public_access !== 'undefined' && filters.public_access !== null) params.push(`public_access=${encodeURIComponent(String(filters.public_access))}`);
    const url = params.length ? `${base}?${params.join('&')}` : base;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (requestSeq !== this.categoryLoadSeq) return;
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.categories = arr.map((c: any) => this.normalizeCategoryOption(c));
        this.reconcileAttachedQuestionBankMarks();
        // ensure autocomplete reflects latest categories
        this.updateFilteredCategoriesStream();
      }, error: (err) => {
        if (requestSeq !== this.categoryLoadSeq) return;
        console.warn('Failed to load categories with filters', err);
        this.categories = [];
        this.updateFilteredCategoriesStream();
      }
      , complete: () => { this.loader.hide(); }
    });
  }

  /**
   * Ensure `filteredCategories$` observable is wired to `categoryCtrl.valueChanges`
   * so the autocomplete updates when `this.categories` changes.
   */
  updateFilteredCategoriesStream() {
    try {
      const base = this.categories || [];
      this.filteredCategories$ = of(base);
      this.filteredCategories$ = this.categoryCtrl.valueChanges.pipe(
        startWith(''),
        map((val: any) => {
          const q = (typeof val === 'string' ? val : (val?.name || '')).toLowerCase();
          return (this.categories || []).filter((c: any) => (c.name || '').toLowerCase().includes(q));
        })
      );
    } catch (e) {
      this.filteredCategories$ = of(this.categories || []);
    }
  }
  private hasCategoryFilterValues(): boolean {
    return !!(
      (this.selectedDepartments && this.selectedDepartments.length) ||
      (this.selectedTeams && this.selectedTeams.length) ||
      this.filterCreationDateAfter ||
      this.filterCreationDate ||
      this.filterCreatedByMe ||
      this.filterPublicAccess !== null
    );
  }

  private getQuestionBankFilterLabels(): string[] {
    const labels: string[] = [];
    const departmentNames = (this.selectedDepartments || [])
      .map(id => this.departments.find(d => String(d.id) === String(id))?.name || String(id))
      .filter(Boolean);
    const teamNames = (this.selectedTeams || [])
      .map(id => this.teams.find(t => String(t.id) === String(id))?.name || String(id))
      .filter(Boolean);

    if (departmentNames.length) labels.push(`Departments: ${departmentNames.join(', ')}`);
    if (teamNames.length) labels.push(`Teams: ${teamNames.join(', ')}`);
    if (this.filterCreationDateAfter) labels.push(`Created after: ${(this.filterCreationDateAfter as Date).toISOString().slice(0, 10)}`);
    if (this.filterCreationDate) labels.push(`Created before: ${(this.filterCreationDate as Date).toISOString().slice(0, 10)}`);
    if (this.filterCreatedByMe) labels.push('Created by me');
    if (this.filterPublicAccess !== null && typeof this.filterPublicAccess !== 'undefined') labels.push(`Public access: ${this.filterPublicAccess ? 'Yes' : 'No'}`);
    return labels;
  }
  onApply() {
    if (!this.hasCategoryFilterValues()) {
      try { notify('Please add filters in the filter form.', 'info'); } catch (e) {}
      return;
    }
    const filters: any = { institute_id: this.institute };
    if (this.selectedDepartments && this.selectedDepartments.length) filters.departments = this.selectedDepartments;
    if (this.selectedTeams && this.selectedTeams.length) filters.teams = this.selectedTeams;
    if (this.filterCreationDateAfter) filters.created_after = (this.filterCreationDateAfter as Date).toISOString().slice(0, 10);
    if (this.filterCreationDate) filters.created_before = (this.filterCreationDate as Date).toISOString().slice(0, 10);
    if (this.filterCreatedByMe) filters.created_by = true;
    if (this.filterPublicAccess !== null && typeof this.filterPublicAccess !== 'undefined') filters.public_access = this.filterPublicAccess;
    this.appliedQuestionBankFilters = this.getQuestionBankFilterLabels();
    this.loadCategoriesWithFilters(filters);
  }

  onReset() {
    this.selectedDepartments = [];
    this.selectedTeams = [];
    this.filterCreationDateAfter = null;
    this.filterCreationDate = null;
    this.filterCreatedByMe = false;
    this.filterPublicAccess = null;
    this.appliedQuestionBankFilters = [];
    // reload categories for current institute if any
    this.loadCategoriesWithFilters({ institute_id: this.institute });
  }

  onInstituteChange(value: any) {
    const v = value !== undefined && value !== null ? String(value) : '';
    const instituteChanged = this.hasTrackedInstituteForQuestionBanks && this.trackedInstituteForQuestionBanks !== v;

    this.institute = v;
    this.categoryLoadSeq++;

    if (instituteChanged) {
      this.categories = [];
      this.selectedDepartments = [];
      this.selectedTeams = [];
      this.filterCreationDateAfter = null;
      this.filterCreationDate = null;
      this.filterCreatedByMe = false;
      this.filterPublicAccess = null;
      this.resetQuestionBanksAndQuestionsSection();
    }
    this.trackedInstituteForQuestionBanks = v;
    this.hasTrackedInstituteForQuestionBanks = true;

    this.updateFilteredCategoriesStream();
    if (this.institute) {
      this.loadDepartments(this.institute);
      this.loadTeams(this.institute);
      // also reload categories scoped to this institute
      this.loadCategoriesWithFilters({ institute_id: this.institute });
    } else {
      this.departments = [];
      this.teams = [];
      this.loadCategories();
    }
  }

  loadDepartments(instId?: string) {
    this.loader.show();
    if (!instId) { this.departments = []; return; }
    const url = `${API_BASE}/get-department-list`;
    this.http.get<any>(url, { params: { institute_id: instId } }).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.departments = arr.map((d: any) => ({ id: d.dept_id || d.id || d.deptId, name: d.name || d.dept_name || d.title || '' }));
      }, error: (err) => { console.warn('Failed to load departments', err); this.departments = []; },
      complete: () => { this.loader.hide(); }
    });
  }

  loadTeams(instId?: string) {
    if (!instId) { this.teams = []; return; }
    const url = `${API_BASE}/get-teams-list`;
    this.http.get<any>(url, { params: { institute_id: instId } }).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.teams = arr.map((t: any) => ({ id: t.team_id || t.id || t.teamId, name: t.name || t.team_name || t.title || '' }));
      }, error: (err) => { console.warn('Failed to load teams', err); this.teams = []; }
    });
  }

  onCategoryChange(catId: string) {
    const found = (this.categories || []).find(c => String(c.category_id) === String(catId));
    if (found) this.loadQuestionBankDraft(found);
  }

  viewCategoryQuestions(category: any) {
    if (!category || !category.category_id) return;
    if (String(category.category_id) === String(this.activeQuestionCategoryId) && this.questionsForCategory.length) {
      this.activeQuestionCategoryId = '';
      this.activeQuestionCategoryName = '';
      this.questionsForCategory = [];
      this.selectedQuestionIds = [];
      this.selectAllQuestions = false;
      return;
    }
    this.activeQuestionCategoryId = category.category_id;
    this.activeQuestionCategoryName = category.name || 'Selected category';
    this.loadQuestionsForCategory(category.category_id, Array.isArray(category.question_ids) ? category.question_ids : []);
  }


  isCategoryQuestionsExpanded(category: any): boolean {
    return !!category &&
      String(category.category_id) === String(this.activeQuestionCategoryId) &&
      this.questionsForCategory.length > 0;
  }
  loadQuestionsForCategory(catId: string, preselectedQuestionIds: any[] = [], populateQuestionCount = false) {
    this.loader.show();
    const requestSeq = ++this.questionLoadSeq;
    this.questionsForCategory = [];
    this.selectedQuestionIds = (preselectedQuestionIds || []).map(id => String(id));
    this.selectAllQuestions = false;
    if (!catId) { this.loader.hide(); return; }
    const found = this.categories.find(c => String(c.category_id) === String(catId));
    this.activeQuestionCategoryId = catId;
    this.activeQuestionCategoryName = found?.name || this.activeQuestionCategoryName || 'Selected category';
    const url = `${API_BASE}/get-questions-details?category_id=${encodeURIComponent(catId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (requestSeq !== this.questionLoadSeq) return;
        const arr = Array.isArray(res) ? res : (res?.data || []);
        this.questionsForCategory = arr.map((q: any, i: number) => ({ id: q.id || q.question_id || q._id || String(i), question: q.question || q.text || q.title || '', raw: q }));
        if (populateQuestionCount) {
          this.newCategory.questions = this.questionsForCategory.length;
          this.newCategory.randomize_questions = true;
          this.selectedQuestionIds = [];
          this.selectAllQuestions = false;
          this.validateNewCategoryQuestionCount(false);
          return;
        }
        this.selectAllQuestions = this.questionsForCategory.length > 0 && this.questionsForCategory.every(q => this.selectedQuestionIds.includes(String(q.id)));
        this.lastAddedQuestionSelectionByCategory[String(catId)] = this.getQuestionSelectionKey(this.selectedQuestionIds);
      }, error: (err) => {
        if (requestSeq !== this.questionLoadSeq) return;
        console.warn('Failed to load questions for category', err);
        this.questionsForCategory = [];
        if (populateQuestionCount) {
          this.newCategory.questions = 0;
          this.selectedQuestionIds = [];
          this.questionCountError = 'Unable to load questions for the selected Question Bank.';
        }
      },
      complete: () => { if (requestSeq === this.questionLoadSeq) this.loader.hide(); }
    });
  }

  onNewCategoryQuestionCountChange(value: any) {
    this.newCategory.questions = Number(value) || 0;
    this.validateNewCategoryQuestionCount(false);
  }

  onNewCategoryRandomizeChange(checked: boolean) {
    this.newCategory.randomize_questions = !!checked;
    if (!this.newCategory.randomize_questions) {
      const available = this.selectedQuestionBankQuestionCount || this.questionsForCategory.length;
      if (available > 0) this.newCategory.questions = available;
      this.questionCountError = '';
    } else {
      this.validateNewCategoryQuestionCount(false);
    }
  }

  get selectedQuestionBankQuestionCount(): number {
    if (!this.selectedCategory) return 0;
    return this.tempQuestionsForCategory.length;
  }

  get canAddSelectedQuestionBank(): boolean {
    const available = this.selectedQuestionBankQuestionCount;
    const requested = Number(this.newCategory.questions) || 0;
    return !!this.selectedCategory && available > 0 && requested >= 1 && requested <= available;
  }

  get canAddSelectedQuestionBankQuestions(): boolean {
    if (!this.activeQuestionCategoryId) return false;
    if (String(this.activeQuestionCategoryId) === String(this.selectedCategory) && this.newCategory.randomize_questions) {
      return this.canAddSelectedQuestionBank && !this.shouldBlockRandomAllQuestionSelection();
    }
    if (!this.questionsForCategory.length || !this.selectedQuestionIds.length) return false;
    const categoryId = String(this.activeQuestionCategoryId);
    return this.getQuestionSelectionKey(this.selectedQuestionIds) !== this.lastAddedQuestionSelectionByCategory[categoryId];
  }

  private getQuestionSelectionKey(ids: any[]): string {
    return (ids || []).map(id => String(id)).sort().join('|');
  }

  isNewCategoryQuestionCountValid(): boolean {
    return this.canAddSelectedQuestionBank;
  }

  private validateNewCategoryQuestionCount(showNotification: boolean, updateMessage = true): boolean {
    const available = this.selectedQuestionBankQuestionCount;
    const requested = Number(this.newCategory.questions) || 0;
    const maxMessage = `The selected Question Bank contains only ${available} questions. Please enter a number between 1 and ${available}.`;
    const minMessage = available > 0 ? `Please enter a number between 1 and ${available}.` : 'The selected Question Bank does not contain any questions.';
    const allRandomMessage = `You have selected all available questions. Random selection has no effect because every student will receive the same questions.`;
    let message = '';

    if (!this.selectedCategory) message = '';
    else if (available <= 0) message = minMessage;
    else if (requested < 1) message = minMessage;
    else if (requested > available) message = maxMessage;
    else if (this.newCategory.randomize_questions && requested === available) message = allRandomMessage;

    if (updateMessage) this.questionCountError = message;
    if (message && showNotification && message !== allRandomMessage) notify(message, 'error');
    return !message;
  }

  private shouldBlockRandomAllQuestionSelection(): boolean {
    return false;
  }


  private getDraftQuestionIds(): string[] {
    if (this.newCategory.randomize_questions) return [];
    const requested = Number(this.newCategory.questions) || 0;
    return this.tempQuestionsForCategory.slice(0, requested).map(q => String(q.id));
  }

  private applyNewCategoryQuestionCountSelection(showNotification: boolean, updateMessage = true): boolean {
    return this.validateNewCategoryQuestionCount(showNotification, updateMessage);
  }


  isActiveQuestionBankRandomized(): boolean {
    if (String(this.activeQuestionCategoryId || '') === String(this.selectedCategory || '')) return !!this.newCategory.randomize_questions;
    const activeCategory = (this.model.categories || []).find((c: any) => String(c.category_id) === String(this.activeQuestionCategoryId));
    return !!activeCategory?.randomize_questions;
  }
  toggleSelectAllQuestions(checked: boolean) {
    this.selectAllQuestions = !!checked;
    if (this.selectAllQuestions) this.selectedQuestionIds = this.questionsForCategory.map(q => String(q.id));
    else this.selectedQuestionIds = [];
    this.syncActiveCategoryQuestionSelection();
  }

  toggleQuestionSelection(id: string, checked: boolean) {
    const sid = String(id);
    if (checked) {
      if (this.selectedQuestionIds.indexOf(sid) === -1) this.selectedQuestionIds.push(sid);
    } else {
      this.selectedQuestionIds = this.selectedQuestionIds.filter(x => x !== sid);
      this.selectAllQuestions = false;
    }
    if (checked) this.selectAllQuestions = this.questionsForCategory.length > 0 && this.questionsForCategory.every(q => this.selectedQuestionIds.includes(String(q.id)));
    this.syncActiveCategoryQuestionSelection();
  }

  private syncActiveCategoryQuestionSelection() {
    if (!this.activeQuestionCategoryId || !Array.isArray(this.model.categories)) return;
    const idx = this.model.categories.findIndex((c: any) => String(c.category_id) === String(this.activeQuestionCategoryId));
    if (idx < 0) return;
    if ((this.model.categories[idx] as any).randomize_questions) return;
    const updated = {
      ...this.model.categories[idx],
      question_ids: [...this.selectedQuestionIds],
      questions: this.selectedQuestionIds.length,
      total_marks: this.calculateTotalMarks(this.selectedQuestionIds.length, this.getMarksPerQuestion(this.model.categories[idx]))
    };
    this.model.categories = this.model.categories.map((c, i) => i === idx ? updated : c);
  }

  // Returns true if any category in the model has randomize_questions truthy

  isQuestionBankOptionChecked(cat: any): boolean {
    const catId = String(cat?.category_id || '');
    if (!catId) return false;
    return Array.isArray(this.model.categories) && this.model.categories.some((c: any) => String(c?.category_id || '') === catId);
  }
  anyCategoryRandomized(): boolean {
    try {
      if (!Array.isArray(this.model.categories)) return false;
      return this.model.categories.some((c: any) => !!c && !!c.randomize_questions);
    } catch (e) { return false; }
  }

  get totalQuestions(): number {
    if (!Array.isArray(this.model.categories)) return 0;
    return this.model.categories.reduce((sum, c) => {
      const byIds = Array.isArray((c as any).question_ids) ? ((c as any).question_ids).length : 0;
      const byNum = typeof (c as any).questions === 'number' ? Number((c as any).questions) : 0;
      return sum + (byIds > 0 ? byIds : byNum);
    }, 0);
  }

  /** Return current user id from session storage if available */
  getCurrentUserId(): string | null {
    try {
      const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      if (!raw) return null;
      const u = JSON.parse(raw);
      return (u && (u.user_id || u.id || u.userId || u._id)) ? String(u.user_id || u.id || u.userId || u._id) : null;
    } catch (e) {
      return null;
    }
  }

  private getExamSaveErrorMessage(err: any, fallback: string): string {
    const serverMessage = err?.error?.statusMessage || err?.error?.message || err?.message || '';
    const raw = typeof err?.error === 'string' ? err.error : JSON.stringify(err?.error || {});
    const combined = `${serverMessage} ${raw}`.toLowerCase();
    if (combined.includes('string or binary data would be truncated') || combined.includes('error inserting exam')) {
      return 'Could not save test. One of the fields is longer than the database allows. Please shorten the description and try again.';
    }
    return serverMessage || fallback;
  }

  save() {
    // basic validation
    if (!this.title || !this.title.trim()) { notify('Title is required', 'error'); return; }
    if (!this.institute) { notify('Institute is required', 'error'); return; }
    if (this.durationMinutes === null || isNaN(Number(this.durationMinutes))) { notify('Duration is required', 'error'); return; }
    if (this.passMark !== null && this.passMark !== undefined && (Number(this.passMark) < 0 || Number(this.passMark) > 100)) { notify('Pass Percentage must be between 0 and 100', 'error'); return; }

    const currentUser = this.getCurrentUserId();
    const payload: any = {
      title: String(this.title).trim(),
      description: this.description || null,
      institute_id: this.institute || null,
      duration_minutes: Number(this.durationMinutes),
      pass_mark: this.passMark !== null ? Number(this.passMark) : null,
      number_of_attempts: this.numberOfAttempts !== null ? Number(this.numberOfAttempts) : null,
      start_time: this.startDateTime || null,
      categories: Array.isArray(this.model.categories) ? this.model.categories : [],
      total_questions: this.totalQuestions
    };

    // attach audit fields when available
    if (currentUser) {
      if (this.editMode && this.editExamId) payload.updated_by = currentUser;
      else payload.created_by = currentUser;
    }

    // If editing an existing exam, call update endpoint
    if (this.editMode && this.editExamId) {
      payload.exam_id = this.editExamId;
      this.loader.show();
      const url = `${API_BASE}/update-exam`;
      this.http.post<any>(url, payload).subscribe({
        next: (res) => {
          try { const msg = res?.statusMessage || res?.message || 'Test updated'; const ok = typeof res?.status === 'undefined' ? true : !!res.status; notify(msg, ok ? 'success' : 'error'); } catch(e){}
          try { sessionStorage.removeItem('edit_exam'); } catch (e) { }
          this.router.navigate(['/exams']);
        }, error: (err) => {
          console.error('Failed to update exam', err);
          try { notify(this.getExamSaveErrorMessage(err, 'Failed to update exam'), 'error'); } catch(e){}
          this.loader.hide();
        }, complete: () => { this.loader.hide(); }
      });
      return;
    }

    const url = `${API_BASE}/register-exam`;
    this.loader.show();
    this.http.post<any>(url, payload).subscribe({
      next: (res) => {
        try { const msg = res?.statusMessage || res?.message || 'Test created'; const ok = typeof res?.status === 'undefined' ? true : !!res.status; notify(msg, ok ? 'success' : 'error'); } catch(e){}
        try { sessionStorage.removeItem('edit_exam'); } catch (e) { }
        this.router.navigate(['/exams']);
      }, error: (err) => {
        console.error('Failed to create exam', err);
        try { notify(this.getExamSaveErrorMessage(err, 'Failed to create exam'), 'error'); } catch(e){}
        this.loader.hide();
      }, complete: () => { this.loader.hide(); }
    });
  }

  reset() {
    this.loader.show();
    this.title = '';
    this.description = '';
    this.institute = '';
    this.durationMinutes = null;
    this.passMark = null;
    this.startDateTime = '';
    // if not in edit mode, clear any leftover edit payload
    try { if (!this.editMode) sessionStorage.removeItem('edit_exam'); } catch (e) { }
    this.loader.hide();
  }

  cancel() {
    try { sessionStorage.removeItem('edit_exam'); } catch (e) { }
    try { sessionStorage.setItem('exams_return_state', 'true'); } catch (e) { }
    this.router.navigate(['/exams']);
  }
}

