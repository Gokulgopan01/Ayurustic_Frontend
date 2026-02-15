import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
    trigger, state, style, transition, animate, query, stagger
} from '@angular/animations';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    badge?: string;
    rating: number;
    reviews: number;
    colors: string[];
    inStock: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    animations: [
        trigger('cardEntrance', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(40px)' }),
                animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('listAnimation', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0, transform: 'translateY(40px)' }),
                    stagger(80, [
                        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ]),
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.3s ease-out', style({ opacity: 1 }))
            ])
        ]),
        trigger('slideUp', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('cartPop', [
            transition(':enter', [
                style({ transform: 'scale(0)' }),
                animate('0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    style({ transform: 'scale(1)' }))
            ])
        ])
    ]
})
export class ShopComponent {
    constructor(private router: Router) { }

    isMenuOpen = false;
    isDesktop = window.innerWidth >= 1024;

    // Filter & Sort state
    selectedCategory = 'All';
    sortOption = 'default';
    searchQuery = '';
    priceRange = 15000;
    showFilters = false;
    viewMode: 'grid' | 'list' = 'grid';

    // Cart
    cart: CartItem[] = [];
    isCartOpen = false;
    cartNotification = '';

    // Quick view
    quickViewProduct: Product | null = null;

    categories = ['All', 'Sarees', 'Scarves', 'Stoles', 'Fabrics'];

    products: Product[] = [
        {
            id: 1,
            name: 'Indigo Dyed Mulberry Silk Saree',
            description: 'Handcrafted 100% mulberry silk saree dyed with natural indigo. Deep blue tones with subtle variations that make each piece unique.',
            price: 12500,
            originalPrice: 15000,
            image: 'assets/indigo.jpeg',
            category: 'Sarees',
            badge: 'Bestseller',
            rating: 4.8,
            reviews: 124,
            colors: ['#4B0082', '#1a237e', '#283593'],
            inStock: true
        },
        {
            id: 2,
            name: 'Turmeric Gold Silk Scarf',
            description: 'Luxurious silk scarf infused with turmeric-based botanical dyes. Warm golden hues that glow beautifully in natural light.',
            price: 4500,
            originalPrice: 5500,
            image: 'assets/turmeric.jpeg',
            category: 'Scarves',
            badge: 'New',
            rating: 4.6,
            reviews: 87,
            colors: ['#DAA520', '#B8860B', '#D2691E'],
            inStock: true
        },
        {
            id: 3,
            name: 'Lavender Dreams Silk Stole',
            description: 'Delicate mulberry silk stole dyed with lavender botanicals. Soft lilac tones create a calming, elegant accessory.',
            price: 3800,
            originalPrice: 4200,
            image: 'assets/Lavender.jpeg',
            category: 'Stoles',
            rating: 4.7,
            reviews: 56,
            colors: ['#967BB6', '#9370DB', '#8B668B'],
            inStock: true
        },
        {
            id: 4,
            name: 'Vetiver Earth Silk Saree',
            description: 'Earthy, grounded tones achieved through vetiver root dyeing on pure mulberry silk. A tribute to traditional craftsmanship.',
            price: 11800,
            originalPrice: 14000,
            image: 'assets/Vettiver.jpeg',
            category: 'Sarees',
            badge: 'Limited Edition',
            rating: 4.9,
            reviews: 42,
            colors: ['#8B4513', '#A0522D', '#6B4226'],
            inStock: true
        },
        {
            id: 5,
            name: 'Red Sandalwood Silk Fabric',
            description: 'Premium unstitched silk fabric dyed with red sandalwood. Rich terracotta and rose tones for bespoke creations.',
            price: 8500,
            originalPrice: 10000,
            image: 'assets/Red_Sandalwood.jpeg',
            category: 'Fabrics',
            rating: 4.5,
            reviews: 33,
            colors: ['#B22222', '#CD5C5C', '#A52A2A'],
            inStock: true
        },
        {
            id: 6,
            name: 'Tulsi Green Silk Scarf',
            description: 'Spiritually inspired silk scarf dyed with tulsi (holy basil). Soft greenish-brown hues reflect harmony and mindfulness.',
            price: 4200,
            originalPrice: 5000,
            image: 'assets/Thulsi.jpeg',
            category: 'Scarves',
            badge: 'Eco Choice',
            rating: 4.4,
            reviews: 68,
            colors: ['#228B22', '#2E8B57', '#3CB371'],
            inStock: true
        },
        {
            id: 7,
            name: 'Neem Botanical Silk Stole',
            description: 'Minimalist elegance in a neem-dyed silk stole. Pale green and beige tones for a clean, understated look.',
            price: 3500,
            originalPrice: 3500,
            image: 'assets/neem.jpeg',
            category: 'Stoles',
            rating: 4.3,
            reviews: 29,
            colors: ['#CFE3C1', '#A8D5A2', '#8FBC8F'],
            inStock: false
        }
    ];

    @HostListener('window:resize')
    onResize() {
        this.isDesktop = window.innerWidth >= 1024;
    }

    get filteredProducts(): Product[] {
        let filtered = [...this.products];

        // Category filter
        if (this.selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === this.selectedCategory);
        }

        // Search filter
        if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // Price filter
        filtered = filtered.filter(p => p.price <= this.priceRange);

        // Sorting
        switch (this.sortOption) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
        }

        return filtered;
    }

    get cartTotal(): number {
        return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }

    get cartItemCount(): number {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    selectCategory(category: string): void {
        this.selectedCategory = category;
    }

    getDiscount(product: Product): number {
        if (product.originalPrice <= product.price) return 0;
        return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }

    getStars(rating: number): number[] {
        return Array(Math.floor(rating)).fill(0);
    }

    addToCart(product: Product): void {
        const existing = this.cart.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({ product, quantity: 1 });
        }
        this.cartNotification = `${product.name} added to cart!`;
        setTimeout(() => this.cartNotification = '', 3000);
    }

    removeFromCart(productId: number): void {
        this.cart = this.cart.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId: number, delta: number): void {
        const item = this.cart.find(i => i.product.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            }
        }
    }

    toggleCart(): void {
        this.isCartOpen = !this.isCartOpen;
    }

    openQuickView(product: Product): void {
        this.quickViewProduct = product;
    }

    closeQuickView(): void {
        this.quickViewProduct = null;
    }

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }

    clearFilters(): void {
        this.selectedCategory = 'All';
        this.sortOption = 'default';
        this.searchQuery = '';
        this.priceRange = 15000;
    }

    openMenu(): void {
        this.isMenuOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeMenu(): void {
        this.isMenuOpen = false;
        document.body.style.overflow = '';
    }

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.closeMenu();
        this.closeQuickView();
        this.isCartOpen = false;
    }
}
