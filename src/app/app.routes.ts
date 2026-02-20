import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { ShopComponent } from './shop/shop.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    { path: 'discover', component: DiscoverComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: AccountComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];
