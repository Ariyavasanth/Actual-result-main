import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  showBackToTop = false;

  private mainScroll: HTMLElement | null = null;
  private scrollHandler = this.onScroll.bind(this);

  ngOnInit(): void {
    this.mainScroll = document.querySelector('.main-scroll');
    this.mainScroll?.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    this.mainScroll?.removeEventListener('scroll', this.scrollHandler);
  }

  private onScroll(): void {
    this.showBackToTop = (this.mainScroll?.scrollTop ?? 0) > 400;
  }

  scrollToTop(): void {
    this.mainScroll?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.mobileMenuOpen = false;
    }
  }
}
