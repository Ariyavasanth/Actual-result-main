import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { GlobalInstituteContextService } from '../services/global-institute-context.service';

@Injectable({ providedIn: 'root' })
export class GlobalInstituteScopeGuard implements CanActivate {
  constructor(private instituteContext: GlobalInstituteContextService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.instituteContext.isGlobalFilterActive()) return true;
    return this.router.createUrlTree(['/institutes-inactive']);
  }
}
