import {Injectable} from '@angular/core';
import {Headers, Http}from '@angular/http';
import {environment} from '../../environments/environment';

import {Categoria} from '../model/categoria';

import {Observable} from "rxjs";

@Injectable()
export class CategoriaService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private Url = environment.Base_Url_Service + '/categoria';  // URL to web api

    constructor(private http: Http) {

    }

    getCategorias(): Observable<Categoria[]> {

        return this.http.get(this.Url)
            .map(r=> r.json())
            .catch(this.handleError);

    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';

        console.error('An error occurred : ', errMsg);

        return Observable.throw(errMsg);
    }
}
