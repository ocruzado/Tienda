import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions}from '@angular/http';

import {Producto} from '../model/producto';

//import 'rxjs/add/operator/toPromise';
//import 'rxjs/observable';
import {Observable} from "rxjs";

@Injectable()
export class ProductoService {

    private headers = new Headers({'Content-Type': 'application/json'});
    /*private headers = new Headers({
     //'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'POST',
     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
     });
     */
    private Url = 'http://localhost:8000/producto';  // URL to web api


    constructor(private http: Http) {

    }

    /*
     getProductos(): Promise<Producto[]> {

     return this.http.get(this.Url)
     .toPromise()
     .then(r=> r.json() as Producto[])
     .catch(this.handleError);

     }
     */

    getProductos(): Observable<Producto[]> {

        return this.http.get(this.Url)
            .map(r=> r.json())
            //.then(r=> r.json() as Producto[])
            .catch(this.handleError);

    }


    //addProducto(producto: Producto): Observable<Producto> {
    addProducto(producto: Producto): Observable<string> {
        console.log(JSON.stringify(producto));

        let body = JSON.stringify(producto);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let headers = new Headers({'Content-Type': 'application/json'});


        //headers.append('Access-Control-Allow-Origin', '*');

        let options = new RequestOptions({headers: this.headers});


        var respues = this.http.post(this.Url, body, options)
            .map(
                r=> r.text()
            )
            .catch(this.handleError);

        return respues;
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';

        console.error('An error occurred : ', errMsg); // for demo purposes only
        //return Promise.reject(error.message || error);
        return Observable.throw(errMsg);
    }
}
