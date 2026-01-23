import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentSlide = 0;
  isScrolled: boolean = false;
  isPhotoVisible: boolean = false;
  showScrollTop: boolean = false;
  isBenefitsVisible: boolean = false;

  // Instagram Carousel
  currentInstagramSlide = 0;
  translateValue = 0;
  totalSlides = 2;

  instagramPhotos = [
    { image: 'assets/photo10.jpg', alt: 'Instagram Post 1' },
    { image: 'assets/photo11.jpg', alt: 'Instagram Post 2' },
    { image: 'assets/photo12.jpg', alt: 'Instagram Post 3' },
    { image: 'assets/photo13.jpg', alt: 'Instagram Post 4' },
    { image: 'assets/photo14.jpg', alt: 'Instagram Post 5' },
    { image: 'assets/photo15.jpg', alt: 'Instagram Post 6' },
    { image: 'assets/photo16.jpg', alt: 'Instagram Post 7' },
    { image: 'assets/photo17.jpg', alt: 'Instagram Post 8' }
  ];
  
  @ViewChild('photoSection') photoSection!: ElementRef;
  @ViewChild('benefitsSection') benefitsSection!: ElementRef;
  
  carouselItems = [
    {
      image: 'assets/photo1.jpg',
      title: 'AYURUSTIC VENTURES',
      subtitle: 'Fine Products',
      description: 'IT\'S A GIFT FOR SOMEONE SPECIAL',
      tagline: 'WE BELIEVE THAT FIBERS GROWN FROM NATURE ARE PERFECT THE WAY'
    },
    {
      image: 'assets/photo2.jpg',
      title: 'LUXURY COLLECTION',
      subtitle: 'Premium Quality',
      description: 'ELEGANCE REDEFINED',
      tagline: 'FROM NATURE\'S LAP TO YOUR HOME'
    },
    {
      image: 'assets/photo3.jpg',
      title: 'ARTISAN CRAFTS',
      subtitle: 'Handmade Excellence',
      description: 'TIMELESS BEAUTY',
      tagline: 'WHERE TRADITION MEETS MODERN DESIGN'
    },
    {
      image: 'assets/photo4.jpg',
      title: 'SILK DREAMS',
      subtitle: 'Pure Comfort',
      description: 'SLEEP IN STYLE',
      tagline: 'NATURAL FIBERS FOR RESTFUL NIGHTS'
    },
    {
      image: 'assets/photo5.jpg',
      title: 'GOLDEN TOUCH',
      subtitle: 'Luxury Defined',
      description: 'PERFECTION IN EVERY DETAIL',
      tagline: 'CRAFTED WITH LOVE AND PRECISION'
    }
  ];

  ngOnInit(): void {
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    // Check visibility on initial load
    setTimeout(() => {
      this.checkPhotoVisibility();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.isScrolled = scrollPosition > 100; // Changed to 100 for navbar hide
    this.showScrollTop = scrollPosition > 500; // Show button after 500px scroll
    this.checkPhotoVisibility();
  }

  checkPhotoVisibility(): void {
    if (this.photoSection) {
      const element = this.photoSection.nativeElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Check if the photo section is in viewport
      const isInViewport = rect.top <= windowHeight && rect.bottom >= 0;
      
      if (isInViewport) {
        this.isPhotoVisible = true;
      }
    }
    
    // Also check benefits section
    if (this.benefitsSection) {
      const element = this.benefitsSection.nativeElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      const isInViewport = rect.top <= windowHeight * 0.8 && rect.bottom >= 0;
      
      if (isInViewport) {
        this.isBenefitsVisible = true;
      }
    }
}


  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  startCarousel(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  shopNow(): void {
    console.log('Shop Now clicked');
    // Add your navigation logic here
  }

  // Instagram Carousel Methods
   prevInstagram(): void {
    if (this.currentInstagramSlide === 0) {
      this.currentInstagramSlide = this.totalSlides - 1; // Go to last slide
    } else {
      this.currentInstagramSlide--;
    }
    this.translateValue = this.currentInstagramSlide * -50; // Each slide is 50% of total width
  }
  
  nextInstagram(): void {
    if (this.currentInstagramSlide === this.totalSlides - 1) {
      this.currentInstagramSlide = 0; // Go to first slide
    } else {
      this.currentInstagramSlide++;
    }
    this.translateValue = this.currentInstagramSlide * -50; // Each slide is 50% of total width
  }
  
  
  goToInstagramSlide(index: number): void {
    this.currentInstagramSlide = index;
    this.translateValue = index * -100;
  }
}