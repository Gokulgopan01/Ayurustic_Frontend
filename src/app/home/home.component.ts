import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentSlide = 0;
  // isScrolled removed
  isPhotoVisible: boolean = false;
  showScrollTop: boolean = false; // Kept if you have a scroll-to-top button
  isBenefitsVisible: boolean = false;
  currentInstagramSlide = 0;
  isMenuOpen: boolean = false;
  translateValue = 0;
  isDesktop = window.innerWidth >= 1024;
  // isNavbarHidden & lastScrollTop removed

  @ViewChild('photoSection') photoSection!: ElementRef;
  @ViewChild('benefitsSection') benefitsSection!: ElementRef;

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 1024;
  }

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

  // Gallery carousel properties - ADDED
  // In your component class, update the galleryItems array:

  galleryItems = [
    {
      image: 'assets/Lavender.jpeg',
      alt: 'Lavender',
      title: 'Lavender',
      titleColor: '#967BB6',
      scientificName: 'Lavandula Angustifolia',
      colorContribution: 'Very soft lilac, pale grey-purple',
      description:
        'Lavender is admired for its gentle nature and refined presence. In Ayurvastra textiles, it contributes subtle tones and a sense of calm elegance. Its inclusion reflects a thoughtful approach to creating fabrics that feel soothing and refined.'
    },
    {
      image: 'assets/indigo.jpeg',
      alt: 'Indigo',
      title: 'Indigo',
      titleColor: '#4B0082',
      scientificName: 'Indigofera tinctoria',
      colorContribution: 'Deep blue, indigo, midnight tones',
      description:
        'Indigo is one of the most revered natural dyes in textile history. Extracted from fermented leaves, it produces rich blue shades with remarkable depth and character. Indigo-based Ayurvastra fabrics carry a timeless quality, connecting ancient dyeing traditions with contemporary elegance.'
    },
    {
      image: 'assets/turmeric.jpeg',
      alt: 'Turmeric',
      title: 'Turmeric',
      titleColor: '#DAA520',
      scientificName: 'Curcuma longa',
      colorContribution: 'Golden yellow, warm mustard',
      description:
        'Turmeric has been used for generations as a natural source of vibrant yellow dye. Its warm, luminous tones bring brightness and vitality to fabric, while symbolizing purity and auspiciousness in traditional practices. In Ayurvastra, turmeric reflects a celebration of natural colour without synthetic intervention.'
    },
    {
      image: 'assets/Vettiver.jpeg',
      alt: 'Vettiver',
      title: 'Vettiver',
      titleColor: '#8B4513',
      scientificName: 'Chrysopogon zizanioides',
      colorContribution: 'Soft beige, light brown, earthy neutral tones',
      description:
        'Vetiver roots have been traditionally valued in natural textile practices for their grounding, earthy qualities. In Ayurvastra-inspired dyeing, vetiver contributes subtle, understated shades that reflect nature’s calm palette. Its use represents balance, simplicity, and the quiet elegance of heritage craftsmanship.'
    },
    {
      image: 'assets/Thulsi.jpeg',
      alt: 'Tulsi',
      title: 'Tulsi',
      titleColor: '#228B22',
      scientificName: 'Ocimum tenuiflorum',
      colorContribution: 'Soft greenish, muted brown hues',
      description:
        'Tulsi holds deep cultural significance in traditional Indian life. In textile use, it contributes gentle, natural tones and represents harmony and mindfulness. Its inclusion in Ayurvastra reflects respect for plants that have long been woven into everyday rituals and traditions.'
    },
    {
      image: 'assets/Ashoka.jpeg',
      alt: 'Ashoka',
      title: 'Ashoka',
      titleColor: '#D2691E',
      scientificName: 'Saraca asoca',
      colorContribution: 'Warm brown, soft reddish-brown',
      description:
        'Ashoka bark has historically been used in natural dyeing to create warm, grounding shades. Its tones evoke earth and wood, adding depth and richness to fabric. Ashoka represents resilience and continuity within ancient botanical knowledge.'
    },
    {
      image: 'assets/Red_Sandalwood.jpeg',
      alt: 'Red Sandalwood',
      title: 'Red Sandalwood',
      titleColor: '#B22222',
      scientificName: 'Pterocarpus santalinus',
      colorContribution: 'Muted red, rose, terracotta tones',
      description:
        'Red sandalwood has long been valued for its ability to impart warm reddish hues to textiles. The resulting shades are soft yet distinctive, adding richness and sophistication while honoring classical natural dye traditions.'
    },
    {
      image: 'assets/Lekshmi_Tharu.jpeg',
      alt: 'Lekshmi Tharu',
      title: 'Lekshmi Tharu',
      titleColor: '#BDB76B',
      scientificName: 'Regionally identified botanical',
      colorContribution: 'Soft beige, warm brown, muted gold',
      description:
        'Lekshmi Tharu is a locally recognized botanical used in traditional dyeing practices. It contributes gentle, natural hues and reflects the richness of regional plant knowledge and handcrafted textile heritage.'
    }
  ];

  currentGallerySlide = 0;
  galleryTranslateValue = 0;
  expandedDescriptions: boolean[] = new Array(this.galleryItems.length).fill(false);
  private galleryInterval: any;
  private mainCarouselInterval: any;

  ngOnInit(): void {
    this.startCarousel();
    this.startGalleryCarousel(); // ADDED
  }

  ngAfterViewInit(): void {
    // Check visibility on initial load
    setTimeout(() => {
      this.checkPhotoVisibility();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up intervals when component is destroyed
    if (this.mainCarouselInterval) {
      clearInterval(this.mainCarouselInterval);
    }
    if (this.galleryInterval) {
      clearInterval(this.galleryInterval);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Scroll logic removed for absolute navbar
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
    this.mainCarouselInterval = setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  // Gallery Carousel Methods - ADDED
  startGalleryCarousel(): void {
    this.galleryInterval = setInterval(() => {
      this.nextGallerySlide();
    }, 7000);
  }

  nextGallerySlide(): void {
    this.currentGallerySlide = (this.currentGallerySlide + 1) % this.galleryItems.length;
    this.updateGalleryTranslateValue();
  }

  toggleDescription(index: number, event: Event): void {
    event.stopPropagation(); // Prevent event bubbling
    this.expandedDescriptions[index] = !this.expandedDescriptions[index];
  }

  prevGallerySlide(): void {
    this.currentGallerySlide = (this.currentGallerySlide - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.updateGalleryTranslateValue();
  }

  goToGallerySlide(index: number): void {
    this.currentGallerySlide = index;
    this.updateGalleryTranslateValue();
  }

  updateGalleryTranslateValue(): void {
    // Calculate translate value based on current slide
    this.galleryTranslateValue = -this.currentGallerySlide * 100;

    // Restart the interval for continuous autoplay
    this.restartGalleryInterval();
  }

  restartGalleryInterval(): void {
    if (this.galleryInterval) {
      clearInterval(this.galleryInterval);
    }
    this.galleryInterval = setInterval(() => {
      this.nextGallerySlide();
    }, 7000);
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
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
}