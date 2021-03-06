import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

//import {Categoria}from './model/categoria';
import {Producto} from '../model/producto';
import {Imagen} from '../model/imagen';

import {ProductoService} from "../Services/producto.service";
import {CategoriaService} from "../Services/categoria.service";
import {ImagenService} from "../Services/imagen.service";

import {G_ListaDesplegable} from '../generic/g_lista_desplegable';
import {TipoImagen} from '../enum/enum';

@Component({
    selector: 'producto',
    templateUrl: 'producto.component.html'
})

export class ProductoComponent implements OnInit {
    private Url: string = environment.Base_Url_Service;  // URL to web api
    private Base_Url_PublicFolder: string = environment.Base_Url_PublicFolder;  // URL to web api

    producto: Producto = new Producto();
    filesToUpload: Array<File>; //FILE-UPLOAD

    //INPUT
    filt_descripcion: string = "";
    filt_categoria: G_ListaDesplegable = {Id: '0', Descripcion: '-- Seleccione --'};
    categorias: G_ListaDesplegable[] = [];

    List: Producto[] = [];

    PageSize: number = 5;
    PageNumber: number = 1;
    TotalItems: number = 0;

    List_Imagenes: Imagen[] = [];

    constructor(private productoservice: ProductoService,
                private categoriaservice: CategoriaService,
                private imagenservice: ImagenService) {
        this.filesToUpload = []; //FILE-UPLOAD
    }

    ngOnInit(): void {

        this.categoriaservice.getCategoria()
            .subscribe(r=> {
                this.categorias = r;
                this.categorias.unshift({Id: '0', Descripcion: '-- Seleccione --'});

                this.setPage(1);
            });
    }

    setPage(PageNumber: number): void {

        this.PageNumber = PageNumber;

        this.productoservice.getList(this.filt_descripcion, this.filt_categoria.Id, this.PageNumber, this.PageSize)
            .subscribe(r=> {
                this.List = r.items;
                this.TotalItems = r.total;
            });
    }

    // OPERACIONES - INICIO
    registro(): void {

        this.producto.prod_Tags = this.g_Tag;

        if (this.producto.prod_IdProducto == 0) {
            this.productoservice.add(this.producto)
                .subscribe(()=> {
                    this.limpiar();
                    this.setPage(1);
                });
        } else {
            this.productoservice.edit(this.producto)
                .subscribe(()=> {
                    this.limpiar();
                    this.setPage(1);
                });
        }
    }

    editar(id: number): void {
        this.productoservice
            .get(id)
            .subscribe(r=> {
                this.producto = r;
                this.s_Tag = r.prod_Tags;
            });
    }

    eliminar(id: number): void {

        this.productoservice
            .remove(id)
            .subscribe(r=>this.setPage(1));
    }

    editar_estado(id: number, estado: boolean): void {

        this.productoservice
            .edit_estado(id, estado)
            .subscribe(r=>this.setPage(1));
    }

    limpiar(): void {
        this.tags = [];
        this.producto = new Producto();
    }
    // OPERACIONES - FIN

    // HTML_EDITOR - INICIO
    getHtmlContent(e): void {
        this.producto.prod_Detalle = e;
    }

    editar_Detalle(id: number): void {

        this.productoservice
            .get(id)
            .subscribe(r=> {
                this.producto.prod_IdProducto = r.prod_IdProducto;
                this.producto.prod_Detalle = r.prod_Detalle;
            });

        this.imagenservice.getList(TipoImagen.Producto, id)
            .subscribe(r=> {
                this.List_Imagenes = r;
            })
    }

    registro_Detalle(): void {
        this.productoservice.edit_html(this.producto)
            .subscribe(()=> {
                this.limpiar();
                this.setPage(1);
            });

    }

    limpiar_html(): void {
        this.tags = [];
        this.producto = new Producto();
    }
    // HTML_EDITOR - FIN

    //FILE-UPLOAD - Inicio
    add_file(): void {
        if (this.producto.prod_IdProducto != 0) {
            this.imagenservice.add(TipoImagen.Producto, this.producto.prod_IdProducto, this.filesToUpload);
        }
    }

    fileChangeEvent(fileInput: any): void {
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
    //FILE-UPLOAD - Fin

    //SECCION TAG'S - INICIO
    private tags: ITag[] = [];

    set s_Tag(tag: string) {
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

    private AgregarTag(tag: string): void {
        let i = this.tags.length;
        this.tags.push({id: i, tag: tag.trim()});
    }

    private EliminarTag(index: number) {
        this.tags = this.tags.filter(e => e.id != index);
    }
    //SECCION TAG'S - FIN
}

interface ITag {
    id: number;
    tag: string;
}