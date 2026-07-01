import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';

import { HomeService } from '../../service/home.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  demoForm!: FormGroup;
  isSubmitting = false;
  currentStep = 1;
  totalSteps = 3;

  steps = [
    { label: 'Personal', icon: 'person' },
    { label: 'Organization', icon: 'apartment' },
    { label: 'Details', icon: 'description' }
  ];

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private loader: LoaderService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      organization: ['', Validators.required],
      role: [''],
      teamSize: [''],
      source: [''],
      requirements: [''],
      agreedToTerms: [false, Validators.requiredTrue]
    });
  }

  get progressPercent(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  canProceed(): boolean {
    if (this.currentStep === 1) {
      const fields = ['firstName', 'lastName', 'email'];
      return fields.every(f => this.demoForm.get(f)?.valid);
    }
    if (this.currentStep === 2) {
      return this.demoForm.get('organization')?.valid ?? false;
    }
    return true;
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      ['firstName', 'lastName', 'email', 'phone'].forEach(f => this.demoForm.get(f)?.markAsTouched());
    } else if (this.currentStep === 2) {
      ['organization', 'role', 'teamSize'].forEach(f => this.demoForm.get(f)?.markAsTouched());
    }

    if (this.canProceed() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step < this.currentStep) {
      this.currentStep = step;
    }
  }

  onSubmit(): void {
    if (this.demoForm.invalid) {
      this.demoForm.markAllAsTouched();
      this.notify.error('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    this.loader.show();

    const payload = this.demoForm.value;

    this.homeService.submitDemoRequest(payload).subscribe({
      next: (response) => {
        this.loader.hide();
        this.isSubmitting = false;

        if (response.status) {
          this.notify.success(response.statusMessage || 'Demo request submitted successfully!');
          this.demoForm.reset();
          this.currentStep = 1;
        } else {
          this.notify.error(response.statusMessage || 'Failed to submit demo request.');
        }
      },
      error: (err) => {
        this.loader.hide();
        this.isSubmitting = false;

        const errorMsg = err.error?.statusMessage || err.error?.errors?.join(', ') || 'An error occurred. Please try again.';
        this.notify.error(errorMsg);
      }
    });
  }

  hasError(field: string, error: string): boolean {
    const control = this.demoForm.get(field);
    return control ? control.hasError(error) && control.touched : false;
  }
}
