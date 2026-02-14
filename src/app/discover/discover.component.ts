import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // IMPORT RouterModule

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, RouterModule], // ADD RouterModule to imports
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent implements AfterViewInit {
  isMenuOpen = false;
  isDesktop = window.innerWidth >= 1024;

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 1024;
    
    // Auto-close menu when switching to desktop
    if (this.isDesktop) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  // Close menu when clicking escape key
  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.closeMenu();
  }

  ngAfterViewInit() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -8% 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  openMenu(): void {
    this.isMenuOpen = true;
    // Prevent body scrolling when menu is open
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    // Restore body scrolling
    document.body.style.overflow = '';
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const wrapper = img.parentElement;
    if (wrapper) {
      const fallback = wrapper.querySelector('.fallback-card') as HTMLElement;
      if (fallback) fallback.style.display = 'flex';
    }
  }
}