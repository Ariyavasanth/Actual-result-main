import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../home/service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { IconModule } from '../../icons/icon.module';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, DirectivesModule, IconModule, MatButtonModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
// export class SideNavComponent { }
export class SideNavComponent implements OnInit, OnDestroy {
  @HostBinding('class.collapsed') get hostCollapsed() { return this.collapsed }
  // class bindings are handled in the template; no HostBinding needed
  isLogin = false;
  userRole: string | null = null;
  userName = sessionStorage.getItem('username') || '';
  userInstitute: string | null = sessionStorage.getItem('userInstitute') || '';
  menus: Array<{ label: string, path: string, icon?: string }> = [];
  collapsed = false;
  // track last clicked menu label so it remains highlighted until another side-nav item is clicked
  selectedMenu: string | null = null;
  private routerSubscription: Subscription;
  private authSubscription?: Subscription;
  private userSubscription?: Subscription;
  constructor(
    public router: Router,
    private authService: AuthService,
    //     private _snackBar: MatSnackBar,
    //     public dialog: MatDialog
  ) {
    // Check login status initially
    // Subscribe to AuthService so UI responds immediately to login/logout
    this.authSubscription = this.authService.isLoggedIn$.subscribe(v => {
      this.isLogin = !!v;
      this.setupMenus();
    });
    this.userSubscription = this.authService.user$.subscribe(u => {
      if (u) {
        this.userRole = u.role || this.userRole;
        this.userName = u.name || this.userName;
        this.userInstitute = u.institute_name || u.institute || this.userInstitute || '';
      } else {
        this.userRole = sessionStorage.getItem('userRole');
        this.userName = sessionStorage.getItem('username') || '';
      }
      this.setupMenus();
    });

    // Subscribe to router events to check login status after navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        // keep previous route-change based checks
        this.setupMenus();
        // Update selectedMenu based on current URL
        this.updateSelectedMenuFromUrl((event as NavigationEnd).urlAfterRedirects || this.router.url);
      });
  }

  ngOnInit(): void {
    // Set initial selected menu based on current URL
    this.updateSelectedMenuFromUrl(this.router.url);
  }

  /** Route-to-menu mapping for related routes */
  private readonly routeToMenuMap: Record<string, string> = {
    '/user-register': 'Users',
    '/view-users': 'Users',
    '/category': 'Categories',
    '/category-create': 'Categories',
    '/view-questions': 'Questions',
    '/questions': 'Questions',
    '/exams': 'Exams',
    '/create-exam': 'Exams',
    '/view-schedule-exam': 'Schedule Exam',
    '/schedule-exam': 'Schedule Exam',
    '/view-institutes': 'Institutes',
    '/institute-register': 'Institutes',
    '/admin/exam-reports': 'Exam Reports',
  };

  /** Updates selectedMenu by finding which menu path matches the current URL */
  private updateSelectedMenuFromUrl(url: string): void {
    if (!url || !this.menus.length) return;
    // Check the route mapping first
    for (const [route, menuLabel] of Object.entries(this.routeToMenuMap)) {
      if (url.startsWith(route)) {
        this.selectedMenu = menuLabel;
        return;
      }
    }
    // Fallback: find menu whose path is a prefix of the current URL
    const matched = this.menus.find(m => url.startsWith(m.path));
    this.selectedMenu = matched?.label || null;
  }

  onMenuClick(menu: { label: string, path: string, icon?: string }){
    try{ this.selectedMenu = menu?.label || null; }catch(e){ this.selectedMenu = null; }
  }

  toggleCollapse() { this.collapsed = !this.collapsed; this.updateParentSidenavClass(); }
  
  private updateParentSidenavClass() {
    try {
      const parent = document.querySelector('.app-sidenav');
      if (parent) {
        if (this.collapsed) parent.classList.add('sidenav-collapsed'); else parent.classList.remove('sidenav-collapsed');
      }
    } catch (e) { /* no-op */ }
  }



  // Method to update login status from sessionStorage
  // legacy method kept but primary sources are AuthService observables
  private updateLoginStatus(): void {
    const loginStatus = sessionStorage.getItem('isLogin');
    this.isLogin = loginStatus === 'true';
    const raw = sessionStorage.getItem('user');
    if (raw) {
      try { this.userRole = JSON.parse(raw).role; } catch (e) { this.userRole = sessionStorage.getItem('userRole'); }
    } else {
      this.userRole = sessionStorage.getItem('userRole');
    }
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      this.userInstitute = parsed?.institute_name || parsed?.institute || sessionStorage.getItem('userInstitute') || '';
    } catch(e) { this.userInstitute = sessionStorage.getItem('userInstitute') || ''; }
    this.setupMenus();
  }

  private setupMenus() {
    // default empty
    this.menus = [];
    if (!this.isLogin) return;

    const role = (this.userRole || '').toLowerCase();
    if (role === 'super_admin' || role === 'super-admin') {
      this.menus.push({ label: 'Super Admin Dashboard', path: '/super-admin-dashboard', icon: 'dashboard' });
      this.menus.push({ label: 'Institutes', path: '/view-institutes', icon: 'institute' });
    }

    if (role === 'admin' || role === 'super_admin' || role === 'super-admin') {
      // admin and super-admin may see admin tools
      this.menus.push({ label: 'Admin Dashboard', path: '/admin-dashboard', icon: 'admin' });
      this.menus.push({ label: 'Users', path: '/view-users', icon: 'users' });
      this.menus.push({ label: 'Categories', path: '/category', icon: 'category' });
      this.menus.push({ label: 'Questions', path: '/view-questions', icon: 'quiz' });
      this.menus.push({ label: 'Exams', path: '/exams', icon: 'exam' });
      this.menus.push({ label: 'Schedule Exam', path: '/view-schedule-exam', icon: 'calendar' });
      this.menus.push({ label: 'Exam Reports', path: '/admin/exam-reports', icon: 'report' });
    }

    if (role === 'user' || role === 'candidate' || role === 'super_admin' || role === 'super-admin') {
      // typical user menus
      this.menus.push({ label: 'User Dashboard', path: '/user-dashboard', icon: 'user' });
      this.menus.push({ label: 'Exam', path: '/user/exam', icon: 'assignment' });
    }

    // After menus are set, update selected menu based on current URL
    this.updateSelectedMenuFromUrl(this.router.url);
  }


  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}