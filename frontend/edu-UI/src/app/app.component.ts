import { Component, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './home/service/auth.service';
import { SessionService } from './shared/services/session.service';
import { GlobalInstituteContextService } from './shared/services/global-institute-context.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'edu-UI';
  isLoggedIn$: Observable<boolean>;
  private globalInstituteSub: Subscription;

  constructor(
    private auth: AuthService,
    private sessionService: SessionService,
    public globalInstituteContext: GlobalInstituteContextService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.sessionService.startListening();
    this.syncGlobalInstituteBodyClass(this.globalInstituteContext.isGlobalFilterActive());
    this.globalInstituteSub = this.globalInstituteContext.selectedInstitute$.subscribe(() => {
      this.syncGlobalInstituteBodyClass(this.globalInstituteContext.isGlobalFilterActive());
    });
  }

  ngOnDestroy(): void {
    try { this.globalInstituteSub.unsubscribe(); } catch (e) {}
    this.syncGlobalInstituteBodyClass(false);
  }

  private syncGlobalInstituteBodyClass(isActive: boolean): void {
    try {
      this.document.body.classList.toggle('global-institute-active', isActive);
    } catch (e) {}
  }
}
