import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

import {Categoria} from "./model/categoria";
import {CategoriaService} from "./Services/categoria.service";

@Component({
    selector: 'categoria',
    templateUrl: './categoria.component.html'
})

export class CategoriaComponent implements OnInit {
    private Url: string = environment.Base_Url_Service;  // URL to web api

    categoria: Categoria = new Categoria();

    //INPUT
    filt_descripcion: string = "";

    List: Categoria[] = [];
    //Page: Categoria[] = [];

    //Paginas: number[] = [];

    PageSize: number = 5;
    PageNumber: number = 1;
    TotalItems: number = 0;


    constructor(private categoriaservice: CategoriaService) {
    }


    ngOnInit(): void {
        //this.listar();
        this.setPage(1);
    }

    //PAGINACION - INICIO
    //get TotalPages(): number {
    //    return Math.round((this.TotalItems / this.PageSize) + 1);
    //}

    setPage(PageNumber: number): void {

        //if (PageNumber < 1 || PageNumber > this.TotalPages) {
        //    return;
        //}

        this.PageNumber = PageNumber;

        //this.Page = this.List.slice(((this.PageNumber - 1) * this.PageSize), (this.PageNumber * this.PageSize));

        this.categoriaservice.getList(this.filt_descripcion, this.PageNumber, this.PageSize)
            .subscribe(r=> {
                this.List = r.items;
                this.TotalItems = r.total;

                //for (var i = 1; i <= this.TotalPages; i++) {
                //    this.Paginas.push(i);
                //}

                // this.setPage(1);
            });

    }

    /*
     listar(): void {
     this.Paginas = [];
     this.Page = [];

     this.List = [];
     this.TotalItems = 0;

     this.categoriaservice.getList(this.filt_descripcion)
     .subscribe(r=> {
     this.List = r.items;
     this.TotalItems = r.total;

     for (var i = 1; i <= this.TotalPages; i++) {
     this.Paginas.push(i);
     }

     this.setPage(1);
     });
     }
     */

    //PAGINACION - FIN

    // OPERACIONES - INICIO
    registrar(): void {

        if (this.categoria.cate_IdCategoria == 0) {
            this.categoriaservice.add(this.categoria)
                .subscribe(()=> {
                    this.limpiar();
                    this.setPage(1);
                });
        } else {
            this.categoriaservice.edit(this.categoria)
                .subscribe(()=> {
                    this.limpiar();
                    this.setPage(1);
                });
        }

    }

    editar(id: number): void {
        this.categoriaservice
            .get(id)
            .subscribe(r=> this.categoria = r);
    }

    eliminar(id: number): void {

        this.categoriaservice
            .remove(id)
            .subscribe(r=>this.setPage(1));
    }

    editar_estado(id: number, estado: boolean): void {

        this.categoriaservice
            .edit_estado(id, estado)
            .subscribe(r=>this.setPage(1));
    }

    limpiar(): void {
        this.categoria = new Categoria();
    }

    // OPERACIONES - FIN
}
