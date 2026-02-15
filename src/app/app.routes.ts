import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
    { path: 'discover', component: DiscoverComponent },
    { path: 'shop', component: ShopComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];
