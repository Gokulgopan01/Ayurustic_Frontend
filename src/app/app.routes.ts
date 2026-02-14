import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';

export const routes: Routes = [
    { path: 'discover', component: DiscoverComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];
