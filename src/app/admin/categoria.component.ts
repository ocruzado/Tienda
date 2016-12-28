import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

import {Categoria} from "../model/categoria";
import {CategoriaService} from "../Services/categoria.service";

@Component({
    selector: 'categoria',
    templateUrl: 'categoria.component.html'
})

export class CategoriaComponent implements OnInit {
    private Url: string = environment.Base_Url_Service;  // URL to web api

    categoria: Categoria = new Categoria();

    filt_descripcion: string = "";

    List: Categoria[] = [];

    PageSize: number = 5;
    PageNumber: number = 1;
    TotalItems: number = 0;

    constructor(private categoriaservice: CategoriaService) {
    }

    ngOnInit(): void {
        this.setPage(1);
    }

    setPage(PageNumber: number): void {
        this.PageNumber = PageNumber;

        this.categoriaservice.getList(this.filt_descripcion, this.PageNumber, this.PageSize)
            .subscribe(r=> {
                this.List = r.items;
                this.TotalItems = r.total;

            });
    }

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
