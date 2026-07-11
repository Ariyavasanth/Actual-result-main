import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PageMetaService } from '../../../shared/services/page-meta.service';
import { API_BASE } from 'src/app/shared/api.config';
import { DynamicChartComponent } from '../dynamic-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GlobalInstituteContext, GlobalInstituteContextService } from 'src/app/shared/services/global-institute-context.service';
import { notify } from 'src/app/shared/global-notify';

interface DashboardInstituteOption {
  id: string;
  name: string;
  industry: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-super-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, DynamicChartComponent, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class SuperDashboardComponent implements OnInit {
 
    summary: any = {
    totalUsers: 0,
    totalInstitutes: 0,
    totalExams: 0,
    totalQuestions: 0,
    activeTests: 0,
    upcomingTests: 0,
    completedTests: 0,
    avgScore: null,
    passRate: null
  };
  instituteStats: Array<{ name: string; users: number; scheduledTests: number }> = [];
  recentActivity: Array<{ type: string; user?: string; exam?: string; timestamp: string }> = [];
  // visual / metric fields
  passRate = 0;
  avgScore = 0;
  attempts: number[] = [];

  // final charts array used by template
  charts: Array<{ type: string; title: string; data: any; key?: string }> = [];

  filterModel = { industry: '', country: '', city: '', institute_id: '' };
  instituteOptions: DashboardInstituteOption[] = [];
  isFilterLoading = false;
  filterLoadError = '';
  
  private apiUrl = `${API_BASE}/superadmin-dashboard`;

  constructor(private http: HttpClient, private pageMeta: PageMetaService, private loader: LoaderService, public instituteContext: GlobalInstituteContextService){ }

  ngOnInit(): void {
    try { this.pageMeta.setMeta('Super Admin Dashboard', 'Platform-wide overview & reports'); } catch(e){}
    this.restoreActiveFilter();
    this.loadFilterOptions();
    this.loadDashboard();
  }

  loadDashboard(){
    this.loader.show();
    this.http.get<any>(this.apiUrl, { headers: { 'X-Skip-Institute-Context': 'true' } }).subscribe({
      next: (res) => this.applyDashboardData(res),
      error: (err) => console.warn('Failed to load dashboard', err),
      complete: () => this.loader.hide()
    });
  }

  get activeInstituteContext(): GlobalInstituteContext | null {
    return this.instituteContext.activeContext;
  }

  get industryOptions(): string[] {
    return this.uniqueSorted([
      ...this.instituteOptions.map(i => i.industry),
      'School',
      'BPO',
      'Bank'
    ]);
  }

  get countryOptions(): string[] {
    return this.uniqueSorted(this.filteredByIndustry().map(i => i.country));
  }

  get cityOptions(): string[] {
    return this.uniqueSorted(this.filteredByCountry().map(i => i.city));
  }

  get filteredInstituteOptions(): DashboardInstituteOption[] {
    return this.filteredByCity().sort((a, b) => a.name.localeCompare(b.name));
  }

  get canApplyFilter(): boolean {
    return !!this.filterModel.institute_id && !this.isFilterLoading;
  }

  loadFilterOptions(): void {
    this.isFilterLoading = true;
    this.filterLoadError = '';
    const headers = { 'X-Skip-Institute-Context': 'true' };
    this.http.get<any>(`${API_BASE}/get-institutes`, { headers }).subscribe({
      next: (res) => {
        const records = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.instituteOptions = records.map((record: any) => this.mapInstituteOption(record)).filter((item: DashboardInstituteOption) => !!item.id && !!item.name);
        this.keepValidFilterSelection();
      },
      error: (err) => {
        console.warn('Failed to load institute filter options', err);
        this.filterLoadError = 'Unable to load institute filters';
        this.instituteOptions = [];
      },
      complete: () => { this.isFilterLoading = false; }
    });
  }

  onIndustryChange(): void {
    this.filterModel.country = '';
    this.filterModel.city = '';
    this.filterModel.institute_id = '';
    this.instituteContext.clearPendingInstitute();
  }

  onCountryChange(): void {
    this.filterModel.city = '';
    this.filterModel.institute_id = '';
    this.instituteContext.clearPendingInstitute();
  }

  onCityChange(): void {
    this.filterModel.institute_id = '';
    this.instituteContext.clearPendingInstitute();
  }

  onInstituteSelectionChange(): void {
    const selected = this.instituteOptions.find(i => String(i.id) === String(this.filterModel.institute_id));
    this.instituteContext.setPendingInstitute(selected ? {
      institute_id: selected.id,
      institute_name: selected.name,
      industry: selected.industry,
      country: selected.country,
      city: selected.city
    } : null);
  }

  applyGlobalFilter(): void {
    const selected = this.instituteOptions.find(i => String(i.id) === String(this.filterModel.institute_id));
    if (!selected) {
      try { notify('Please select an institute before applying the filter.', 'info'); } catch (e) {}
      return;
    }

    this.instituteContext.setPendingInstitute({
      institute_id: selected.id,
      institute_name: selected.name,
      industry: selected.industry,
      country: selected.country,
      city: selected.city
    });
    this.instituteContext.applyPendingInstitute();
    this.filterModel = {
      industry: selected.industry,
      country: selected.country,
      city: selected.city,
      institute_id: selected.id
    };
    try { notify(`Institute context set to ${selected.name}`, 'success'); } catch (e) {}
  }

  clearGlobalFilter(): void {
    this.instituteContext.clearInstitute();
    this.filterModel = { industry: '', country: '', city: '', institute_id: '' };
    try { notify('Institute filter cleared', 'info'); } catch (e) {}
  }

  private restoreActiveFilter(): void {
    const context = this.instituteContext.activeContext;
    if (!context) return;
    this.filterModel = {
      industry: context.industry || '',
      country: context.country || '',
      city: context.city || '',
      institute_id: context.institute_id || ''
    };
  }

  private keepValidFilterSelection(): void {
    if (!this.filterModel.institute_id) return;
    const selected = this.instituteOptions.find(i => String(i.id) === String(this.filterModel.institute_id));
    if (!selected) return;
    this.filterModel.industry = this.filterModel.industry || selected.industry;
    this.filterModel.country = this.filterModel.country || selected.country;
    this.filterModel.city = this.filterModel.city || selected.city;
  }

  private filteredByIndustry(): DashboardInstituteOption[] {
    return this.instituteOptions.filter(i => !this.filterModel.industry || i.industry === this.filterModel.industry);
  }

  private filteredByCountry(): DashboardInstituteOption[] {
    return this.filteredByIndustry().filter(i => !this.filterModel.country || i.country === this.filterModel.country);
  }

  private filteredByCity(): DashboardInstituteOption[] {
    return this.filteredByCountry().filter(i => !this.filterModel.city || i.city === this.filterModel.city);
  }

  private uniqueSorted(values: string[]): string[] {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
  }

  private mapInstituteOption(record: any): DashboardInstituteOption {
    const campus = Array.isArray(record?.campuses) && record.campuses.length ? record.campuses[0] : {};
    return {
      id: String(record?.institute_id || record?.id || record?._id || ''),
      name: String(record?.name || record?.institute_name || record?.short_name || ''),
      industry: String(record?.industry_type || record?.industry || record?.industry_sector || ''),
      country: this.resolveLocationValue(record?.country || campus?.country || record?.country_name || campus?.country_name, ['country_name', 'name', 'country']),
      city: this.resolveLocationValue(record?.city || campus?.city || record?.city_name || campus?.city_name, ['city_name', 'name', 'city'])
    };
  }

  private resolveLocationValue(value: any, keys: string[]): string {
    if (!value) return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    for (const key of keys) {
      if (value?.[key]) return String(value[key]);
    }
    return '';
  }

  private applyDashboardData(res: any){
    if(!res) return;
    // summary (res.summary expected)
    const s = res.summary || res.details?.summary || res || {};
    this.summary.totalUsers = s.total_users ?? s.totalUsers ?? 0;
    this.summary.totalInstitutes = s.total_institutes ?? s.totalInstitutes ?? 0;
    this.summary.totalExams = s.total_exams ?? s.totalExams ?? 0;
    this.summary.totalQuestions = s.total_questions ?? s.totalQuestions ?? 0;
    this.summary.upcomingTests = s.upcoming_exams ?? s.upcomingExams ?? 0;
    this.summary.activeTests = s.active_exams ?? s.activeExams ?? 0;
    this.summary.completedTests = s.completed_exams ?? s.completedExams ?? 0;
    this.summary.avgScore = s.avg_score ?? s.avgScore ?? this.avgScore ?? null;
    this.summary.passRate = s.pass_rate ?? s.passRate ?? null;

    // core lists (top institutes may live under details.top_institutes)
    const topInstitutes = res.details?.top_institutes || res.top_institutes || res.topInstitutes || [];
    this.instituteStats = (topInstitutes || []).map((t:any)=>({ name: t.name || t.institute || 'N/A', users: t.users || t.count || 0, scheduledTests: t.exams || t.scheduled_tests || t.scheduledTests || 0 }));

    // recent activity
    this.recentActivity = (res.recent_activity || res.recentActivity || []).slice(0, 5);

    // exam stats
    const examStats = res.details?.exam_stats || res.exam_stats || {};
    this.passRate = examStats?.pass_rate ? Math.round(examStats.pass_rate * 100) : (examStats?.pass_rate || 0);
    this.avgScore = examStats?.average_score || examStats?.avg_score || 0;
    this.summary.passRate = this.passRate || this.summary.passRate;

    // attempts / growth
    this.attempts = (res.user_growth || res.userGrowth || res.attempts_over_time || []).map((x:any)=> x.users ?? x.count ?? x.value ?? 0);

    // Build charts list from API `charts` array when present
    const apiCharts = Array.isArray(res.charts) ? res.charts : Array.isArray(res.charts_list) ? res.charts_list : null;
    if(apiCharts){
      const colors = ['#0b7285','#1f7bff','#66c2d9','#8ad1c8'];
      this.charts = apiCharts.map((c:any, idx:number) => {
        const type = (c.type || 'line').toString();
        const title = c.title || c.label || c.id || ('Chart ' + (idx+1));
        const raw = c.data || {};
        const labels: string[] = raw.labels || [];
        const values: number[] = (raw.values || []).map((v:any)=>Number(v||0));

        // convert to our DynamicChartComponent expected shapes
        if(type === 'bar' || type === 'column'){
          const max = Math.max(...values, 1);
          const barRects = values.map((v:number, i:number)=>{ const width = 24; const x = 10 + i*40; const height = (v/max) * 80; const y = 100 - height; return { x, y, width, height, color: colors[i % colors.length], label: labels[i] || ('#'+i), value: v }; });
          return { type: 'bar', title, data: { barRects } , key: c.id };
        }

        if(type === 'pie'){
          const total = values.reduce((s, n) => s + n, 0) || 1;
          let acc = 0;
          const pcolors = ['#1f7bff','#0b7285','#66c2d9','#8ad1c8'];
          const pieSlices = values.map((v:number,i:number)=>{ const pct = Math.round((v/total)*100); const dasharray = `${pct} ${100 - pct}`; const dashoffset = -acc; acc += pct; return { label: labels[i] || ('#'+i), value: v, pct, color: pcolors[i % pcolors.length], dasharray, dashoffset }; });
          return { type: 'pie', title, data: { pieSlices }, key: c.id };
        }

        if(type === 'line'){
          const n = Math.max(values.length, 1);
          const maxV = Math.max(...values, 1);
          const pts: string[] = [];
          const attemptPoints = values.map((v:number,i:number)=>{ const cx = i*(200/(Math.max(n-1,1))); const cy = 60 - (v / maxV * 50); pts.push(`${cx},${cy}`); return { cx, cy, v }; });
          const attemptsPointsStr = pts.join(' ');
          return { type: 'line', title, data: { attemptsPointsStr, attemptPoints, labels, values }, key: c.id };
        }

        // gauge or single-metric
        if(type === 'gauge' || (values && values.length === 1)){
          const val = values[0] ?? 0;
          // simple gauge path generation (approx)
          const angle = (1 - (val || 0)/100) * Math.PI;
          const gx = 6 + 22 * Math.cos(angle);
          const gy = 20 - 22 * Math.sin(angle);
          const gaugePathD = `M6 20 A12 12 0 0 1 ${gx} ${gy}`;
          return { type: 'gauge', title, data: { gaugePathD, metricValue: val }, key: c.id };
        }

        // fallback: provide line data
        const fallbackPts: string[] = [];
        const fallbackMax = Math.max(...values, 1);
        const fallbackPoints = values.map((v:number,i:number)=>{ const cx = i*(200/(Math.max(values.length-1,1))); const cy = 60 - (v / fallbackMax * 50); fallbackPts.push(`${cx},${cy}`); return { cx, cy, v }; });
        return { type: 'line', title, data: { attemptsPointsStr: fallbackPts.join(' '), attemptPoints: fallbackPoints, labels, values }, key: c.id };
      });
    } else {
      // fallback: build default charts from computed/internal data
      this.charts = [];

      // Test Status Distribution (pie)
      if (this.summary.activeTests || this.summary.upcomingTests || this.summary.completedTests) {
        const testLabels = ['Active', 'Upcoming', 'Completed'];
        const testValues = [this.summary.activeTests, this.summary.upcomingTests, this.summary.completedTests];
        const total = testValues.reduce((s, n) => s + n, 0) || 1;
        let acc = 0;
        const pieColors = ['#10b981', '#f59e0b', '#667eea'];
        const pieSlices = testValues.map((v: number, i: number) => {
          const pct = Math.round((v / total) * 100);
          const dasharray = `${pct} ${100 - pct}`;
          const dashoffset = -acc;
          acc += pct;
          return { label: testLabels[i], value: v, pct, color: pieColors[i], dasharray, dashoffset };
        });
        this.charts.push({ type: 'pie', title: 'Test Status Distribution', data: { pieSlices }, key: 'test_distribution' });
      }

      // Pass Rate Gauge
      if (this.passRate > 0) {
        const val = this.passRate;
        const angle = (1 - val / 100) * Math.PI;
        const gx = 6 + 22 * Math.cos(angle);
        const gy = 20 - 22 * Math.sin(angle);
        const gaugePathD = `M6 20 A12 12 0 0 1 ${gx} ${gy}`;
        this.charts.push({ type: 'gauge', title: 'Pass Rate', data: { gaugePathD, metricValue: val }, key: 'pass_rate_gauge' });
      }

      // User Growth (line) from attempts data
      if (this.attempts.length > 1) {
        const n = this.attempts.length;
        const maxV = Math.max(...this.attempts, 1);
        const pts: string[] = [];
        const attemptPoints = this.attempts.map((v: number, i: number) => {
          const cx = i * (200 / Math.max(n - 1, 1));
          const cy = 60 - (v / maxV * 50);
          pts.push(`${cx},${cy}`);
          return { cx, cy, v };
        });
        this.charts.push({ type: 'line', title: 'User Growth Trend', data: { attemptsPointsStr: pts.join(' '), attemptPoints, labels: [], values: this.attempts }, key: 'user_growth' });
      }

      // Users by Institute (bar) placeholder
      if (this.instituteStats.length > 0) {
        const max = Math.max(...this.instituteStats.map(i => i.users), 1);
        const colors = ['#667eea', '#7c3aed', '#10b981', '#f59e0b', '#14b8a6'];
        const barRects = this.instituteStats.slice(0, 6).map((inst, i) => ({
          x: 10 + i * 40, y: 100 - (inst.users / max) * 80,
          width: 24, height: (inst.users / max) * 80,
          color: colors[i % colors.length],
          label: inst.name, value: inst.users
        }));
        this.charts.push({ type: 'bar', title: 'Users by Institute', data: { barRects }, key: 'users_by_institute' });
      }
    }
  }



}

