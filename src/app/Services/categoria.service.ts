import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams}from '@angular/http';
import {environment} from '../../environments/environment';
//Generic
import {G_Lista}from '../generic/g_lista';
import {G_ListaDesplegable}from '../generic/g_lista_desplegable';

import {Categoria} from '../model/categoria';

import {Observable} from "rxjs";

@Injectable()
export class CategoriaService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private Url = environment.Base_Url_Service + '/categoria';  // URL to web api

    constructor(private http: Http) {
    }

    getList(nombre: string, PageNumber: number, PageSize: number): Observable<G_Lista<Categoria>> {

        let params = new URLSearchParams();
        params.set('nombre', nombre);

        params.set('PageNumber', PageNumber.toString());
        params.set('PageSize', PageSize.toString());

       // this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

        /*
        let headers3 = new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let options = new RequestOptions({headers: headers3, search: params});
        */

        let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token')});
        let options = new RequestOptions({ headers: headers, search: params });

        //return this.http.get(this.Url, {search: params})
        return this.http.get(this.Url, options)
            .map(r=> r.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<Categoria> {

        let params = new URLSearchParams();
        params.set('id', id.toString());

        return this.http.get(this.Url + '/get', {search: params})
            .map(r=> r.json())
            .catch(this.handleError);
    }

    add(categoria: Categoria): Observable<string> {
        console.log(JSON.stringify(categoria));

        let body = JSON.stringify(categoria);
        let options = new RequestOptions({headers: this.headers});

        var respues = this.http.post(this.Url, body, options)
            .map(r=> r.text())
            .catch(this.handleError);

        return respues;
    }

    edit(categoria: Categoria): Observable<string> {

        let body = JSON.stringify(categoria);
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


    getCategoria(): Observable<G_ListaDesplegable[]> {


        //let headers = new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')});
        //let options = new RequestOptions({headers: headers});


        //this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        //let options = new RequestOptions({headers: this.headers});

        return this.http.get(this.Url + '/getCategoria')
            .map(r=> r.json())
            .catch(this.handleError);


        /*return this.http.get(this.Url + '/getCategoria')
         .map(r=> r.json())
         .catch(this.handleError);*/
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';
        console.error('An error occurred : ', errMsg);
        return Observable.throw(errMsg);
    }
}

