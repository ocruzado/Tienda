import {Component, OnInit} from '@angular/core';
// import {Router} from '@angular/router';


//Model
import {Categoria}from '../model/categoria';
import {Producto}from '../model/producto';

//Service's
import {ProductoService} from "../Services/producto.service";
import {CategoriaService} from "../Services/categoria.service";

@Component({
    selector: 'Producto-Form',
    templateUrl: './productoForm.component.html'
})

export class ProductoFormComponent implements OnInit {

    public filt_descripcion: string = "";
    public filt_categoria: Categoria = new Categoria();
    public categorias: Categoria[] = [];

    public producto: Producto = new Producto();
    public productos: Producto[] = [];
    public Page: Producto[] = [];

    constructor(private productoservice: ProductoService,
                private categoriaservice: CategoriaService) {
    }

    onSubmit(): void {
        this.productoservice.addProducto(this.producto)
            .subscribe(r=> this.producto.prod_Nombre = r);
    }

    limpiar(): void {
        this.producto = new Producto();
    }

    public PageSize: number = 5;
    public PageNumber: number = 1;
    public TotalItems: number = 200;

    public Paginas: number[] = [];

    get TotalPages(): number {
        return Math.round(this.TotalItems / this.PageSize);
    }

    ngOnInit(): void {

        this.productoservice.getProductos('%', '0')
            .subscribe(r=> {
                this.productos = r.items;
                this.TotalItems = r.total;

                for (var i = 1; i <= this.TotalPages; i++) {
                    this.Paginas.push(i);
                }

                this.setPage(1);
            });

        this.categoriaservice.getCategorias()
            .subscribe(r=> {
                this.categorias = r;
            });



        /* for (var i = 1; i <= this.TotalPages; i++) {
         this.Paginas.push(i);
         }

         for (var i = 1; i <= 200; i++) {
         let p: Producto = new Producto();

         p.prod_IdProducto = i;
         p.prod_Nombre = 'Nombre Producto ' + i;
         p.prod_Descripcion = 'Descripcion Producto ' + i;
         p.prod_Precio = i;

         this.productos.push(p);
         }

         for (var i = 1; i <= 10; i++) {
         let c: Categoria = new Categoria();

         c.cate_IdCategoria = i;
         c.cate_Nombre = 'Nombre Categoria ' + i;
         c.cate_Descripcion = 'Descripcion Categoria ' + i;

         this.categorias.push(c);
         }

         this.setPage(2);*/


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
