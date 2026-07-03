import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { API_BASE } from 'src/app/shared/api.config';
import { notify } from 'src/app/shared/global-notify';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-admin-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatRadioModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatExpansionModule, HttpClientModule, RouterModule, MatIconModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, MatButtonToggleModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class AdminQuestionsComponent {
  // implement AfterViewInit to trigger initial resize
  // UI mode: whether currently editing an existing question batch
  isEditing = false;
  plaintextEditor: boolean = false;
  editId: string | number | undefined;
  pendingDeletedQuestionId: string | number | undefined;
  questionTypes = [
    { value: 'choose', label: 'Single choice' },
    { value: 'multi', label: 'Multiple choice' },
    { value: 'fill', label: 'Fill in the blank' },
    { value: 'descriptive', label: 'Descriptive' }
  ];

  // allow multiple question blocks; institute and exam are global for the batch
  questions: Array<any> = [{
    type: '',
    text: '',
    marks: 1,
    options: ['',''],
    correct: null as number | null | number[],
    answerText: '',
    _expanded: true,
    showFineTune: false
  }];

  // UI mode: 'manual' (default) or 'bulk'
  mode: 'manual' | 'bulk' = 'manual';

  // explicit manual mode boolean (binds to checkbox)
  manualMode: boolean = true;
  // active mode for toggle group (manual|bulk|ai)
  activeMode: string = 'manual';

  // AI mode controls (template bindings added)
  aiMode: boolean = false;
  aiQuestionType: string = '';
  aiQuestionNumber: number = 5;
  aiMarksPerQuestion: number = 5;
  aiQuestionComplexity: string = '';
  // optional AI UI fields used by template
  aiQuestionLanguage: string = '';
  languages: Array<{ value: string; label: string }> = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'es', label: 'Spanish' },
    { value: 'ta', label: 'Tamil' },
    { value: 'hi', label: 'Hindi' }
  ];
  complexityLevels = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];
  aiIndustry: string = '';
  aiUserRole: string = '';
  aiTargetUsers: string = '';
  selectedSourceFile: File | null = null;
  sourceText: string = '';
  aiPrompt: string = '';
  // live preview / generated content
  generatedQuestions: Array<any> = [];
  showPreview: boolean = true;

  // convenience boolean binding for a compact checkbox UI in the template
  get bulkMode(): boolean { return this.mode === 'bulk'; }
  set bulkMode(v: boolean) { this.mode = v ? 'bulk' : 'manual'; }

  onManualModeToggle(){
    // when manualMode checkbox changes, ensure bulkMode is false and mode sync
    try{ this.mode = this.manualMode ? 'manual' : 'bulk'; }catch(e){}
  }

  onModeChange(val: string){
    try{
      this.activeMode = val;
      this.mode = (val === 'bulk') ? 'bulk' : 'manual';
      this.aiMode = (val === 'ai');
      this.manualMode = (val === 'manual');
    }catch(e){}
  }

  // bulk upload state
  selectedBulkFile: File | null = null;
  // visual state for drag-over highlight
  dragActive = false;
  private bulkUploadUrl = `${API_BASE}/upload-questions`;

  // convenience getters targeting the first question for legacy bindings if needed
  get model(){ return this.questions[0]; }

  institutes: Array<{ name: string; institute_id?: string }> = [];
  isSuperAdmin: boolean = false;
  categories: Array<{ name: string; category_id?: string; description?: string; type?: string }> = [];
  // reactive control + filtered observable for autocomplete
  categoryCtrl: FormControl = new FormControl('');
  filteredCategories$?: Observable<Array<{ name: string; category_id?: string; description?: string; type?: string }>>;
  // currently selected category object (for showing description)
  selectedCategory: { name?: string; category_id?: string; description?: string; type?: string } | null = null;
  exams: Array<{ title: string; exam_id?: string }> = [];

  private apiUrl = `${API_BASE}/add-question`;
  // updated endpoints per request
  private institutesUrl = `${API_BASE}/get-institute-list`;
  private examsUrl = `${API_BASE}/get-exams-list`;
  private categoriesUrl = `${API_BASE}/get-categories-list`;
  constructor(private http: HttpClient,private pageMeta: PageMetaService, private loader: LoaderService, private router: Router) {
    // infer super-admin role and default institute from session data when available
    try {
      const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      if (raw) {
        const u = JSON.parse(raw);
        this.isSuperAdmin = !!(u && (u.is_super_admin === true || u.isSuperAdmin || u.role === 'super_admin' || u.user_role === 'super_admin'));
        const instId = u?.institute_id || u?.instituteId || u?.institute || '';
        if (instId) {
          // prefill the first question's institute selection so the template select shows the user's institute
          try { this.questions[0].institute_id = String(instId); } catch(e){}
        }
      }
    } catch (e) { /* ignore */ }

    // call to populate institutes dropdown; loadCategories will be triggered after institutes load if an institute is prefilled
    this.loadInstitutes();
  }

  goBackToQuestions(): void {
    this.router.navigate(['/view-questions']);
  }

  ngOnInit(): void {
    this.pageMeta.setMeta(this.isEditing ? 'Edit question':'Add question', this.isEditing ? 'Edit and update the question' : 'Add a new question to question bank ');
    // if arrived here from the questions list edit flow, prefill the form
    try {
      const raw = sessionStorage.getItem('edit_question');
      if (raw) {
        const q = JSON.parse(raw);
        // normalize options to array of strings
        const opts: string[] = [];
        if (Array.isArray(q.options)) {
          for (const o of q.options) {
            if (typeof o === 'string') opts.push(o);
            else if (o && (o.text || o.option || o.value || o.label)) opts.push(o.text || o.option || o.value || o.label);
            else opts.push(String(o));
          }
        }

        // determine correct index/indices
        let correct: number | number[] | null = null;
        if (q.correct !== undefined && q.correct !== null) {
          if (Array.isArray(q.correct)) correct = q.correct;
          else if (typeof q.correct === 'number') correct = q.correct;
        } else if (Array.isArray(q.options) && q.options.length && typeof q.options[0] === 'object') {
          // options may have is_correct flags
          const correctIdxs: number[] = [];
          for (let i = 0; i < q.options.length; i++) {
            const o = q.options[i];
            if (o && (o.is_correct === 1 || o.is_correct === true || o.is_correct === '1' || o.is_correct === 'true')) {
              correctIdxs.push(i);
            }
          }
          if (correctIdxs.length === 1) correct = correctIdxs[0];
          else if (correctIdxs.length > 1) correct = correctIdxs;
        }

        const questionType = q.type || q.originalType || q.question_type || '';
        let optionAnswer = '';
        const normalizedQuestionType = String(questionType).toLowerCase();
        if ((normalizedQuestionType === 'fill' || normalizedQuestionType === 'descriptive') && Array.isArray(q.options)) {
          const answerOption = q.options.find((o: any) => o && typeof o === 'object' && (o.is_correct === 1 || o.is_correct === true || o.is_correct === '1' || o.is_correct === 'true')) || q.options[0];
          if (typeof answerOption === 'string') optionAnswer = answerOption;
          else if (answerOption && typeof answerOption === 'object') optionAnswer = answerOption.text || answerOption.option_text || answerOption.option || answerOption.value || answerOption.label || '';
        }

        const first: any = {
          type: questionType,
          text: q.question || q.text || q.title || '',
          marks: q.marks || q.points || 1,
          options: opts.length ? opts : ['',''],
          correct: correct,
          answerText: q.answer || q.answerText || optionAnswer || (typeof q.correct === 'string' ? q.correct : ''),
          // copy global selections if provided
          institute_id: q.institute_id || q.instituteId || q.instituteID || (q.institute && (q.institute.institute_id || q.institute.id || q.institute._id)) || '',
          exam_id: q.exam_id || q.examId || q.examID || (q.exam && (q.exam.exam_id || q.exam.id || q.exam._id)) || '',
          category_id: q.category_id || q.categoryId || q.categoryID || (q.category && (q.category.category_id || q.category.id || q.category._id)) || '',
          // keep original id for reference if backend uses it
          id: q.id || q.question_id || q._id || undefined
        };

        // replace the first question block with the prefilled data
        this.questions = [first];
        // mark editing mode and preserve original id
        this.isEditing = true;
        this.editId = first.id;

        // clear the storage key so repeated visits don't keep prefilling
        sessionStorage.removeItem('edit_question');
      }
    } catch (e) {
      console.warn('Failed to prefill question from edit_question', e);
    }

    // ensure at least the first panel is expanded on initial load
    try {
      if (this.questions && this.questions.length) {
        this.questions.forEach((qq, idx) => qq._expanded = (idx === 0));
      }
    } catch (e) { /* ignore */ }
    // setup filtered observable for autocomplete
    this.filteredCategories$ = (this.categoryCtrl.valueChanges as any).pipe(
      startWith(this.categoryCtrl.value),
      map((val: any) => {
        const name = val && typeof val === 'object' ? val.name : (val || '');
        const q = String(name).trim().toLowerCase();
        if (!q) return this.categories.slice();
        return this.categories.filter(c => (c.name || '').toLowerCase().indexOf(q) > -1);
      })
    );
    // ensure any programmatically set textarea content is measured after init
    setTimeout(() => { try{ this.resizeAll(); }catch(e){} }, 50);
    // if a category was prefilled, set selectedCategory and control value for description display
    try {
      const cid = this.questions && this.questions[0] && (this.questions[0].category_id || '');
      if (cid) {
        // will populate when categories are loaded
      }
    } catch(e) {}
    // Ensure languages array has unique entries to prevent duplicates in dropdown
    this.languages = this.languages.filter((lang, index, self) => self.findIndex(l => l.label === lang.label) === index);
  }

  @ViewChild('hiddenFileInput') hiddenFileInput?: ElementRef<HTMLInputElement>;
  @ViewChild('hiddenSourceFileInput') hiddenSourceFileInput?: ElementRef<HTMLInputElement>;
  @ViewChild('sourceTextArea') sourceTextArea?: ElementRef<HTMLTextAreaElement>;

  // Auto-resize textarea to fit content (used by template via (input))
  autoResize(el: HTMLTextAreaElement | any){
    try{
      if (!el) return;
      // if passed event target, ensure it's a textarea
      const ta: HTMLTextAreaElement = el as HTMLTextAreaElement;
      ta.style.height = 'auto';
      const newHeight = ta.scrollHeight;
      if (newHeight) ta.style.height = newHeight + 'px';
    }catch(e){ /* ignore */ }
  }

  // Resize all textareas currently in the component DOM (use after data is loaded)
  resizeAll(){
    try{
      // select textareas within component root
      const els = Array.from(document.querySelectorAll('textarea')) as HTMLTextAreaElement[];
      els.forEach((ta) => this.autoResize(ta));
    }catch(e){ }
  }

  ngAfterViewInit(): void {
    // ensure initial resize once the view is ready
    setTimeout(()=>{ try{ this.resizeAll(); }catch(e){} }, 50);
  }

  downloadTemplate(templateType: 'objective' | 'descriptive') {
    const headers = ['Question', 'Type', 'Correct_answer', 'marks', 'option_1', 'option_2', 'option_3', 'option_4'];
    const sample = templateType === 'objective'
      ? [
          ['What is 2+2?', 'choose', '3', '1', '2', '3', '4', '5'],
          ['Select prime numbers', 'multi', '1,2', '1', '2', '3', '4', '5'],
          ['The capital of France is ___.', 'fill', 'Paris', '1', '', '', '', '']
        ]
      : [
          ['Describe the water cycle.', 'descriptive', 'Evaporation, condensation, and precipitation move water through the environment.', '5', '', '', '', ''],
          ['Explain the importance of photosynthesis.', 'descriptive', 'Photosynthesis helps plants make food and releases oxygen.', '5', '', '', '', '']
        ];
    const rows = [headers, ...sample].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateType === 'objective' ? 'Objective' : 'Descriptive'}-questions-template.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
  
  triggerFileSelect(){
    try{ this.hiddenFileInput?.nativeElement.click(); }catch(e){ console.warn('triggerFileSelect failed', e); }
  }

  triggerSourceFileSelect(){
    try{ this.hiddenSourceFileInput?.nativeElement.click(); }catch(e){ console.warn('triggerSourceFileSelect failed', e); }
  }

  focusSourceTextArea(){
    try{
      this.plaintextEditor = true;
      // small timeout to ensure DOM focus if called from keyboard activation
      setTimeout(()=>{ this.sourceTextArea?.nativeElement.focus(); }, 30);
    }catch(e){ console.warn('focusSourceTextArea failed', e); }
  }

  onSourceFileSelected(ev: Event){
    const input = ev.target as HTMLInputElement;
    if (input && input.files && input.files.length){
      this.selectedSourceFile = input.files[0];
    } else {
      this.selectedSourceFile = null;
    }
  }

  applyGeneratedToEditor(){
    if (!this.generatedQuestions || !this.generatedQuestions.length) return;
    // Simple behaviour: insert first generated question into editor sourceText for editing
    try{ this.sourceText = (this.generatedQuestions[0].text || '') + "\n\n" + this.sourceText; }catch(e){}
    // resize textarea after programmatic content change
    setTimeout(()=>{ try{ this.resizeAll(); }catch(e){} }, 0);
  }

  insertGeneratedToQuestions(){
    if (!this.generatedQuestions || !this.generatedQuestions.length) return;
    // Insert generated items into questions array and switch to manual mode for editing
    try{
      this.questions = (this.generatedQuestions.map((g:any) => ({ type: g.type || 'descriptive', text: g.text || '', marks: g.marks || 1, options: g.options || [''], correct: null, answerText: '', _expanded: true }))).concat(this.questions || []);
      this.mode = 'manual';
      setTimeout(()=>{ try{ this.resizeAll(); }catch(e){} }, 0);
    }catch(e){}
  }

  // Generate simple placeholder questions from AI inputs (stub implementation)
  generateAIQuestions(){
    this.loader.show();
    if (!this.aiQuestionType || !this.aiQuestionNumber || this.aiQuestionNumber < 1){
      try { notify('Select a question type and set number of questions', 'error'); } catch(e){}
      return;
    }

    // Build FormData to support file upload and parameters
    const fd = new FormData();
    if (this.selectedSourceFile) fd.append('file', this.selectedSourceFile as Blob, (this.selectedSourceFile as File).name);
    const raw = sessionStorage.getItem('user')
    if (raw) {
      const u = JSON.parse(raw);
      const instId = u?.institute_id || u?.instituteId || u?.institute || '';
      if (instId) {
        fd.append('institute_id', String(instId));
      }
      const userId = u?.user_id || u?.id || u?.userId || '';
      if (userId) {
        fd.append('user_id', String(userId));
      }
    }
    // fd.append('language', this.aiQuestionLanguage || 'English');
    fd.append('language','English');
    fd.append('type', this.aiQuestionType || 'Descriptive');
    fd.append('number_of_questions', String(this.aiQuestionNumber || 1));
    fd.append('marks_per_question', String(this.aiMarksPerQuestion || 5));
    fd.append('industry', this.aiIndustry || '');
    fd.append('user_role', this.aiUserRole || '');
    fd.append('target_users', this.aiTargetUsers || '');
    fd.append('complexity', this.aiQuestionComplexity || 'medium');
    fd.append('source_text', this.sourceText || '');
    fd.append('additional_instructions', this.aiPrompt || '');
    fd.append('question_mark', String(5));

    const url = `${API_BASE}/create-question-using-ai`;
    this.http.post<any>(url, fd).subscribe({
      next: (res) => {
        try{
          if (res && res.status === true) {
            // backend returns a single question object or an array — normalize
            const arr = Array.isArray(res) ? res : (res.data ? res.data : (res.question ? [res.question] : []));
            // if response includes question_text/options etc, map to our internal shape
            const normalized = (Array.isArray(arr) ? arr : [arr]).map((r:any) => ({ type: r.type || r.question_type || 'descriptive', text: r.question_text || r.question || r.text || '', marks: r.mark || r.marks || 1, options: Array.isArray(r.options) ? r.options.slice() : (r.options && typeof r.options === 'string' ? r.options.split('|').map((s:string)=>s.trim()) : []), correct: r.correct_answer ?? r.correct ?? null, answerText: r.explanation || r.answer || '' }));
            this.generatedQuestions = normalized;
            // Also immediately load generated questions into the editable questions list so they appear in the questions-list
            try{
              this.questions = normalized.map((g:any) => {
                const qtype = (g.type || 'descriptive');
                const opts = Array.isArray(g.options) ? g.options.map((o:any)=> typeof o === 'string' ? o : (o.option_text || o.text || String(o))) : [];
                // ensure at least two option placeholders for choice types
                if ((qtype === 'choose' || qtype === 'multi') && opts.length < 2) { while(opts.length < 2) opts.push(''); }
                // determine correct indices/value mapping
                let correct: number | number[] | null = null;
                const ca = g.correct;
                if (qtype === 'choose'){
                  if (typeof ca === 'number') correct = ca;
                  else if (typeof ca === 'string') {
                    const idx = opts.findIndex((o:any) => String(o).trim().toLowerCase() === String(ca).trim().toLowerCase());
                    if (idx >= 0) correct = idx; else correct = null;
                  }
                } else if (qtype === 'multi'){
                  if (Array.isArray(ca)){
                    // may be indices or values
                    if (ca.length && typeof ca[0] === 'number') correct = ca;
                    else {
                      const idxs:number[] = [];
                      ca.forEach((val:any)=>{ const idx = opts.findIndex((o:any)=>String(o).trim().toLowerCase() === String(val).trim().toLowerCase()); if(idx>=0) idxs.push(idx); });
                      correct = idxs;
                    }
                  } else if (typeof ca === 'string'){
                    // comma separated values
                    const parts = ca.split(',').map((s:string)=>s.trim()).filter(Boolean);
                    const idxs:number[] = [];
                    parts.forEach(p=>{ const idx = opts.findIndex((o:any)=>String(o).trim().toLowerCase()===String(p).trim().toLowerCase()); if(idx>=0) idxs.push(idx); });
                    correct = idxs;
                  }
                } else if (qtype === 'fill' || qtype === 'descriptive'){
                  // put answer in answerText
                }

                return { type: qtype, text: g.text || '', marks: g.marks || 1, options: opts.length ? opts : ['',''], correct: correct, answerText: (qtype==='fill' || qtype==='descriptive') ? (g.correct && typeof g.correct === 'string' ? g.correct : (g.answerText || '')) : (g.answerText || ''), _expanded: true };
              });
              this.mode = 'manual';
              // this.aiMode = false;
              this.activeMode = 'manual';
                // ensure new question textareas resize to fit generated content
                setTimeout(()=>{ try{ this.resizeAll(); }catch(e){} }, 0);
            }catch(e){ console.warn('Failed to apply generated questions to editor', e); }

            this.showPreview = true;
            notify('AI generated questions received', 'success');
          } else {
            notify(res?.statusMessage || res?.message || 'Failed to generate questions', 'error');
          }
        }catch(e){ console.error('Failed to process AI response', e); notify('Failed to generate questions', 'error'); }
        this.loader.hide();
      },
      complete: () => { this.loader.hide(); },
      error: (err) => { console.error('AI generation failed', err); try { notify(err?.error?.statusMessage || err?.error?.message || 'AI generation failed', 'error'); } catch(e){} this.loader.hide(); }
    });
  }

  addQuestion() {
    // collapse other panels and expand newly added one
    if (this.questions && this.questions.length) this.questions.forEach(q => q._expanded = false);
    this.questions.push({ type: '', text: '', marks: 1, options: ['',''], correct: null, answerText: '', _expanded: true, showFineTune: false });
  }

  removeQuestion(index: number) {
    const q = this.questions && this.questions[index];
    if (!q) return;
    if (this.isEditing) {
      this.pendingDeletedQuestionId = q.id || q.question_id || q._id || this.editId;
      this.questions.splice(index, 1);
      return;
    }
    if (this.questions.length <= 1) return; // keep at least one while adding new questions
    this.questions.splice(index, 1);
  }

  resetAll(){
    // clear institute/exam selection stored on first block and reset to single empty block
    if (this.questions && this.questions.length) {
      this.questions[0].institute_id = '';
      this.questions[0].exam_id = '';
    }
    this.questions = [{ type: '', text: '', marks: 1, options: ['',''], correct: null, answerText: '', showFineTune: false }];
    setTimeout(()=>{ try{ this.resizeAll(); }catch(e){} },0);
  }

  onBulkFileSelected(ev: Event){
    const input = ev.target as HTMLInputElement;
    if (input && input.files && input.files.length){
      this.selectedBulkFile = input.files[0];
    } else {
      this.selectedBulkFile = null;
    }
  }

  clearSelectedBulkFile(){
    this.selectedBulkFile = null;
    try{ if (this.hiddenFileInput && this.hiddenFileInput.nativeElement) { this.hiddenFileInput.nativeElement.value = ''; } }catch(e){}
  }
  // improved drag handling to allow visual feedback
  onDragOver(ev: DragEvent, markActive = true){ ev.preventDefault(); ev.stopPropagation(); if (markActive) this.dragActive = true; }
  onDragLeave(ev: DragEvent){ ev.preventDefault(); ev.stopPropagation(); this.dragActive = false; }
  onDrop(ev: DragEvent){
    ev.preventDefault(); ev.stopPropagation(); this.dragActive = false;
    const files = ev.dataTransfer && ev.dataTransfer.files;
    if (files && files.length){
      this.selectedBulkFile = files[0];
    }
  }

  loadInstitutes(){
    this.loader.show();
    this.http.get<any>(this.institutesUrl).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        this.institutes = arr.map((r:any) => ({ name: r.name || r.institute_name || r.short_name || '', institute_id: r.institute_id || r.id }));
        // If an institute was prefilled (from session), ensure categories load for it
        try{ const pre = this.questions && this.questions[0] && (this.questions[0].institute_id || ''); if(pre) this.loadCategories(pre); }catch(e){}
      },
      complete: () => { this.loader.hide(); },
      error: (err) => { this.loader.hide();
        console.warn('Failed to load institutes', err);
      }
    });
  }
  onQuestionInstituteChange(instId?: string) {
    try {
      if (this.questions && this.questions[0]) this.questions[0].institute_id = instId || '';
      if (this.questions && this.questions[0]) this.questions[0].category_id = '';
      this.selectedCategory = null;
      this.categoryCtrl.setValue('');
      this.categories = [];
      this.clearQuestionTypes();
    } catch(e) {}
    this.loadCategories(instId);
  }

  loadCategories(instId?: string, showLoader: boolean = true){
    if (showLoader) this.loader.show();
    if (!instId) {
      this.categories = [];
      this.selectedCategory = null;
      try { if (this.questions && this.questions[0]) this.questions[0].category_id = ''; } catch(e) {}
      try { this.categoryCtrl.setValue(''); } catch(e) {}
      if (showLoader) this.loader.hide();
      return;
    }
    let url = this.categoriesUrl;
    if (instId) url += `?institute_id=${encodeURIComponent(instId)}&_ts=${Date.now()}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        this.categories = arr.map((r:any) => ({
          name: r.name || r.category_name || '',
          category_id: r.category_id || r.id,
          description: r.description || r.desc || '',
          type: r.type || r.category_type || ''
        }));
        // if a category was prefilled on the first question, set control to that object so autocomplete shows it
        try {
          const cid = this.questions && this.questions[0] && (this.questions[0].category_id || '');
          if (cid) {
            const found = this.categories.find(c => String(c.category_id) === String(cid));
            if (found) {
              this.selectedCategory = found as any;
              try { this.categoryCtrl.setValue(found); } catch(e) {}
              this.enforceQuestionTypeForSelectedCategory();
            }
          }
        } catch(e) {}
      },
      complete: () => { if (showLoader) this.loader.hide(); },
      error: (err) => { if (showLoader) this.loader.hide();
        console.warn('Failed to load categories', err);
      }
    });
  }

  refreshCategoriesOnCategoryOpen(opened: boolean) {
    if (!opened) return;
    const instId = this.questions && this.questions[0] && this.questions[0].institute_id;
    if (!instId) return;
    this.loadCategories(instId, false);
  }
  onCategoryAutocompleteSelected(cat: any){
    if (!cat) { this.selectedCategory = null; this.questions[0].category_id = ''; return; }
    this.selectedCategory = cat;
    try { this.questions[0].category_id = cat.category_id; } catch(e) {}
    this.enforceQuestionTypeForSelectedCategory();
  }

  displayCategory(cat: any){ return cat && cat.name ? cat.name : ''; }

  onCategorySelected(categoryId: string) {
    const found = (this.categories || []).find(c => String(c.category_id) === String(categoryId));
    this.selectedCategory = found || null;
    try { this.questions[0].category_id = found?.category_id || ''; } catch(e) {}
    try { this.categoryCtrl.setValue(found || ''); } catch(e) {}
    this.enforceQuestionTypeForSelectedCategory();
  }

  get filteredQuestionTypes() {
    const type = this.normalizeCategoryType(this.selectedCategory?.type);
    if (type === 'descriptive') return this.questionTypes.filter(t => t.value === 'descriptive');
    if (type === 'objective') return this.questionTypes.filter(t => t.value !== 'descriptive');
    return this.questionTypes;
  }

  private normalizeCategoryType(type: any): string {
    const normalized = String(type || '').trim().toLowerCase();
    if (normalized === 'descriptive') return 'descriptive';
    if (normalized === 'objective') return 'objective';
    return normalized;
  }

  private enforceQuestionTypeForSelectedCategory() {
    const allowed = new Set(this.filteredQuestionTypes.map(t => t.value));
    try {
      if (this.aiQuestionType && !allowed.has(this.aiQuestionType)) this.aiQuestionType = '';
      (this.questions || []).forEach((q: any) => {
        if (q?.type && !allowed.has(q.type)) q.type = '';
      });
    } catch(e) {}
  }

  private clearQuestionTypes() {
    try {
      this.aiQuestionType = '';
      (this.questions || []).forEach((q: any) => q.type = '');
    } catch(e) {}
  }

  getQuestionTypeLabel(value: string | undefined | null){
    try{
      if (!value) return '—';
      const found = (this.questionTypes || []).find(t => t.value === value);
      return (found && found.label) ? found.label : (value || '—');
    }catch(e){ return value || '—'; }
  }

  getComplexityLabel(value: string | undefined | null){
    try{
      if (!value) return '';
      const found = (this.complexityLevels || []).find(c => c.value === value);
      return (found && found.label) ? found.label : (value || '');
    }catch(e){ return value || ''; }
  }

  openFineTuningDialog(index: number){
    try{
      const q = this.questions && this.questions[index];
      if (!q) return;
      q.showFineTune = !q.showFineTune;
    }catch(e){ /* ignore */ }
  }

  countWords(text: string | null | undefined){
    if (!text) return 0;
    return String(text).trim().split(/\s+/).filter(Boolean).length;
  }

  loadExams(instituteId: string){
    this.loader.show();
    if(!instituteId){ this.exams = []; return; }
    const url = `${this.examsUrl}?institute_id=${encodeURIComponent(instituteId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        const arr = Array.isArray(res) ? res : (res && Array.isArray(res.data) ? res.data : []);
        this.exams = arr.map((e:any) => ({ title: e.title || e.name || '', exam_id: e.exam_id || e.id || e.examId }));
      },
      complete: () => { this.loader.hide(); },
      error: (err) => {
        this.loader.hide();
        console.warn('Failed to load exams', err);
        this.exams = [];
      }
    });
  }

  addOption(qIndex: number){
    this.questions[qIndex].options.push('');
  }

  // trackBy function to keep option input DOM stable when option values change
  trackByIndex(index: number, item: any) { return index; }

  removeOption(qIndex:number, i:number){
    const q = this.questions[qIndex];
    if (!q || !Array.isArray(q.options) || i < 0 || i >= q.options.length) return;
    q.options.splice(i,1);
    // Keep selected correct indexes aligned with the remaining option rows.
    if (q.type === 'choose') {
      if (q.correct === i) q.correct = null;
      else if (typeof q.correct === 'number' && q.correct > i) q.correct = q.correct - 1;
    }
    if (q.type === 'multi' && Array.isArray(q.correct)){
      q.correct = q.correct
        .filter((idx: number) => idx !== i)
        .map((idx: number) => idx > i ? idx - 1 : idx);
    }
  }

  onPanelOpened(q: any, index: number) {
    // mark opened, collapse others
    try {
      this.questions.forEach((qq, idx) => qq._expanded = (idx === index));
    } catch (e) {}
  }

  onPanelClosed(q: any, index: number) {
    // mark closed; keep at least one expanded (if all closed, re-open first)
    try {
      q._expanded = false;
      const anyOpen = this.questions.some((qq:any) => qq._expanded);
      if (!anyOpen && this.questions.length) this.questions[0]._expanded = true;
    } catch (e) {}
  }

  setSingleCorrect(qIndex:number, i:number){
    this.questions[qIndex].correct = i;
  }

  toggleMultiCorrect(qIndex:number, i:number, checked: boolean){
    const q = this.questions[qIndex];
    if (!Array.isArray(q.correct)) q.correct = [];
    const arr: number[] = q.correct as number[];
    const idx = arr.indexOf(i);
    if (checked && idx === -1) arr.push(i);
    if (!checked && idx > -1) arr.splice(idx,1);
  }

  isOptionCorrect(qIndex:number, i:number){
    const q = this.questions[qIndex];
    if (q.type === 'choose') return q.correct === i;
    if (q.type === 'multi') return Array.isArray(q.correct) && (q.correct as number[]).indexOf(i) > -1;
    return false;
  }

  private isValidQuestion(q: any): boolean {
    return !!q && !!String(q.type || '').trim() && !!String(q.text || '').trim();
  }

  // Call backend fine-tune endpoint to improve question/answer pair
  generateModelAnswer(qIndex:number, qText:string, answerText:string, finetuneInstructions?:string){
    this.loader.show();
    try{
      const payload: any = {
        question_text: qText || '',
        answer_text: answerText || ''
      };
      if (finetuneInstructions) payload.additional_instructions = finetuneInstructions;
      // include question id if available so backend can map
      try{ const q = this.questions && this.questions[qIndex]; if (q && (q.id || q.question_id)) payload.question_id = q.id || q.question_id; }catch(e){}

      const url = `${API_BASE}/fine-tune-question`;
      this.http.post<any>(url, payload).subscribe({
        next: (res) => {
          try{
            if (res && (res.status === true || typeof res.status === 'undefined')){
              const data = res.data || res;
              // Replace question text and answer for the target block if present in response
              if (data && (data.question_text || data.answer_text)){
                const target = this.questions && this.questions[qIndex];
                if (target){
                  if (data.question_text) target.text = data.question_text;
                  if (data.answer_text) target.answerText = data.answer_text;
                }
                try{ notify('Fine-tuned question applied', 'success'); }catch(e){}
                return;
              }
            }
            notify(res?.statusMessage || res?.message || 'Fine-tune did not return improved content', 'error');
          }catch(e){ console.error('Failed to process fine-tune response', e); try{ notify('Failed to apply fine-tune', 'error'); }catch(_){} }
        },
        complete: () => { this.loader.hide(); },
        error: (err) => { console.error('Fine-tune request failed', err); try{ notify(err?.error?.message || 'Fine-tune failed', 'error'); }catch(e){} this.loader.hide(); }
      });
    }catch(e){ console.error('generateModelAnswer failed', e); try{ notify('Fine-tune request failed', 'error'); }catch(_){} }
  }

  submit(){
    this.loader.show();
    // get user_id for created_by and updated_by fields if needed
    const raw = sessionStorage.getItem('user')
    let userId = '';
    try {
      if (raw) {
        const u = JSON.parse(raw);
        userId = u?.user_id || u?.id || u?.userId || '';
      }
    } catch (e) { /* ignore */ }
    if (this.mode === 'bulk'){
      // use selected file and submit via FormData
      if (!this.selectedBulkFile){ this.loader.hide(); try { notify('Please select a file to upload', 'error'); } catch(e){}; return; }
      const fd = new FormData();
      fd.append('file', this.selectedBulkFile);
      if (this.questions[0] && this.questions[0].institute_id) fd.append('institute_id', this.questions[0].institute_id);
      if (this.questions[0] && this.questions[0].category_id) fd.append('category_id', this.questions[0].category_id);
      this.http.post<any>(this.bulkUploadUrl, fd).subscribe({
        next: (res) => {
          try {
            const msg = res?.statusMessage || res?.message || 'Bulk upload completed';
            const ok = typeof res?.status === 'undefined' ? true : !!res.status;
            notify(msg, ok ? 'success' : 'error');
          } catch(e) {}
          this.selectedBulkFile = null;
        },
        complete: () => { this.loader.hide(); },
        error: (err) => { console.error('Bulk upload failed', err); try { notify(err?.error?.statusMessage || err?.error?.message || 'Bulk upload failed', 'error'); } catch(e){} this.loader.hide(); }
      });
      return;
    }

    if (this.isEditing && this.pendingDeletedQuestionId && (!this.questions || this.questions.length === 0)) {
      const deleteId = this.pendingDeletedQuestionId;
      const url = `${API_BASE}/delete/question/${encodeURIComponent(String(deleteId))}`;
      this.http.delete<any>(url).subscribe({
        next: (res) => {
          try {
            const ok = typeof res?.status === 'undefined' ? true : !!res.status;
            const msg = ok ? 'Question deleted successfully.' : (res?.statusMessage || res?.message || 'Failed to delete question.');
            notify(msg, ok ? 'success' : 'error');
            if (ok) {
              this.pendingDeletedQuestionId = undefined;
              this.editId = undefined;
              this.isEditing = false;
            }
          } catch(e){}
        },
        error: (err) => {
          console.error('Failed to delete question', err);
          try { notify(err?.error?.statusMessage || err?.error?.message || 'Failed to delete question.', 'error'); } catch(e){}
          this.loader.hide();
        },
        complete: () => { this.loader.hide(); }
      });
      return;
    }
    const selectedInstituteId = this.questions && this.questions[0] && (this.questions[0] as any).institute_id;
    const selectedCategoryId = this.questions && this.questions[0] && (this.questions[0] as any).category_id;
    if (!this.isEditing && (!selectedInstituteId || !selectedCategoryId)) {
      this.loader.hide();
      try { notify('Please select an Institution and Category before saving.', 'error'); } catch(e){}
      return;
    }

    const validQuestions = (this.questions || []).filter((q: any) => this.isValidQuestion(q));
    if (!validQuestions.length) {
      this.loader.hide();
      try { notify('Please add at least one question before saving.', 'error'); } catch(e){}
      return;
    }

    // Submit all questions as a batch; basic validation per question
    for (let q of validQuestions){
      const optionCount = Array.isArray(q.options) ? q.options.length : 0;
      if (q.type === 'choose' && optionCount > 0 && (q.correct === null || q.correct === undefined)){
        try { notify('Please select the correct option for single choice in all question blocks', 'error'); } catch(e){}
        this.loader.hide();
        return;
      }
      if (q.type === 'multi' && optionCount > 0 && (!Array.isArray(q.correct) || (q.correct as number[]).length === 0)){
        try { notify('Please select one or more correct options for multiple choice in all question blocks', 'error'); } catch(e){}
        this.loader.hide();
        return;
      }
    }

    const payload = validQuestions.map((q:any) => {
      const p = JSON.parse(JSON.stringify(q));
      p.options = Array.isArray(q.options) ? q.options.slice() : [];
      if (q.type === 'choose' && typeof q.correct === 'number' && p.options[q.correct] !== undefined){
        p.correct_indices = [q.correct];
        p.correct_values = [p.options[q.correct]];
      } else if (q.type === 'choose') {
        p.correct_indices = [];
        p.correct_values = [];
      }
      if (q.type === 'multi' && Array.isArray(q.correct)){
        const validCorrect = q.correct.filter((i:number) => p.options[i] !== undefined);
        p.correct_indices = validCorrect;
        p.correct_values = validCorrect.map((i:number) => p.options[i]);
      } else if (q.type === 'multi') {
        p.correct_indices = [];
        p.correct_values = [];
      }
      // p.created_by = sessionStorage.getItem('user_id') || sessionStorage.getItem('username') || 'admin';
      return p;
    });

    // include institute, exam and category selection if present on the first question (global fields on the page)
    const body: any = {
      institute_id: (this.questions[0] as any).institute_id || undefined,
      exam_id: (this.questions[0] as any).exam_id || undefined,
      category_id: (this.questions[0] as any).category_id || undefined,
      created_by: userId || undefined,
      questions: payload
    };

    if (this.isEditing && this.editId) {
      // update single question
      const q = payload[0];
      // ensure hidden global selections are kept on update when available
      if (!q.institute_id && (this.questions[0] as any).institute_id) q.institute_id = (this.questions[0] as any).institute_id;
      if (!q.category_id && (this.questions[0] as any).category_id) q.category_id = (this.questions[0] as any).category_id;
      q.updated_by = userId || undefined;
      const url = `${API_BASE}/update-question/${encodeURIComponent(String(this.editId))}`;
      this.http.put<any>(url, q).subscribe({ next: (res) => {
        try {
          const msg = res?.statusMessage || res?.message || 'Question updated';
          const ok = typeof res?.status === 'undefined' ? true : !!res.status;
          notify(msg, ok ? 'success' : 'error');
        } catch(e){}
        // Keep edit mode active so the user stays on the same page after update.
      }, error: (err) => {
        console.error('Failed to update question', err);
        try { notify(err?.error?.statusMessage || err?.error?.message || 'Failed to update question', 'error'); } catch(e){}
        this.loader.hide();
      }, complete: () => { this.loader.hide(); } });
    } else {
      this.http.post<any>(this.apiUrl, body).subscribe({
        next: (res) => {
          try {
            const msg = res?.statusMessage || res?.message || 'Questions saved successfully';
            const ok = typeof res?.status === 'undefined' ? true : !!res.status;
            notify(msg, ok ? 'success' : 'error');
          } catch(e){}
          // reset to a single empty block
          this.questions = [{ type: '', text: '', marks: 1, options: ['',''], correct: null, answerText: '', showFineTune: false }];
          setTimeout(()=>{ try{ this.resizeAll(); }catch(e){} },0);
        },
        error: (err) => {
          console.error('Failed to save questions', err);
          try { notify(err?.error?.statusMessage || err?.error?.message || 'Failed to save questions. See console for details.', 'error'); } catch(e){}
          this.loader.hide();
        },
        complete: () => { this.loader.hide(); }
      });
    }
  }
}
