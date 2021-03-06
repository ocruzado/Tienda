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

    getList(nombre: string, categoria: string, PageNumber: number, PageSize: number): Observable<G_Lista<Producto>> {

        let params = new URLSearchParams();
        params.set('nombre', nombre);
        params.set('categoria', categoria);

        params.set('PageNumber', PageNumber.toString());
        params.set('PageSize', PageSize.toString());

        return this.http.get(this.Url, {search: params})
            .map(r=> r.json())
            .catch(this.handleError);

    }

    get(id: number): Observable<Producto> {

        let params = new URLSearchParams();
        params.set('id', id.toString());

        return this.http.get(this.Url + '/get', {search: params})
            .map(r=> r.json())
            .catch(this.handleError);
    }

    add(producto: Producto): Observable<string> {
        console.log(JSON.stringify(producto));

        let body = JSON.stringify(producto);
        let options = new RequestOptions({headers: this.headers});

        var respues = this.http.post(this.Url, body, options)
            .map(r=> r.text())
            .catch(this.handleError);

        return respues;
    }

    edit(producto: Producto): Observable<string> {

        let body = JSON.stringify(producto);
        let options = new RequestOptions({headers: this.headers});

        return this.http.post(this.Url + '/edit', body, options)
            .map(r=> r.text())
            .catch(this.handleError);
    }

    remove(id: number): Observable<string> {

        let data = {
            id: id
        }

        let body = JSON.stringify(data);
        let options = new RequestOptions({headers: this.headers});

        return this.http.post(this.Url + '/remove', body, options)
            .map(r=> r.text())
            .catch(this.handleError);
    }

    edit_estado(id: number, estado: boolean): Observable<string> {

        let data = {
            id: id,
            estado: estado
        }

        let body = JSON.stringify(data);
        let options = new RequestOptions({headers: this.headers});

        return this.http.post(this.Url + '/state', body, options)
            .map(r=> r.text())
            .catch(this.handleError);
    }

    edit_html(producto: Producto): Observable<string> {

        let body = JSON.stringify(producto);
        let options = new RequestOptions({headers: this.headers});

        return this.http.post(this.Url + '/edit_html', body, options)
            .map(r=> r.text())
            .catch(this.handleError);
    }

    /*
     add_file(producto: Producto, files: Array<File>) {

     //let body = JSON.stringify(producto);
     //let options = new RequestOptions({headers: this.headers});

     / *return this.http.post(this.Url + '/edit_html', body, options)
     .map(r=> r.text())
     .catch(this.handleError);
     * /

     return new Promise((resolve, reject) => {
     var formData: any = new FormData();
     var xhr = new XMLHttpRequest();


     //let body = JSON.stringify(this.producto);

     formData.append('prod_IdProducto', producto.prod_IdProducto);

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
     xhr.open("POST", this.Url + '/upload_file', true);
     xhr.send(formData);
     });
     }
     */


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';
        console.error('An error occurred : ', errMsg);
        return Observable.throw(errMsg);
    }
}
