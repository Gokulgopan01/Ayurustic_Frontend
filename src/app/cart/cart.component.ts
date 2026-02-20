import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    cartItems: any[] = [
        {
            id: 1,
            name: 'Organic Indigo Dye Extract',
            price: 1250,
            quantity: 1,
            image: 'assets/indigo.jpeg',
            category: 'Botanical Color',
            showStatus: false,
            currentStatusIndex: 2, // e.g., Shipped
            statuses: ['Carted', 'Ordered', 'Shipped', 'Out for Delivery', 'Delivered']
        },
        {
            id: 2,
            name: 'Premium Turmeric Powder',
            price: 850,
            quantity: 2,
            image: 'assets/turmeric.jpeg',
            category: 'Natural Extract',
            showStatus: false,
            currentStatusIndex: 1, // e.g., Ordered
            statuses: ['Carted', 'Ordered', 'Shipped', 'Out for Delivery', 'Delivered']
        }
    ];

    get cartTotal(): number {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    toggleStatus(item: any): void {
        item.showStatus = !item.showStatus;
    }

    removeFromCart(id: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
    }
}
