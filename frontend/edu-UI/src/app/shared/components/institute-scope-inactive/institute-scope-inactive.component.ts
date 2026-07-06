import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GlobalInstituteContextService } from '../../services/global-institute-context.service';

@Component({
  selector: 'app-institute-scope-inactive',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './institute-scope-inactive.component.html',
  styleUrls: ['./institute-scope-inactive.component.scss']
})
export class InstituteScopeInactiveComponent {
  constructor(private instituteContext: GlobalInstituteContextService, private router: Router) {}

  clearGlobalFilter(): void {
    this.instituteContext.clearInstitute();
    this.router.navigate(['/super-admin-dashboard']);
  }
}
