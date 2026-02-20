import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
    wishlistItems: any[] = [
        {
            id: 1,
            name: 'Organic Indigo Dye Extract',
            price: 1250,
            image: 'assets/indigo.jpeg',
            category: 'Botanical Color',
            inStock: true
        },
        {
            id: 2,
            name: 'Premium Turmeric Powder',
            price: 850,
            image: 'assets/turmeric.jpeg',
            category: 'Natural Extract',
            inStock: true
        },
        {
            id: 3,
            name: 'Pure Sandalwood Essential Oil',
            price: 2400,
            image: 'assets/sandalwood.jpeg',
            category: 'Aromatherapy',
            inStock: false
        }
    ];

    removeFromWishlist(id: number): void {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
    }

    moveToCart(item: any): void {
        console.log('Moving to cart:', item);
        // Logical implementation would be to call a CartService
        this.removeFromWishlist(item.id);
    }
}
