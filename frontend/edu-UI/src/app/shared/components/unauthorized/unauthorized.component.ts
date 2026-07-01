import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../home/service/auth.service';

@Component({
     selector: 'app-unauthorized',
     templateUrl: './unauthorized.component.html',
     styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
     constructor(
          private location: Location,
          private router: Router,
          private authService: AuthService
     ) {}

     goHome(): void {
          this.authService.logout();
          this.router.navigate(['/']);
     }

     goBack(): void {
          this.location.back();
     }
}

