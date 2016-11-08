import {Component} from '@angular/core';

@Component({
    selector: 'producto',
    templateUrl: './producto.component.html',
    styles: [`
        .img-close {
            position:absolute;
            bottom:10px;
            right:10px;
            width:100px;
            height:30px;
        } 
    `]
})


export class ProductoComponent {
}