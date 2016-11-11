import {Component} from '@angular/core';
import {Producto} from "./model/producto";

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

    producto:Producto = new Producto();


    //SECCION TAG'S - INICIO
    private tags:ITag[] = [];

    set s_Tag(tag:string) {
        this.tags = tag.split(';').filter(x => x != '').map(function (x, index) {
            return {
                id: index,
                tag: x
            }
        });
    }

    get g_Tag() {
        return this.tags.map(function (x) {
            return x.tag.trim();
        }).join(';');
    }

    private AgregarTag(tag:string):void {
        let i = this.tags.length;
        this.tags.push({id: i, tag: tag.trim()});
    }

    private EliminarTag(index:number) {
        this.tags = this.tags.filter(e => e.id != index);
    }
    //SECCION TAG'S - FIN
}

interface ITag {
    id:number;
    tag:string;
}