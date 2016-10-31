import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams}from '@angular/http';
import {environment} from '../../environments/environment';
//Generic
import {G_Lista}from '../generic/g_lista';

import {Producto} from '../model/producto';

import {Observable} from "rxjs";

@Injectable()
export class ProductoService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private Url = environment.Base_Url_Service + '/producto';  // URL to web api

    constructor(private http: Http) {

    }

    getProductos(nombre: string, categoria: string): Observable<G_Lista<Producto>> {

        let params = new URLSearchParams();
        params.set('nombre', nombre);
        params.set('categoria', categoria);

        return this.http.get(this.Url, {search: params})
            .map(r=> r.json())
            .catch(this.handleError);

    }

    editar_estado(id: number, estado: number, usuario: string): Observable<string> {

        let data = {
            id: id,
            estado: estado,
            usuario: usuario
        }

        let body = JSON.stringify(data);
        let options = new RequestOptions({headers: this.headers});

        var respuesta = this.http.post(this.Url + '/editar_estado', body, options)
            .map(r=> r.text())
            .catch(this.handleError);

        return respuesta;
    }

    addProducto(producto: Producto): Observable<string> {
        console.log(JSON.stringify(producto));

        let body = JSON.stringify(producto);
        let options = new RequestOptions({headers: this.headers});

        var respues = this.http.post(this.Url, body, options)
            .map(r=> r.text())
            .catch(this.handleError);

        return respues;
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';
        console.error('An error occurred : ', errMsg);
        return Observable.throw(errMsg);
    }
}
