import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams}from '@angular/http';
import {environment} from '../../environments/environment';
//Generic
import {G_Lista}from '../generic/g_lista';

import {Imagen} from '../model/imagen';

import {Observable} from "rxjs";

@Injectable()
export class ImagenService {
    private headers = new Headers({'Content-Type': 'application/json'});

    private Url = environment.Base_Url_Service + '/imagen';  // URL to web api

    constructor(private http: Http) {

    }

    getList(Tipo: number, IdTipo: number): Observable<Imagen[]> {

        let params = new URLSearchParams();

        params.set('Tipo', Tipo.toString());
        params.set('IdTipo', IdTipo.toString());

        return this.http.get(this.Url, {search: params})
            .map(r=> r.json())
            .catch(this.handleError);

    }

    add(Tipo: number, IdTipo: number, files: Array<File>) {

        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            formData.append('Tipo', Tipo);
            formData.append('IdTipo', IdTipo);

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
            xhr.open("POST", this.Url, true);
            xhr.send(formData);
        });
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';
        console.error('An error occurred : ', errMsg);
        return Observable.throw(errMsg);
    }
}
