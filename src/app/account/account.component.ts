import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    ngOnInit(): void {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
    user = {
        name: 'Guest User',
        email: '',
        joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    };
}
