import { CanDeactivateFn } from '@angular/router';
import { AdminScheduleTestComponent } from '../../userrole/admin/schedule-test/schedule-test.component';

export const scheduleTestUnsavedChangesGuard: CanDeactivateFn<AdminScheduleTestComponent> = component =>
  component.canDeactivate();
