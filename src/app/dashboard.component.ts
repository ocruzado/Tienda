import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashBoardComponent {
    constructor(private route: Router) {

    }
}