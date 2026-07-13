import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_BASE } from 'src/app/shared/api.config';
import { notify } from 'src/app/shared/global-notify';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { PageMetaService } from 'src/app/shared/services/page-meta.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export interface UserTestRow {
  test_id?: string;
  schedule_id?: string;
  title?: string;
  start_time?: string;
  end_time?: string;
  scheduleTest?: string;
  duration_mins?: number;
  total_questions?: number;
  total_marks?: number;
  published?: boolean;
  pass_mark?: number;
  number_of_attempts?: number;
  type?: string;
  user_review?: boolean;
  review_available?: boolean;
  attempted?: boolean;
  expired?: boolean;
}

@Component({
  selector: 'app-confirm-start-test-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class='start-confirm-dialog'>
      <div class='dialog-icon' aria-hidden='true'>
        <mat-icon>rocket_launch</mat-icon>
      </div>
      <h2>Start Test</h2>
      <p class='dialog-message'>Are you sure you want to start this test?</p>
      <p class='dialog-warning'>Once you start, the test timer will begin and cannot be paused.</p>
      <div class='dialog-actions'>
        <button mat-button class='cancel-button' [mat-dialog-close]='false'>Cancel</button>
        <button mat-flat-button class='start-button' [mat-dialog-close]='true'>Start Test</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .start-confirm-dialog {
      box-sizing: border-box;
      height: 18.4rem;
      padding: 1.35rem 1.25rem 0.9rem;
      text-align: center;
      color: #16293d;
    }
    .dialog-icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 0.8rem;
      border-radius: 50%;
      background: #f0edff;
      color: #287cff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-icon mat-icon {
      width: 2rem;
      height: 2rem;
      font-size: 2rem;
      line-height: 2rem;
    }
    h2 {
      margin: 0 0 0.45rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.25;
    }
    p { margin: 0; color: #657180; }
    .dialog-message { font-size: 1.15rem; }
    .dialog-warning {
      margin-top: 0.3rem;
      font-size: 0.95rem;
      line-height: 1.45;
    }
    .dialog-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.9rem;
      margin-top: 1rem;
    }
    .dialog-actions button {
      height: 2.85rem;
      border-radius: 0.7rem;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .cancel-button { border: 0.0625rem solid #dfe4ea; color: #354252; }
    .start-button { background: #287cff; color: #fff; }
    @media (max-width: 30rem) {
      .start-confirm-dialog { height: auto; }
      .dialog-actions { grid-template-columns: 1fr; }
    }
  `]
})
export class ConfirmStartTestDialogComponent {}

@Component({
  selector: 'app-user-exams',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTabsModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class UserExamComponent{
  exams: UserTestRow[] = [];
  loading = false;
  instituteId = '';
  // table and filters
  displayedColumns: string[] = ['title','scheduleTest','duration','questions','pass_mark','number_of_attempts','status','actions'];
  dataSource = new MatTableDataSource<UserTestRow>([]);
  // Per-tab filtered tables
  activeSource = new MatTableDataSource<UserTestRow>([]);
  completeSource = new MatTableDataSource<UserTestRow>([]);
  search = '';
  filterPublished: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  private examsUrl = `${API_BASE}/get-user-exams-details`;
  private launchUrl = `${API_BASE}/launch-exam`;

  constructor(private http: HttpClient,private pageMeta: PageMetaService, private loader: LoaderService, private router: Router, private dialog: MatDialog ){
    // try to read institute id from sessionStorage
    try{
      const raw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      if (raw){
        const obj = JSON.parse(raw);
        this.instituteId = obj?.institute_id || obj?.instituteId || obj?.institute || '';
      }
    }catch(e){}

    if (this.instituteId) this.loadExams();
  }

  // Review modal state
  reviewOpen = false;
  reviewLoading = false;
  reviewAttempts: Array<{ title?: string, attempt_number: number, items: Array<{
    question_text?: string,
    question?: string,
    correct_option?: string,
    options?: Array<{ is_correct?: number, option_text?: string }>,
    question_type?: string,
    selected_option?: string[],
    is_correct?: boolean | number,
    marks_awarded?: number,
    question_marks?: number,
    feedback?: string,
    review_comment?: { comments?: any[] }
  }>, score?: number, started_date?: string, submitted_date?: string, status?: string, percentage?: number, total_questions?: number, total_marks?: number, time_taken?: string, result?: string }> = [];
  reviewSelectedAttempt = 0;

  // Safe getter to return the currently selected attempt's title or empty string
  get selectedReviewTitle(): string {
    try {
      if (!this.reviewAttempts || !this.reviewAttempts.length) return '';
      const idx = Number(this.reviewSelectedAttempt) || 0;
      if (idx < 0 || idx >= this.reviewAttempts.length) return '';
      return this.reviewAttempts[idx]?.title || '';
    } catch (e) { return ''; }
  }

  /**
   * Fetch review details for a user's exam and open modal.
   * Expects API: GET /review-user-exam?user_id=...&scheduler_id=...
   * Response shape assumed: { data: { attempts: [ { attempt_no, items: [ { question, answer, user_answer, status } ] } ] } }
   */
  viewReview(row: UserTestRow){
    try{
      this.loader.show();
      const userRaw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
      const userId = userRaw ? (JSON.parse(userRaw)?.user_id || JSON.parse(userRaw)?.id || '') : '';
      const schedulerId = row.schedule_id || row.test_id || '';
      if(!userId || !schedulerId) { try { notify('Missing user or test identifiers for review', 'error'); } catch(e){}; return; }
      const url = `${API_BASE}/review-user-exam?user_id=${encodeURIComponent(String(userId))}&scheduler_id=${encodeURIComponent(String(schedulerId))}`;
      this.reviewLoading = true; this.reviewAttempts = []; this.reviewOpen = true; this.reviewSelectedAttempt = 0;
      this.http.get<any>(url).subscribe({ next: (res) => {
        try{
              // API may return attempts as an array in res.data
              const attempts = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.attempts) ? res.attempts : (Array.isArray(res?.data?.attempts) ? res.data.attempts : []));
              this.reviewAttempts = (Array.isArray(attempts) ? attempts : []).map((a:any, idx:number) => {
                const items = Array.isArray(a.review) ? a.review : (Array.isArray(a.items) ? a.items : (Array.isArray(a.questions) ? a.questions : []));
                const mappedItems = (items || []).map((it:any) => {
                  const options = Array.isArray(it.options) ? it.options : (Array.isArray(it.choices) ? it.choices : []);
                  // ensure option objects have is_correct numeric flag and option_text
                  const normalizedOptions = (options || []).map((o:any) => ({ is_correct: (typeof o.is_correct !== 'undefined') ? Number(o.is_correct) : ((typeof o.isCorrect !== 'undefined') ? Number(o.isCorrect) : 0), option_text: o.option_text || o.text || o.label || '' }));
                  const selectedArr = Array.isArray(it.selected_option) ? it.selected_option.map((s:any)=>String(s)) : (it.selected_option ? [String(it.selected_option)] : (it.selected ? (Array.isArray(it.selected) ? it.selected.map((s:any)=>String(s)) : [String(it.selected)]) : []));
                  // determine boolean correctness for the item
                  const itemIsCorrect = (typeof it.is_correct !== 'undefined') ? Boolean(it.is_correct) : ((typeof it.isCorrect !== 'undefined') ? Boolean(it.isCorrect) : null);
                  const inferredCorrect = (it.correct_option || it.correct_answer || it.answer) || (normalizedOptions && normalizedOptions.length ? normalizedOptions[0].option_text : '');
                  return {
                    title: row.title || '',
                    question_text: it.question_text || it.question || it.q || '',
                    question: it.question_text || it.question || it.q || '',
                    correct_option: inferredCorrect,
                    options: normalizedOptions,
                    question_type: it.question_type || it.type || 'choose',
                    selected_option: selectedArr,
                    is_correct: itemIsCorrect,
                    marks_awarded: (typeof it.marks_awarded !== 'undefined') ? it.marks_awarded : (typeof it.marks !== 'undefined' ? it.marks : 0),
                    question_marks: (typeof it.question_marks !== 'undefined') ? it.question_marks : (typeof it.marks !== 'undefined' ? it.marks : 0),
                    feedback: it.feedback || null,
                    review_comment: it.review_comment || it.reviewComment || null
                  } as any;
                });
                return {
                  title: row.title || '',
                  attempt_number: a.attempt_number || a.attempt_no || a.attempt || (idx+1),
                  items: mappedItems,
                  score: a.score || a.marks || 0,
                  started_date: a.started_date || a.started_at || a.start_time || null,
                  submitted_date: a.submitted_date || a.submitted_at || null,
                  status: a.status || null,
                  percentage: a.percentage || null,
                  total_questions: a.total_questions || null,
                  total_marks: a.total_marks || a.max_marks || null,
                  time_taken: a.time_taken || null,
                  result: a.result || null
                };
              });
        }catch(e){ this.reviewAttempts = []; }
        this.reviewLoading = false;
        this.loader.hide();
      }, error: (err) => {
        console.warn('Failed to load review', err);
        try { notify(err?.error?.statusMessage || 'This review is not available.', 'error'); } catch (e) {}
        this.reviewLoading = false; this.reviewAttempts = []; this.reviewOpen = false; this.loader.hide();
      } });
    }catch(e){ try { notify('Failed to request review', 'error'); } catch(e){} }
  }

  closeReview(){ this.reviewOpen = false; this.reviewAttempts = []; this.reviewSelectedAttempt = 0; }

  /** Filter review comments by category (missing / incorrect / incomplete) */
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

  /** Convert string to Title Case */
  toTitleCase(str: string | null | undefined): string {
    if (!str) return '';
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  ngOnInit(): void{

    this.pageMeta.setMeta('User Tests', 'Explore and manage your tests');
    
  }
  loadExams(){
    this.loader.show();
    if(!this.instituteId) return;
    this.loading = true;
    // include session user data as a payload in the query string
    const userRaw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
    let userObj: any = null;
    try { userObj = userRaw ? JSON.parse(userRaw) : null; } catch(e) { userObj = null; }
    const userId = userObj?.user_id || userObj?.id || '';

    // send user_id as query param via GET request to fetch exams for the user's institute
    const url = `${this.examsUrl}?user_id=${encodeURIComponent(userId)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
      const arr = Array.isArray(res?.data) ? res.data : [];
      const fmtDate = (v: any): string => {
        if (v === null || v === undefined || v === '') return '';
        let d: Date;
        if (typeof v === 'number') {
          d = new Date(v > 1e12 ? v : v * 1000);
        } else if (/^\d+$/.test(String(v))) {
          const n = Number(v);
          d = new Date(n > 1e12 ? n : n * 1000);
        } else {
          d = new Date(String(v));
        }
        if (isNaN(d.getTime())) return String(v);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const dd = String(d.getDate()).padStart(2, '0');
        const mmm = months[d.getMonth()];
        const yyyy = d.getFullYear();
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return `${dd}-${mmm}-${yyyy} ${hh}:${mm}`;
      };

      this.exams = arr.map((x: any) => {
        const normalizedType = (x.type || '').toString().toLowerCase();
        const reviewAvailable = Boolean(x.user_review || x.review_available || x.review);
        const attempted = Boolean(x.attempted);
        const expired = Boolean(x.expired);
        const isCompleted = ['complete', 'completed', 'done'].includes(normalizedType)
          || (expired && attempted)
          || reviewAvailable;
        const startVal = fmtDate(isCompleted ? x.user_start_time : (x.start_time || x.start));
        const endVal = fmtDate(isCompleted ? x.user_end_time : (x.end_time || x.end));
        const completedScheduleTest = startVal ? `${startVal} - ${endVal || '--'}` : '--';
        const scheduleTest = (startVal || endVal) ? `${startVal || '—'} - ${endVal || '—'}` : '—';
        return {
          test_id: x.test_id || x.id || x.exam_id,
          schedule_id: x.schedule_id || '',
          title: x.schedule_title || x.name || '', //exam_title
          // whether review is available for this user on this exam
          user_review: reviewAvailable,
          review_available: reviewAvailable,
          attempted,
          expired,
          start_time: startVal,
          end_time: endVal,
          scheduleTest: isCompleted ? completedScheduleTest : scheduleTest,
          pass_mark: x.pass_mark || 0,
          number_of_attempts: x.number_of_attempts || 0,
          duration_mins: x.duration_mins || x.duration || 0,
          total_questions: x.total_questions || x.questions_count || 0,
          total_marks: x.total_marks || x.marks || 0,
          type: x.type
        };
      });
      this.loading = false;
      this.dataSource.data = this.exams;
      // populate per-tab sources
      this.updateTabDataSources();
      try{ 
        const configureSorting = (src: MatTableDataSource<UserTestRow>) => {
          src.sort = this.sort;
          src.sortingDataAccessor = (item: UserTestRow, property: string) => {
            if (property === 'scheduleTest') {
              const rawStart = item.start_time;
              if (!rawStart) return 0;
              const parts = rawStart.split(' ');
              if (parts.length >= 2) {
                const dateParts = parts[0].split('-');
                if (dateParts.length === 3) {
                  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  const month = months.indexOf(dateParts[1]);
                  if (month >= 0) {
                    const timeParts = parts[1].split(':');
                    const d = new Date(Number(dateParts[2]), month, Number(dateParts[0]), Number(timeParts[0] || 0), Number(timeParts[1] || 0));
                    return d.getTime();
                  }
                }
              }
              const fallback = Date.parse(rawStart);
              return isNaN(fallback) ? 0 : fallback;
            }
            return (item as any)[property];
          };
        };

        configureSorting(this.dataSource);
        configureSorting(this.activeSource);
        configureSorting(this.completeSource);
      }catch(e){}
      this.loader.hide();
      },
      error: (err) => { console.warn('Failed to load tests', err); this.loading = false; this.exams = []; this.loader.hide(); }
    });

  }

  private updateTabDataSources(){
    const lc = (s?: string) => (s || '').toString().toLowerCase();
    const isActive = (t?: string) => ['active','live'].includes(lc(t));
    const isComplete = (exam: UserTestRow) =>
      ['complete','completed','done'].includes(lc(exam.type))
      || Boolean(exam.expired && exam.attempted)
      || Boolean(exam.user_review || exam.review_available);
    const isUpcoming = (t?: string) => ['upcoming','scheduled','pending','upcomming'].includes(lc(t));

    this.activeSource.data = this.exams.filter(e => isActive(e.type) || isUpcoming(e.type));
    this.completeSource.data = this.exams.filter(isComplete);
  }

  isUpcomingTest(type?: string): boolean {
    return ['upcoming','scheduled','pending','upcomming'].includes((type || '').toString().toLowerCase());
  }

  // Helpers used by the template to safely check selected options
  normalizeSelectedOptions(item: any): string[] {
    const sel = item && item.selected_option;
    if (!sel) return [];
    if (Array.isArray(sel)) return sel.map((s: any) => String(s));
    return [String(sel)];
  }

  // Return option letter (A, B, C...)
  getOptionLetter(index: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (typeof index !== 'number' || index < 0) return String(index + 1);
    return letters[index] || String(index + 1);
  }

  isOptionSelected(item: any, opt: any): boolean {
    try {
      const arr = this.normalizeSelectedOptions(item);
      const optText = (opt && opt.option_text) ? String(opt.option_text) : '';
      return arr.indexOf(optText) >= 0;
    } catch (e) { return false; }
  }

  // Returns a CSS class for a review row based on correctness
  getRowClass(item: any): string {
    if (typeof item?.is_correct === 'boolean') return item.is_correct ? 'row-correct' : 'row-incorrect';
    if (typeof item?.is_correct === 'number') return item.is_correct ? 'row-correct' : 'row-incorrect';
    return '';
  }

  // Determine option highlight status: 'selected-correct', 'selected-incorrect', 'correct', or ''
  optionStatus(item: any, opt: any): string {
    try{
      const optText = (opt && opt.option_text) ? String(opt.option_text) : '';
      const selected = this.normalizeSelectedOptions(item);
      const isSelected = selected.indexOf(optText) >= 0;
      const isCorrect = (opt && (Number(opt.is_correct) === 1 || opt.is_correct === 1 || opt.is_correct === true));
      if (isSelected && isCorrect) return 'option-selected-correct';
      if (isSelected && !isCorrect) return 'option-selected-incorrect';
      if (!isSelected && isCorrect) return 'option-correct';
      return '';
    }catch(e){ return ''; }
  }

  // Safe template-friendly check for option correctness
  isOptionCorrect(opt: any): boolean {
    try{
      if (!opt) return false;
      const v = opt.is_correct !== undefined ? opt.is_correct : (opt.isCorrect !== undefined ? opt.isCorrect : 0);
      return Number(v) === 1 || v === true;
    }catch(e){ return false; }
  }

  confirmStartTest(ex: UserTestRow): void {
    this.dialog.open(ConfirmStartTestDialogComponent, {
      width: '32.8rem',
      maxWidth: 'calc(100vw - 2rem)',
      autoFocus: false,
      restoreFocus: true
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.launchTest(ex);
    });
  }

  launchTest(ex: UserTestRow){
    if (!ex?.schedule_id) { try { notify('Schedule id missing', 'error'); } catch(e){}; return; }
    const userRaw = sessionStorage.getItem('user_profile') || sessionStorage.getItem('user');
    const userId = userRaw ? (JSON.parse(userRaw)?.user_id || JSON.parse(userRaw)?.id || '') : '';
    const url = `${this.launchUrl}?schedule_id=${encodeURIComponent(String(ex.schedule_id))}&user_id=${encodeURIComponent(String(userId))}`;
    // call launch API and navigate to user-exam page with payload
    this.http.get<any>(url).subscribe({
      next: (res) => {
        // store the returned exam payload (questions etc) in sessionStorage for the user-exam page
        try{ sessionStorage.setItem('launched_exam', JSON.stringify(res?.data || res)); }catch(e){}
        // navigate to user exam page
        // window.location.href = '/user-exam';
        this.router.navigate(['/user-exam'])
      },
      error: (err) => { console.warn('Failed to launch exam', err); try { notify('Could not launch test', 'error'); } catch(e){} }
    });
  }

  applyFilter(){
    const q = (this.search || '').trim().toLowerCase();
    const predicate = (row: UserTestRow, filter: string) => {
      const byText = (row.title || '').toLowerCase().includes(filter) || (row.test_id || '').toLowerCase().includes(filter);
      const byPublished = this.filterPublished === '' ? true : ((this.filterPublished === 'live') ? !!row.published : !row.published);
      return byText && byPublished;
    };
    [this.dataSource, this.activeSource, this.completeSource].forEach(ds => {
      ds.filterPredicate = predicate;
      ds.filter = q;
    });
  }

  ngAfterViewInit(): void {
    try{ this.dataSource.sort = this.sort; }catch(e){}
  }
}
