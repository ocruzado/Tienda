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

    public PageSize: number = 10;
    public PageNumber: number = 1;
    public TotalItems: number = 0;

    public Paginas: number[] = [];

    get TotalPages(): number {
        return Math.round(this.TotalItems / this.PageSize);
    }

    ngOnInit(): void {

        this.listar();

        this.categoriaservice.getCategorias()
            .subscribe(r=> {
                this.categorias = r;
            });

    }

    setPage(PageNumber: number): void {

        if (PageNumber < 1 || PageNumber > this.TotalPages) {
            return;
        }

        this.PageNumber = PageNumber;

        this.Page = this.productos.slice(((this.PageNumber - 1) * this.PageSize), (this.PageNumber * this.PageSize));

    }

    listar(): void {
        this.Paginas = [];
        this.Page = [];

        this.productos = [];
        this.TotalItems = 0;

        this.productoservice.getProductos(this.filt_descripcion, this.filt_categoria.cate_IdCategoria.toString())
            .subscribe(r=> {
                this.productos = r.items;
                this.TotalItems = r.total;

                for (var i = 1; i <= this.TotalPages; i++) {
                    this.Paginas.push(i);
                }

                this.setPage(1);
            });
    }

    editar(id: number): void {

        this.producto = this.Page[id];

    }

    editar_estado(id: number, estado: number): void {

        let usuario = 'usuario';

        this.productoservice.editar_estado(id, estado, usuario).subscribe(
            r=>
                this.listar()
        );


    }


}
