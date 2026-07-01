import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

export const INDIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'dateInput',
  },
  display: {
    dateInput: 'dateInput',
    monthYearLabel: 'monthYearLabel',
    dateA11yLabel: 'dateA11yLabel',
    monthYearA11yLabel: 'monthYearA11yLabel',
  },
};

@Injectable()
export class IndianDateAdapter extends NativeDateAdapter {
  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
    platform: Platform
  ) {
    super(matDateLocale, platform);
  }

  override parse(value: unknown): Date | null {
    if (value instanceof Date) {
      return this.isValid(value) ? value : null;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) return null;

      const match = trimmed.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
      if (match) {
        const day = Number(match[1]);
        const month = Number(match[2]) - 1;
        const year = Number(match[3]);
        const parsed = new Date(year, month, day);

        if (
          parsed.getFullYear() === year &&
          parsed.getMonth() === month &&
          parsed.getDate() === day
        ) {
          return parsed;
        }

        return null;
      }
    }

    const timestamp = typeof value === 'number' ? value : Date.parse(String(value));
    const date = new Date(timestamp);
    return this.isValid(date) ? date : null;
  }

  override format(date: Date, displayFormat: unknown): string {
    if (!this.isValid(date)) {
      throw Error('IndianDateAdapter: Cannot format invalid date.');
    }

    if (displayFormat === 'monthYearLabel') {
      return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    }

    if (displayFormat === 'monthYearA11yLabel') {
      return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
