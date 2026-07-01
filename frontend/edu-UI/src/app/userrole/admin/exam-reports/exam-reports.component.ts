import { Component, ViewChild, ElementRef, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { API_BASE } from 'src/app/shared/api.config';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TemplatePortal } from '@angular/cdk/portal';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-exam-reports',
  templateUrl: './exam-reports.component.html',
  styleUrls: ['./exam-reports.component.scss']
})
export class ExamReportsComponent implements OnInit, OnDestroy {
  reportsApplied = false;
  appliedFilters: any = null;
  categoryAnalytics: any[] = [];
  questionSummary: any[] = [];
  filteredQuestionSummary: any[] = [];
  wrongDistribution: any[] = [];
  // wrong answer modal state
  showWrongAnswerSummary = false;
  selectedQuestionForWrongSummary: any = null;
  selectedWrongAnswers: Array<{ id: string; answer: string; count?: number; pct?: string } | any> = [];
  // resources modal state
  showResourcePanel = false;
  selectedResources: Array<{ resource_id?: string; full_name?: string; email?: string; url?: string }> = [];
  selectedResourceContext: any = null; // { question, wrongAnswer }
  // user report state
  userReportData: any[] = [];
  userReportTotal = 0;
  // user review panel state
  showUserReviewPanel = false;
  userReviewAttempts: any[] = [];
  userReviewLoading = false;
  selectedUserName: string | null = null;
  selectedUserScore: string | number | null = null;
  selectedUserResult: string | null = null;
  totalQuestions: number | null = null;
  totalMarks: string | number | null = null;
  pageSize = 25;
  currentPage = 1;
  searchQuery = ''; 
  commentEdit = false;
  updatedBy = '';
  
  // placeholders for template bindings
  examCtrl = new FormControl('');
  instituteCtrl = new FormControl<any>('');
  filteredInstitutes$: Observable<any[]> = of([]);
  filteredExams$: Observable<any[]> = of([]);
  allExams: any[] = [];
  selectedExam: any = null;
  activeMainTabIndex = 0;
  innerAnalyticsTabIndex = 0;
  userFilterOpen = false;
  userFilters: any = { department_id: '', teams_id: '', country_id: '', city_id: '', campus_id: '' };
  countries: any[] = [];
  cities: any[] = [];
  campusList: any[] = [];
  departmentList: any[] = [];
  teamList: any[] = [];
  institutes: Array<{ id: string; name: string }> = [];
  selectedInstituteId: string | null = null;

  @ViewChild('filtersBtn', { read: ElementRef }) filtersBtn!: ElementRef;
  @ViewChild('filtersPanel') filtersPanelTpl!: TemplateRef<any>;
  
  // simple pagination controls without MatPaginator binding
  loadingUserReport = false;

  get totalPages(): number{
    return Math.max(1, Math.ceil((this.userReportTotal || 0) / this.pageSize));
  }

  get userAverageScore(): number {
    const scores = (this.userReportData || []).map((row: any) => this.toMetricNumber(row.marks_obtained ?? row.score ?? row.marks)).filter((value: number) => value > 0);
    return scores.length ? scores.reduce((sum: number, value: number) => sum + value, 0) / scores.length : 0;
  }

  get userPassRate(): number {
    const rows = this.userReportData || [];
    const passed = rows.filter((row: any) => String(row.result || row.status || '').toLowerCase() === 'pass').length;
    return rows.length ? (passed / rows.length) * 100 : 0;
  }

  get analyticsTotalAttempts(): number {
    return (this.categoryAnalytics || []).reduce((sum: number, item: any) => sum + this.toMetricNumber(item.total_attempts ?? item.attempts), 0);
  }

  get analyticsMistakeCount(): number {
    return (this.categoryAnalytics || []).reduce((sum: number, item: any) => sum + this.toMetricNumber(item.wrong_answers ?? item.mistakes ?? item.wrong_count), 0);
  }

  get activeQuestionCount(): number {
    return (this.filteredQuestionSummary && this.filteredQuestionSummary.length ? this.filteredQuestionSummary : this.questionSummary || []).length;
  }

  /**
   * Open question summary filtered to a specific category. If analytics data isn't loaded yet,
   * request it first and apply a pending filter.
   */
  openCategoryQuestionSummary(category: any){
    if(!category) return;
    const cid = String(category.category_id || category.id || category._id || category.categoryId || '');
    if(!cid) return;
    // ensure main tab is analytics
    this.activeMainTabIndex = 1;
    // if question summary already loaded, filter immediately
    if(this.questionSummary && this.questionSummary.length){
      this.filteredQuestionSummary = (this.questionSummary || []).filter((q:any) => this._getQuestionCategoryId(q) === cid);
      this.innerAnalyticsTabIndex = 1; // switch inner tab to Question Summary
      return;
    }
    // otherwise, request analytics and apply filter after load
    this._pendingCategoryFilter = cid;
    this.loadAnalytics();
  }

  private filtersOverlayRef: OverlayRef | null = null;
  private _subs: Subscription | null = null;
  resetFilters: any = {};

  constructor(
    private http: HttpClient,
    private loading: LoaderService,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private pageMeta: PageMetaService,
    private _snack: MatSnackBar,
    private confirm: ConfirmService
  ) {}

  private _pendingCategoryFilter: string | null = null;

  // Robustly extract a category id from different question shapes.
  private _getQuestionCategoryId(q: any): string {
    if (!q) return '';
    // If question has a nested `category` object, try common id fields
    const cat = q.category;
    if (cat && typeof cat === 'object') {
      return String(cat.id || cat._id || cat.category_id || cat.categoryId || cat.cat_id || '').trim();
    }
    // If category_id is an array, take first element
    if (Array.isArray(q.category_id) && q.category_id.length) return String(q.category_id[0]).trim();
    // Try several flat fields
    return String(q.category_id ?? q.category ?? q.categoryId ?? q.cat_id ?? q.catId ?? '').trim();
  }

  private toMetricNumber(value: any): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  // Normalize selected_option into an array of trimmed strings.
  private _normalizeSelectedOption(selected: any): string[] {
    try {
      if (!selected && selected !== 0) return [];
      if (Array.isArray(selected)) {
        // flatten items that might be comma-separated strings
        return selected.flatMap((it: any) => {
          if (typeof it === 'string') return it.split(',').map((s: string) => s.trim()).filter(Boolean);
          return [String(it)];
        });
      }
      if (typeof selected === 'string') {
        return selected.split(',').map(s => s.trim()).filter(Boolean);
      }
      // fallback to single value
      return [String(selected)];
    } catch (e) {
      return [];
    }
  }

  // Return review comments for a question filtered by one or more categories.
  // `categories` can be a string or an array of strings. Comparison is case-insensitive.
  reviewComments(q: any, categories: string | string[]): any[] {
    try {
      const comments = (q && q.review_comment && Array.isArray(q.review_comment.comments)) ? q.review_comment.comments : [];
      if (!comments || !comments.length) return [];
      const cats = Array.isArray(categories) ? categories.map(String) : [String(categories)];
      const normalized = cats.map(c => (c || '').toString().toLowerCase());
      return (comments || []).filter((c: any) => normalized.includes(((c && c.category) || '').toString().toLowerCase()));
    } catch (e) {
      return [];
    }
  }

  // Open user review by calling backend API /review-user-exam
  openUserReview(row: any){
    if(!row) return;
    // set header fields used in template
    try{
      this.selectedUserName = row.student_name || row.name || row.user_name || row.full_name || null;
      this.selectedUserScore = row.marks_obtained ?? row.score ?? row.marks ?? null;
      this.selectedUserResult = row.result ?? row.status ?? null;
      this.totalQuestions = row.total_questions || row.total || null;
      this.totalMarks = row.total_marks || row.totalMarks || null;
    }catch(e){
      this.selectedUserName = null; this.selectedUserScore = null; this.selectedUserResult = null; this.totalQuestions = null; this.totalMarks = null;
    }
    const userId = row.user_id || row.student_id || row.id || row.userId || null;
    const scheduleId = String(this.selectedExam?.schedule_id || this.selectedExam?.id || this.selectedExam?.scheduleId || '');
    if(!userId || !scheduleId) return;
    const params: any = { user_id: String(userId), scheduler_id: scheduleId };
    // if browser is offline, show a retry snackbar instead of firing the request
    if(typeof navigator !== 'undefined' && !navigator.onLine){
      const snack = this._snack.open('You appear to be offline. Retry?', 'Retry', { duration: 10000 });
      snack.onAction().subscribe(() => this.fetchUserReview(params));
      return;
    }
    this.fetchUserReview(params);
  }

  private fetchUserReview(params: any){
    this.userReviewLoading = true;
    this.loading.show();
    this.http.get<any>(`${API_BASE}/review-user-exam`, { params }).subscribe({
      next: (res)=>{
        try{
          const body = res || {};
          // backend returns { data: [ attemptObj, ... ] }
          let attempts: any[] = [];
          if(Array.isArray(body.data)) {
            attempts = body.data;
          } else if(Array.isArray(body)) {
            attempts = body as any[];
          } else if(Array.isArray(body?.data?.data)) {
            attempts = body.data.data;
          } else if(Array.isArray(body?.attempts)) {
            attempts = body.attempts;
          }

          // normalize each attempt: ensure review/questions array exists and normalize selected options
          this.userReviewAttempts = (attempts || []).map(a => {
            const reviewList = a.review || a.questions || a.attempt_review || [];
            const normalizedReview = (Array.isArray(reviewList) ? reviewList : []).map((q:any) => {
              try{
                // normalize selected_option into array of values
                q.selected_option = this._normalizeSelectedOption(q.selected_option || q.selected_options || q.selected || []);
                // also ensure options is an array
                if (!Array.isArray(q.options) && q.options && typeof q.options === 'object') {
                  // sometimes options come as an object map, convert to array
                  q.options = Object.keys(q.options).map(k => q.options[k]);
                }
              }catch(e){}
              return q;
            });
            return { ...a, review: normalizedReview };
          });
          // If total marks not set from the row, try to take it from the first attempt returned
          if((this.totalMarks === null || this.totalMarks === undefined) && this.userReviewAttempts && this.userReviewAttempts.length){
            const first = this.userReviewAttempts[0] || {};
            this.totalMarks = first.total_marks ?? first.totalMarks ?? first.total ?? null;
            // also set selectedUserScore fallback if not available from the row
            if((this.selectedUserScore === null || this.selectedUserScore === undefined) && (first.score || first.marks || first.marks_obtained || first.percentage !== undefined)){
              this.selectedUserScore = first.score ?? first.marks ?? first.marks_obtained ?? null;
            }
            // ensure totalQuestions if missing
            if((this.totalQuestions === null || this.totalQuestions === undefined) && (first.total_questions || first.totalQuestions || first.totalQuestionsCount)){
              this.totalQuestions = first.total_questions ?? first.totalQuestions ?? null;
            }
          }
        }catch(e){
          console.warn('Failed to parse review-user-exam response', e);
          this.userReviewAttempts = [];
        }
        this.loading.hide();
        this.userReviewLoading = false;
        if(!this.userReviewAttempts || !this.userReviewAttempts.length){
          this._snack.open('No review data available for this user.', 'Close', { duration: 4000 });
          this.showUserReviewPanel = false;
        } else {
          this.showUserReviewPanel = true;
        }
      },
      error: (err)=>{
        console.error('[ExamReports] review-user-exam failed', err);
        this.userReviewLoading = false;
        this.userReviewAttempts = [];
        if(err && err.status === 0){
          const snack = this._snack.open('Network or server unreachable — check backend and network.', 'Retry', { duration: 8000 });
          snack.onAction().subscribe(() => {
            // retry once
            this.fetchUserReview(params);
          });
        } else {
          const msg = (err && err.error && err.error.statusMessage) ? err.error.statusMessage : (err && err.message) ? err.message : 'Failed to load review data.';
          this._snack.open(msg, 'Close', { duration: 5000 });
        }
        this.showUserReviewPanel = false;
        this.loading.hide();
      }
    });
  }

  closeUserReview(){ 
    this.showUserReviewPanel = false; 
    this.userReviewAttempts = []; 
    this.selectedUserName = null; this.selectedUserScore = null; this.selectedUserResult = null; this.totalQuestions = null; this.totalMarks = null;
  }

  // Marks editing helpers for descriptive questions
  startEditMarks(q: any){
    if(!q) return;
    q._editingMarks = true;
    q._editedMarks = q.marks_awarded ?? 0;
  }

  cancelEditMarks(q: any){
    if(!q) return;
    q._editingMarks = false;
    q._editedMarks = undefined;
  }

  saveMarks(q: any, row?: any){
    if(!q) return;
    const newMarks = parseFloat(q._editedMarks);
    if(isNaN(newMarks) || newMarks < 0){
      this._snack.open('Please enter a valid mark value', 'Close', { duration: 3000 });
      return;
    }
    const maxMarks = q.question_marks || q.marks || 0;
    if(newMarks > maxMarks){
      this._snack.open(`Marks cannot exceed ${maxMarks}`, 'Close', { duration: 3000 });
      return;
    }

    // Get required IDs
    const answerID = q.answer_id || null;
    
    // Get user ID from current context
    const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
    let updatedBy = '';
    if (raw) {
      const u = JSON.parse(raw);
      updatedBy = u.user_id || u.id || u.userId || u._id || '';
    }

    if(!answerID){
      console.warn('[saveMarks] Missing answer ID:', { answerID });
      this._snack.open('Missing answer ID', 'Close', { duration: 3000 });
      return;
    }

    const payload = {
      answer_id: String(answerID),
      marks_awarded: newMarks,
      updated_by: updatedBy
    };

    this.loading.show();
    this.http.post<any>(`${API_BASE}/update-descriptive-marks`, payload).subscribe({
      next: (res) => {
        this.loading.hide();
        // Update local state
        const oldMarks = q.marks_awarded || 0;
        q.marks_awarded = newMarks;
        q._editingMarks = false;
        q._editedMarks = undefined;
        
        // Update total score if available
        if(this.selectedUserScore !== null && typeof this.selectedUserScore === 'number'){
          this.selectedUserScore = this.selectedUserScore - oldMarks + newMarks;
        }
        
        this._snack.open('Marks updated successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.loading.hide();
        console.error('Failed to update marks', err);
        const msg = err?.error?.statusMessage || err?.message || 'Failed to update marks.';
        this._snack.open(msg, 'Close', { duration: 5000 });
      }
    });
  }

  // Begin review comment editing helpers
  startEditComment(rc: any){
    if(!rc) return;
    // mark this comment as being edited and store original text
    rc._editing = true;
    rc._editedText = rc.comment_text || rc.comment || '';
    this.commentEdit = true;
  }

  cancelEditComment(rc: any){
    if(!rc) return;
    rc._editing = false;
    rc._editedText = undefined;
    // if no other comment is being edited, clear global flag
    this.commentEdit = !!this.userReviewAttempts?.some((att:any) => (att.review || []).some((q:any) => (q.review_comment?.comments || []).some((c:any)=>c._editing)));
  }

  saveReviewComment(rc: any){
    if(!rc) return;
    const newText = (rc._editedText || '').toString().trim();
    if(newText.length === 0){ this._snack.open('Comment cannot be empty', 'Close', { duration: 3000 }); return; }
    this.updateReviewComment('edit', rc, newText);
  }

  confirmDeleteComment(rc: any){
    if(!rc) return;
    this.confirm.confirm({ title: 'Delete comment', message: 'Are you sure you want to delete this review comment?' }).subscribe(confirmed => {
      if(confirmed) this.updateReviewComment('delete', rc, rc._editedText || rc.comment_text || rc.comment || '');
    });
  }

  private updateReviewComment(action: 'edit' | 'delete', rc: any, text: string){
    if(!rc) return;
    const commentId = rc.comment_id || rc.id || rc._id || rc.commentId || rc.cid || null;
    if(!commentId) { this._snack.open('Comment id not found', 'Close', { duration: 3000 }); return; }
    const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
    // history_id required for delete action
    const historyId = rc.history_id || rc.hid || rc._hid || null;
    if (raw) {
      const u = JSON.parse(raw);
      this.updatedBy = u.user_id || u.id || u.userId || u._id || '';
    }
    const payload: any = { comment_id: String(commentId), history_id: String(historyId),  text: text || '', updated_by: this.updatedBy };
    this.loading.show();
    this.http.post<any>(`${API_BASE}/update-review-comments/${action}`, payload).subscribe({
      next: (res)=>{
        this.loading.hide();
        // apply changes locally
        if(action === 'edit'){
          rc.comment_text = text;
          rc.updated_by = this.updatedBy;
          rc._editing = false;
          rc._editedText = undefined;
          this._snack.open('Comment updated', 'Close', { duration: 3000 });
        } else if(action === 'delete'){
          rc.is_deleted = 1;
          rc.updated_by = this.updatedBy;
          this._snack.open('Comment deleted', 'Close', { duration: 3000 });
        }
        // clear global edit flag if no edits remain
        this.commentEdit = !!this.userReviewAttempts?.some((att:any) => (att.review || []).some((q:any) => (q.review_comment?.comments || []).some((c:any)=>c._editing)));
      },
      error: (err)=>{
        this.loading.hide();
        console.error('Failed to update review comment', err);
        const msg = (err && err.error && err.error.statusMessage) ? err.error.statusMessage : (err && err.message) ? err.message : 'Failed to update comment.';
        this._snack.open(msg, 'Close', { duration: 5000 });
      }
    });
  }

  onApply(payload: any) {
    this.appliedFilters = payload;
    this.reportsApplied = true;
  }

  onReset() {
    this.appliedFilters = null;
    this.reportsApplied = false;
    this.categoryAnalytics = [];
    this.questionSummary = [];
    this.wrongDistribution = [];
  }

  // Reset filters to empty and reload scheduled exams, then close overlay.
  resetFiltersAndReload() {
    this.resetFilters = { department_id: '', teams_id: '', country_id: '', city_id: '', campus_id: '' };
    try { this.loadScheduledExam(); } catch (e) {}
    try { this.closeFiltersOverlay(); } catch (e) {}
  }

  displayExam(exam: any) { return exam ? (exam.title || exam.name || '') : ''; }
  onExamAutocompleteSelected(exam: any) { 
    this.selectedExam = exam; 
    // auto-load report for the currently active main tab
    if(this.activeMainTabIndex === 0){
      this.loadUserReport(1);
    } else if(this.activeMainTabIndex === 1){
      this.loadAnalytics();
    }
  }
  closeUserFilter() { this.userFilterOpen = false; }

  private loadInstitutes(){
    const url = `${API_BASE}/institutes/list`;
    this.http.get<any>(url).subscribe({
      next: (res)=>{
        const list = Array.isArray(res) ? res : (res?.institutes || res?.data || []);
        this.institutes = (list || []).map((i:any)=>({ id: String(i.id || i.institute_id || i._id || ''), name: i.name || i.institute || 'Institute' }));
        // setup filtered institutes observable
        try{
          this.filteredInstitutes$ = this.instituteCtrl.valueChanges.pipe(
            startWith(''),
            map((val:any) => {
              const q = (typeof val === 'string' ? val : (val?.name || '')).toLowerCase();
              return (this.institutes || []).filter((it:any) => (it.name || '').toLowerCase().includes(q));
            })
          );
        }catch(e){
          this.filteredInstitutes$ = of(this.institutes || []);
        }
        const loginInst = sessionStorage.getItem('institute_id') || sessionStorage.getItem('instituteId');
        if(loginInst) this.selectedInstituteId = String(loginInst);
        else if(this.institutes.length) this.selectedInstituteId = this.institutes[0].id;
        // set instituteCtrl display value
        const selected = this.institutes.find(i=>i.id === this.selectedInstituteId);
        if(selected){ try{ this.instituteCtrl.setValue(selected as any); this.onInstituteChange(this.selectedInstituteId); }catch(e){} }
      },
      error: (err)=> console.warn('Failed to load institutes', err)
    });
  }

  onInstituteSelected(inst: any){
    if(!inst) return;
    this.selectedInstituteId = inst.id;
    // populate dependent filter lists then load exams
    try{ this.loadDepartmentList(this.selectedInstituteId); }catch(e){}
    try{ this.loadTeamsList(this.selectedInstituteId); }catch(e){}
    try{ this.loadCampusList(this.selectedInstituteId); }catch(e){}
    try{ this.loadCountries(); }catch(e){}
    this.loadScheduledExam();
  }

  displayInstitute(i: any){ return i ? i.name : ''; }
  onInstituteChange(id: string|null){
    this.selectedInstituteId = id;
    try{ this.loadDepartmentList(this.selectedInstituteId); }catch(e){}
    try{ this.loadTeamsList(this.selectedInstituteId); }catch(e){}
    try{ this.loadCampusList(this.selectedInstituteId); }catch(e){}
    try{ this.loadCountries(); }catch(e){}
    this.loadScheduledExam();
  }

  loadCountries() {
    // reuse location-hierarchy endpoint used elsewhere
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url).subscribe({ next: (res) => { try { const countries = res?.data?.countries || res?.countries || res?.data || []; this.countries = countries.map((c: any) => ({ code: c.country_code || c.code || c.id, name: c.country_name || c.name || c.country })); } catch (e) { this.countries = []; } }, error: () => { this.countries = []; } });
  }

  onCountryChange() {
    this.cities = [];
    if (!this.userFilters.country_id) return;
    const url = `${API_BASE}/location-hierarchy`;
    this.http.get<any>(url, { params: { country: this.userFilters.country_id } }).subscribe({
      next: (res) => {
        try {
          let allCities: any[] = [];
          const countries = res?.data?.countries || res?.countries || [];
          if (Array.isArray(countries)) {
            countries.forEach((c: any) => { if (Array.isArray(c.cities)) allCities = allCities.concat(c.cities); if (Array.isArray(c.states)) c.states.forEach((s: any) => { if (Array.isArray(s.cities)) allCities = allCities.concat(s.cities); }); });
          }
          if (allCities.length === 0 && (res?.data?.cities || res?.cities)) allCities = res?.data?.cities || res?.cities || [];
          this.cities = (allCities || []).map((c: any) => ({ code: c.city_code || c.code || c.id, name: c.city_name || c.name || c.city }));
        } catch (e) { this.cities = []; }
      }, error: () => { this.cities = []; }
    });
  }

  // load department list for a specific institute
  loadDepartmentList(instituteId: string | null) {
    this.departmentList = [];
    if (!instituteId) return;
    const url = `${API_BASE}/get-department-list?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        this.departmentList = arr.map((d: any) => (d.name || d.department_name || d.department || d).toString()).filter((s: any) => !!s);
      }, error: (err) => { console.warn('Failed to load department list', err); this.departmentList = []; }
    });
  }

  // load teams list for a specific institute
  loadTeamsList(instituteId: string | null) {
    this.teamList = [];
    if (!instituteId) return;
    const url = `${API_BASE}/get-teams-list?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        this.teamList = arr.map((t: any) => (t.name || t.team_name || t.team || t).toString()).filter((s: any) => !!s);
      }, error: (err) => { console.warn('Failed to load teams list', err); this.teamList = []; }
    });
  }

  // load campus list for a specific institute
  loadCampusList(instituteId: string | null) {
    this.campusList = [];
    if (!instituteId) return;
    const url = `${API_BASE}/get-campus-list?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.debug('[ExamReports] get-campus-list response for', instituteId, res);
        const arr = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        this.campusList = arr.map((c: any) => (c.name || c.campus_name || c.campus || c).toString()).filter((s: any) => !!s);
      }, error: (err) => { console.warn('Failed to load campus list', err); this.campusList = []; }
    });
  }
  loadScheduledExam() {
    // call API (use API_BASE) and populate filteredExams$
    const url = `${API_BASE}/get-exam-schedule-details`;
    this.loading.show();
    this.http.get<any>(url, { params: { institute_id: this.selectedInstituteId || '', country_id: this.userFilters.country_id || '', city_id: this.userFilters.city_id || '', campus_id: this.userFilters.campus_id || '' } }).subscribe({
      next: (res) => {
        try{ const items = Array.isArray(res) ? res : (res?.data || res?.schedules || []);
          this.allExams = items || [];
          // set up filtered observable to react to user typing
          try{
            this.filteredExams$ = this.examCtrl.valueChanges.pipe(
              startWith(''),
              map((val:any) => {
                const q = (typeof val === 'string' ? val : (val?.title || val?.name || '')).toLowerCase();
                return (this.allExams || []).filter((it:any) => (it.title || it.name || '').toLowerCase().includes(q));
              })
            );
          }catch(e){ this.filteredExams$ = of(this.allExams || []); }
        }catch(e){ this.filteredExams$ = of([]); console.warn('Failed to load schedules', e); }
        try { this.loading.hide(); } catch(e){}
      },
      error: (err) => { this.filteredExams$ = of([]); console.warn('Failed to load schedules', err); try { this.loading.hide(); } catch(e){} }
    });
  }

  ngOnInit(): void {
    try { this.pageMeta.setMeta('Exam Reports', 'Reports for scheduled exams'); } catch (e) {}
      this.loadInstitutes();
      // load countries for filter dropdowns
      try{ this.loadCountries(); }catch(e){}
  }

  // Helper to convert option index to letter (0 -> A, 1 -> B, ...)
  getOptionLetter(i: number): string {
    try { return String.fromCharCode(65 + (Number(i) || 0)); } catch (e) { return ''+i; }
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

  ngOnDestroy(): void {
    try { this._subs?.unsubscribe(); } catch(e){}
    try { this.closeFiltersOverlay(); } catch(e){}
  }

  onTabChange(event: any){
    const idx = event.index;
    // 0 => User Report, 1 => Category Report
    if(!this.selectedExam){
      // nothing selected
      return;
    }
    if(idx === 0){
      this.loadUserReport(1);
    } else if(idx === 1){
      this.loadAnalytics();
    }
  }

  loadUserReport(page: number = 1){
    if(!this.selectedExam) return;
    this.currentPage = page || 1;
    const params: any = { schedule_id: String(this.selectedExam.schedule_id || this.selectedExam.id || this.selectedExam.scheduleId || ''), page: String(this.currentPage), page_size: String(this.pageSize) };
    if(this.searchQuery) params.q = this.searchQuery;
    this.loadingUserReport = true;
    try { this.loading.show(); } catch(e){}
    this.http.get<any>(`${API_BASE}/get-exam-user-report`, { params }).subscribe({
      next: (res)=>{
        console.debug('[ExamReports] get-exam-user-report response:', res);
        try{
          const body = res || {};
          const payload = body.data || body; // support responses with { data: { items: [...] } }
          if(payload && Array.isArray(payload.items)){
            this.userReportData = payload.items;
            this.userReportTotal = Number(payload.total ?? payload.count ?? (payload.items || []).length);
          } else if(Array.isArray(payload)){
            this.userReportData = payload;
            this.userReportTotal = this.userReportData.length;
          } else {
            // fallback
            this.userReportData = [];
            this.userReportTotal = 0;
          }
        } catch(e){
          console.warn('Error parsing user report response', e);
          this.userReportData = [];
          this.userReportTotal = 0;
        } finally {
          this.loadingUserReport = false;
          try { this.loading.hide(); } catch(e){}
        }
      },
      error: (err)=>{ console.error('[ExamReports] Failed to load user report', err); this.userReportData = []; this.userReportTotal = 0; this.loadingUserReport = false; try { this.loading.hide(); } catch(e){} },
      complete: ()=>{ try { this.loading.hide(); } catch(e){} }
    });
  }

  prevPage(){ if(this.currentPage > 1) this.loadUserReport(this.currentPage - 1); }
  nextPage(){ const totalPages = Math.ceil((this.userReportTotal || 0) / this.pageSize); if(this.currentPage < totalPages) this.loadUserReport(this.currentPage + 1); }

  exportUserCSV(){
    if(!this.userReportData || !this.userReportData.length) return;
    const headers = ['Student Name','Questions Attempted','Total Marks','Correct Answers','Wrong Answers','Marks Obtained','Result'];
    const rows = this.userReportData.map((r:any)=>[r.student_name, r.questions_attempted, r.total_marks, r.correct_answers, r.wrong_answers, r.marks_obtained, r.result]);
    const csv = [headers.join(','), ...rows.map(r=>r.map((v:any)=>`"${String(v||'').replace(/"/g,'""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam_user_report_${this.selectedExam ? (this.selectedExam.schedule_id || this.selectedExam.id) : 'report'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  loadAnalytics(){
    if(!this.selectedExam) return;
    const params: any = { schedule_id: String(this.selectedExam.schedule_id || this.selectedExam.id || '') };
    try { this.loading.show(); } catch(e){}
    this.http.get<any>(`${API_BASE}/get-exam-analytics`, { params }).subscribe({
      next: (res)=>{
        console.debug('[ExamReports] get-exam-analytics response:', res);
        try{
          const body = res || {};
          const payload = body.data || body;
          this.categoryAnalytics = Array.isArray(payload.category_report) ? payload.category_report : (payload.category_report || payload.categories || []);
          this.questionSummary = Array.isArray(payload.question_summary) ? payload.question_summary : (payload.question_summary || payload.questions || []);
          this.wrongDistribution = Array.isArray(payload.wrong_answer_distribution) ? payload.wrong_answer_distribution : (payload.wrong_answer_distribution || payload.distribution || []);
          // If a category filter was requested while loading, apply it now
          if(this._pendingCategoryFilter){
            const cid = String(this._pendingCategoryFilter);
            this.filteredQuestionSummary = (this.questionSummary || []).filter((q:any) => this._getQuestionCategoryId(q) === cid);
            this._pendingCategoryFilter = null;
            // ensure UI switches to analytics -> Question Summary tab
            try{ this.activeMainTabIndex = 1; this.innerAnalyticsTabIndex = 1; }catch(e){}
          } else {
            this.filteredQuestionSummary = [];
          }
        } catch(e){
          console.error('[ExamReports] Error parsing analytics response', e);
          this.categoryAnalytics = [];
          this.questionSummary = [];
          this.wrongDistribution = [];
        } finally {
          try { this.loading.hide(); } catch(e){}
        }
      },
      error: (err)=>{ console.error('[ExamReports] Failed to load analytics', err); this.categoryAnalytics = []; this.questionSummary = []; this.wrongDistribution = []; try{ this.loading.hide(); }catch(e){} },
      complete: ()=>{ try { this.loading.hide(); } catch(e){} }
    });
  }

  // Open a small modal-like inline panel to show wrong answer summary for a question
  openWrongAnswerSummary(question: any){
    if(!question) return;
    this.selectedQuestionForWrongSummary = question;
    // Find wrong answers for the question from wrongDistribution
    // wrongDistribution may be an array of { question_id, wrong_answers: [{ answer, count, pct }] }
    const qid = question.id || question.question_id || question.sno || question.qid || null;
    let entries: any[] = [];
    try{
      if(Array.isArray(this.wrongDistribution) && this.wrongDistribution.length){
        // try multiple shapes
        // shape1: [{ question_id: '123', wrong_answers: [{ answer: 'A', count: 3, pct: '11%' }, ...] }, ...]
        const byQ = this.wrongDistribution.find((d:any) => String(d.question_id || d.qid || d.id || d.sno || '') === String(qid));
        if(byQ){
          entries = byQ.wrong_answers || byQ.wrong || byQ.answers || byQ.distribution || [];
        } else {
          // shape2: flat list of wrong answers with question ref
          entries = (this.wrongDistribution || []).filter((d:any) => String(d.question_id || d.qid || d.schedule_question_id || '') === String(qid));
        }
      }
    }catch(e){ entries = []; }

    // Normalize entries to { answer, count, pct }
    this.selectedWrongAnswers = (entries || []).map((en:any, idx:number) => {
      if(typeof en === 'string') return { answer: en, count: null, pct: null };
      return {
        id: en.id || en._id || null,
        answer: en.option_text || en.text || en.wrong_answer || en.name || en.label || en.option || ('Answer ' + (idx+1)),
        option_id: en.option_id || en.options_id || en.optionId || en.optionId || null,
        answer_id: en.answer_id || en.answerId || null,
        count: en.count || en.times || en.selected_count || en.selected || en.num || null,
        pct: en.pct || en.percentage || en.percent || en.pct_str || (en.count && this.selectedQuestionForWrongSummary && this.selectedQuestionForWrongSummary.attempts ? ((Number(en.count)/Number(this.selectedQuestionForWrongSummary.attempts||1))*100).toFixed(0) + '%' : null)
      };
    });

    // If no entries found locally, attempt to fetch per-question distribution from backend
    if(!this.selectedWrongAnswers.length){
      const params: any = { schedule_id: String(this.selectedExam?.schedule_id || this.selectedExam?.id || ''), question_id: String(question.question_id || question.id || question.qid || '') };
      if(params.schedule_id && params.question_id){
        this.http.get<any>(`${API_BASE}/get-question-wrong-answers`, { params }).subscribe({
          next: (res)=>{
            const body = res || {};
            const payload = body.data || body;
            const dist = payload?.distribution || [];
            this.selectedWrongAnswers = (dist || []).map((d:any)=>({ answer: d.option_text || d.option || d.answer || d.text || 'Answer', option_id: d.option_id || d.options_id || d.optionId || null, answer_id: d.answer_id || d.answerId || null, count: d.count || d.selected_count || 0, pct: (d.percentage !== undefined ? (String(d.percentage) + '%') : (d.pct || null)) }));
            if(!this.selectedWrongAnswers.length){
              // fallback to raw list
              const raw = payload?.raw || [];
              this.selectedWrongAnswers = (raw || []).map((r:any)=>({ answer: r.text || r.option_text || 'Answer', count: r.count || 0, pct: null }));
            }
            this.showWrongAnswerSummary = true;
          },
          error: (err)=>{
            console.warn('Failed to load question wrong answers', err);
            this.showWrongAnswerSummary = true; // show panel even if empty
          }
        });
        return;
      }

      const possible = question.wrong_answers || question.wrong || question.mistakes_detail || question.mistakes || question.wrong_distribution;
      if(possible && Array.isArray(possible)){
        this.selectedWrongAnswers = possible.map((en:any, i:number)=>({ answer: en.answer || en.text || en || ('Answer '+(i+1)), count: en.count || en.times || null, pct: en.pct || null }));
      }
    }

    this.showWrongAnswerSummary = true;
  }

  closeWrongAnswerSummary(){ this.showWrongAnswerSummary = false; this.selectedQuestionForWrongSummary = null; this.selectedWrongAnswers = []; }

  // Fetch resources for a specific wrong answer (option) and show central panel
  openResourcesForWrongAnswer(question: any, wa: any){
    if(!question || !wa) return;
    this.selectedResourceContext = { question, wa };
    this.selectedResources = [];

    // build params including schedule and answer identifiers
    const params: any = { schedule_id: String(this.selectedExam?.schedule_id || this.selectedExam?.id || '') };
    if(wa.option_id) params.option_id = wa.option_id;
    else if(wa.optionId) params.option_id = wa.optionId;
    if(wa.answer_id) params.answer_id = wa.answer_id;
    else if(wa.answerId) params.answer_id = wa.answerId;
    // if written/free-text answer value is present, send it as answer_value
    if(wa.answer && typeof wa.answer === 'string' && !params.answer_id){ params.answer_value = wa.answer; }
    // ensure question_id fallback
    if(!params.question_id) params.question_id = String(question.question_id || question.id || question.qid || '');

    this.http.get<any>(`${API_BASE}/get-answer-resources`, { params }).subscribe({
      next: (res)=>{
        const body = res || {};
        const payload = body.data || body;
        // backend returns either an array or an object with data/context
        if(Array.isArray(payload)) this.selectedResources = payload;
        else if(Array.isArray(body.data)) this.selectedResources = body.data;
        else if(Array.isArray(payload.resources)) this.selectedResources = payload.resources;
        else if(Array.isArray(body.data?.data)) this.selectedResources = body.data.data;
        else this.selectedResources = payload || [];
        // optional context
        if(body.context) this.selectedResourceContext = body.context;
        this.showResourcePanel = true;
      },
      error: (err)=>{ console.warn('Failed to fetch resources', err); this.showResourcePanel = true; }
    });
  }

  closeResourcePanel(){ this.showResourcePanel = false; this.selectedResources = []; this.selectedResourceContext = null; }

  // Format a date like 'On DD-MMM-YYYY HH:MM'
  formatDate(dateLike: any): string {
    if(!dateLike) return '';
    try{
      const d = new Date(dateLike);
      if(isNaN(d.getTime())) return '';
      const dd = String(d.getDate()).padStart(2,'0');
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const m = months[d.getMonth()] || '';
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2,'0');
      const min = String(d.getMinutes()).padStart(2,'0');
      return `On ${dd}-${m}-${yyyy} ${hh}:${min}`;
    }catch(e){ return ''; }
  }

  // Convert string to Title Case
  toTitleCase(str: string | null | undefined): string {
    if (!str) return '';
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}