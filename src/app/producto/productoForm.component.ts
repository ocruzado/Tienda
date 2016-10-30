import {Component, OnInit} from '@angular/core';
// import {Router} from '@angular/router';
import {Producto}from '../model/producto';
import {ProductoService} from "../Services/producto.service";

@Component({
    selector: 'Producto-Form',
    templateUrl: './productoForm.component.html'
})

export class ProductoFormComponent implements OnInit {

    public producto: Producto = new Producto();

    public productos: Producto[] = [];
    public Page: Producto[] = [];

    //constructor(private productoservice: ProductoService) {
    //}

    onSubmit(): void {
        //this.productoservice.addProducto(this.producto)
        //    .subscribe(r=> this.producto.prod_Nombre = r);
    }

    limpiar(): void {
        this.producto = new Producto();
    }

    public PageSize: number = 21;
    public PageNumber: number = 2;
    public TotalItems: number = 200;

    public Paginas: number[] = [];

    get TotalPages(): number {
        return Math.round(this.TotalItems / this.PageSize);
    }

    ngOnInit(): void {

        for (var i = 1; i <= this.TotalPages; i++) {
            this.Paginas.push(i);
        }


        for (var i = 1; i <= 200; i++) {
            let p: Producto = new Producto();

            p.prod_Nombre = 'NOmbre Producto ' + i;
            p.prod_Descripcion = 'NOmbre Producto ' + i;
            p.prod_Precio = i;


            this.productos.push(p);
        }

        this.setPage(2);
        /*this.productoservice.getProductos()
         .subscribe(lista=> this.productos = lista); */

    }

    setPage(PageNumber: number): void {


        if (PageNumber < 1 || PageNumber > this.TotalPages) {
            return;
        }

        this.PageNumber = PageNumber;


        // get pager object from service
        //this.pager = this.pagerService.getPager(this.dummyItems.length, page);

        // get current page of items


        this.Page = this.productos.slice(((this.PageNumber - 1) * this.PageSize), (this.PageNumber * this.PageSize));

    }


}
