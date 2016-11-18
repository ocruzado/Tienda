import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

import {Categoria}from './model/categoria';
import {Producto} from './model/producto';
import {ProductoService} from "./Services/producto.service";
import {CategoriaService} from "./Services/categoria.service";

import {G_ListaDesplegable} from './generic/g_lista_desplegable';

@Component({
    selector: 'producto',
    templateUrl: './producto.component.html'
    /*styles: [`
     .img-close {
     position:absolute;
     bottom:10px;
     right:10px;
     width:100px;
     height:30px;
     }
     `]*/
})

export class ProductoComponent implements OnInit {
    private Url: string = environment.Base_Url_Service;  // URL to web api

    producto: Producto = new Producto();
    //filesToUpload: Array<File>; //FILE-UPLOAD

    //INPUT
    filt_descripcion: string = "";
    filt_categoria: G_ListaDesplegable = {Id: '0', Descripcion: '-- Seleccione --'};
    categorias: G_ListaDesplegable[] = [];

    List: Producto[] = [];

    PageSize: number = 5;
    PageNumber: number = 1;
    TotalItems: number = 0;

    constructor(private productoservice: ProductoService,
                private categoriaservice: CategoriaService) {
        //this.filesToUpload = []; //FILE-UPLOAD
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

        //if (PageNumber < 1 || PageNumber > this.TotalPages) {
        //    return;
        //}

        this.PageNumber = PageNumber;

        //this.Page = this.List.slice(((this.PageNumber - 1) * this.PageSize), (this.PageNumber * this.PageSize));

        this.productoservice.getList(this.filt_descripcion, this.filt_categoria.Id, this.PageNumber, this.PageSize)
            .subscribe(r=> {
                this.List = r.items;
                this.TotalItems = r.total;

                //for (var i = 1; i <= this.TotalPages; i++) {
                //    this.Paginas.push(i);
                //}

                // this.setPage(1);
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

    //FILE-UPLOAD - Inicio
    /* upload(): void {
     //this.makeFileRequest("http://localhost:8000/upload", [], this.filesToUpload).then((result) => {
     this.makeFileRequest(this.Url + "/upload", [], this.filesToUpload).then((result) => {
     console.log(result);
     }, (error) => {
     console.error(error);
     });
     }

     fileChangeEvent(fileInput: any): void {
     this.filesToUpload = <Array<File>> fileInput.target.files;
     }

     private makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
     return new Promise((resolve, reject) => {
     var formData: any = new FormData();
     var xhr = new XMLHttpRequest();


     let body = JSON.stringify(this.producto);

     formData.append('data', body);

     for (var i = 0; i < files.length; i++) {
     formData.append("ImageFile", files[i], files[i].name);
     }

     xhr.onreadystatechange = function () {
     if (xhr.readyState == 4) {
     if (xhr.status == 200) {
     resolve(JSON.parse(xhr.response));
     } else {
     reject(xhr.response);
     }
     }
     }
     xhr.open("POST", url, true);
     xhr.send(formData);
     });
     }
     */
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