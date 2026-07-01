import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DynamicChartComponent } from '../../super-admin/dynamic-chart.component';
import { PageMetaService } from '../../../shared/services/page-meta.service';
import { UserDashboardService } from './user-dashboard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from 'src/app/shared/services/loader.service';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DynamicChartComponent, MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  metrics: any = { lastScore: null, lastPercent: null, totalQuestions: 0, accuracy: 0, totalExams: null, avgScore: null };
  charts: Array<any> = [];
  selectedUserId: string | null = null;
  selectedInstituteId: string | null = null;
  users: Array<any> = [];
  institutes: Array<any> = [];

  constructor(private pageMeta: PageMetaService, private svc: UserDashboardService,private loader: LoaderService){ }

  ngOnInit(): void {
    try{ this.pageMeta.setMeta('User Dashboard','Performance overview & analytics'); } catch(e){}
    // fetch institutes first, then users for the default institute
    this.svc.getInstitutes().subscribe({ next: (inst:any)=>{ this.institutes = inst || []; this.setDefaultInstitute(); }, error: ()=>{ this.setDefaultInstitute(); } });
  }

  setDefaultUser(){
    const current = this.svc.getLoggedInUserId();
    this.selectedUserId = this.users.find((x:any)=> x.id === current)?.id ?? current ?? (this.users[0]?.id ?? null);
    this.loadDashboard();
  }

  setDefaultInstitute(){
    // default to institute stored in session or first institute
    try{
      const raw = sessionStorage.getItem('user');
      const u = raw ? JSON.parse(raw) : null;
      const instId = u?.institute_id || u?.instituteId || null;
      this.selectedInstituteId = this.institutes.find((x:any)=> x.id === instId)?.id ?? instId ?? (this.institutes[0]?.id ?? null);
    }catch(e){ this.selectedInstituteId = this.institutes[0]?.id ?? null; }
    this.onInstituteChange(this.selectedInstituteId);
  }

  onInstituteChange(id:any){
    this.loader.show();
    this.selectedInstituteId = id;
    // load users for this institute
    this.svc.getUsersByInstitute(this.selectedInstituteId).subscribe({ next: (res:any)=>{
      // backend returns { data: [...] } for get-users-list
      if(res && res.data) this.users = res.data.map((u:any)=> ({ id: u.user_id || u.userId || u.id, name: u.full_name || u.user_name || u.email, email: u.email }));
      else this.users = Array.isArray(res) ? res : [];
      // reset selected user to appropriate default
      this.setDefaultUser();
    }, error: (err)=>{ console.warn('failed to load users for institute', err); this.users = []; this.setDefaultUser(); },complete: () => this.loader.hide() });
  }

  onUserChange(id:any){
    this.selectedUserId = id;
    this.loadDashboard();
  }

  loadDashboard(){
    this.loader.show();
    this.svc.getDashboard(this.selectedUserId).subscribe({ next: (res:any)=> this.applyDashboard(res), error: (err)=> console.warn('user dashboard load failed', err),complete: () => this.loader.hide() });
  }

  private applyDashboard(res:any){
    if(!res) return;
    this.metrics.lastScore = res.last_score ?? res.score ?? null;
    this.metrics.lastPercent = res.last_percent ?? res.percent ?? null;
    this.metrics.totalQuestions = res.total_questions ?? res.questions_total ?? 0;
    this.metrics.accuracy = res.accuracy ?? 0;
    this.metrics.totalExams = res.total_exams ?? res.exams_taken ?? null;
    this.metrics.avgScore = res.avg_score ?? res.average_score ?? null;

    // charts mapping - reuse same mapping as superadmin when possible
    this.charts = res.charts || res.charts_list || [];
  }

}
