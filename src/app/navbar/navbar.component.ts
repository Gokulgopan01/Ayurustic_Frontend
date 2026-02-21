import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    isMenuOpen = false;
    isDesktop = window.innerWidth >= 1024;
    isScrolled = false;

    @HostListener('window:resize')
    onResize() {
        this.isDesktop = window.innerWidth >= 1024;
        if (this.isDesktop && this.isMenuOpen) {
            this.isMenuOpen = false;
        }
    }

    @HostListener('window:scroll')
    onScroll() {
        this.isScrolled = window.scrollY > 20;
    }

    ngOnInit(): void { }

    openMenu() {
        this.isMenuOpen = true;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
}
