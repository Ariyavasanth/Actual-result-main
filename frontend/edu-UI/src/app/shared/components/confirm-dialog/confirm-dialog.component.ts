import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
     selector: 'app-confirm-dialog',
     template: `
     <div class="dialog-container">
          <div class="dialog-icon">
               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               </svg>
          </div>
          <h2 class="dialog-title">{{data.title || 'Confirm'}}</h2>
          <p class="dialog-message">{{data.message}}</p>
          <div class="dialog-actions">
               <button mat-stroked-button mat-dialog-close class="cancel-btn">
                    {{data.cancelText || 'Cancel'}}
               </button>
               <button mat-flat-button [mat-dialog-close]="true" class="confirm-btn">
                    {{data.confirmText || 'Confirm'}}
               </button>
          </div>
     </div>
     `,
     styles: [`
          :host {
               display: block;
          }
          .dialog-container {
               display: flex;
               flex-direction: column;
               align-items: center;
               text-align: center;
               padding: 1.5rem 1rem 1rem;
          }
          .dialog-icon {
               width: 3.5rem;
               height: 3.5rem;
               border-radius: 50%;
               background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%);
               display: flex;
               align-items: center;
               justify-content: center;
               margin-bottom: 1rem;
          }
          .dialog-icon svg {
               width: 1.75rem;
               height: 1.75rem;
               color: var(--button-1, #6366f1);
          }
          .dialog-title {
               font-size: 1.25rem;
               font-weight: 700;
               color: var(--theme-3-text-1, #1e293b);
               letter-spacing: -0.01em;
               margin: 0 0 0.5rem 0;
          }
          .dialog-message {
               color: var(--theme-3-text-3, #64748b);
               line-height: 1.5;
               margin: 0 0 1.5rem 0;
               font-size: 0.9375rem;
          }
          .dialog-actions {
               display: flex;
               gap: 0.75rem;
               width: 100%;
          }
          .cancel-btn {
               flex: 1;
               border-radius: 0.625rem;
               padding: 0.625rem 1rem;
               font-weight: 600;
               border-color: var(--theme-3-border, #e2e8f0);
               color: var(--theme-3-text-2, #475569);
               transition: all 0.2s ease;
          }
          .cancel-btn:hover {
               background: var(--bg-2, #f8fafc);
               border-color: var(--theme-3-text-3, #94a3b8);
          }
          .confirm-btn {
               flex: 1;
               background: var(--button-1) !important;
               color: var(--button-text-1) !important;
               border-radius: 0.625rem;
               padding: 0.625rem 1rem;
               font-weight: 600;
               border: none;
               transition: all 0.2s ease;
               box-shadow: 0 2px 8px rgba(99,102,241,0.25);
          }
          .confirm-btn:hover {
               box-shadow: 0 4px 16px rgba(99,102,241,0.35);
               transform: translateY(-1px);
          }
     `]
})
export class ConfirmDialogComponent {
     constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}
