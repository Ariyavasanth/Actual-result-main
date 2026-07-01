import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule],
  exports: [MatIconModule]
})
export class IconModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    try {
      this.iconRegistry.addSvgIcon(
        'view',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg')
      );
      this.iconRegistry.addSvgIcon(
        'edit',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
      );
      this.iconRegistry.addSvgIcon(
        'delete',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
      );
      this.iconRegistry.addSvgIcon(
        'filter',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/filter.svg')
      );
      this.iconRegistry.addSvgIcon(
        'refresh',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/refresh.svg')
      );

     this.iconRegistry.addSvgIcon(
       'add',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg')
     );
     this.iconRegistry.addSvgIcon(
       'admin',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/admin.svg')
     );
     this.iconRegistry.addSvgIcon(
       'arrow_back',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_back.svg')
     );
     this.iconRegistry.addSvgIcon(
       'arrow_forward',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_forward.svg')
     );
     this.iconRegistry.addSvgIcon(
       'apply',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/apply.svg')
     );
     this.iconRegistry.addSvgIcon(
       'assignment',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/assignment.svg')
     );
     this.iconRegistry.addSvgIcon(
       'calendar',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar.svg')
     );
     this.iconRegistry.addSvgIcon(
       'category',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/category.svg')
     );
     this.iconRegistry.addSvgIcon(
       'dashboard',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg')
     );
     this.iconRegistry.addSvgIcon(
       'exam',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/exam.svg')
     );
     this.iconRegistry.addSvgIcon(
       'institute',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/institute.svg')
     );
     this.iconRegistry.addSvgIcon(
       'quiz',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/quiz.svg')
     );
     this.iconRegistry.addSvgIcon(
       'report',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/report.svg')
     );
     this.iconRegistry.addSvgIcon(
       'reset_settings',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/reset_settings.svg')
     );
     this.iconRegistry.addSvgIcon(
       'save',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/save.svg')
     );
     this.iconRegistry.addSvgIcon(
       'users',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/users.svg')
     );
     this.iconRegistry.addSvgIcon(
       'user',
       this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user.svg')
     );
     this.iconRegistry.addSvgIcon(
       'brain',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/brain.svg')
      );
      // upload icon
      this.iconRegistry.addSvgIcon(
        'upload',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/upload.svg')
      );
      // cloud_upload icon
      this.iconRegistry.addSvgIcon(
        'cloud_upload',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloud_upload.svg')
      );
      // download icon
      this.iconRegistry.addSvgIcon(
        'download',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/download.svg')
      );
      // attach_file icon
      this.iconRegistry.addSvgIcon(
        'attach_file',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/attach_file.svg')
      );
      // star icon
      this.iconRegistry.addSvgIcon(
        'star',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/star.svg')
      );
    } catch (e) {
      // ignore if registry/sanitizer not available in certain test environments
    }
  }
}
