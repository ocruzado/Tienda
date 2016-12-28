import {Injectable} from "@angular/core";

//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/delay';

import {Headers, RequestOptions, Http} from "@angular/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";


@Injectable()
export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});

    private Url = environment.Base_Url_Service + '/usuario';  // URL to web api

    constructor(private http: Http) {
    }

    isLoggedIn: boolean = false;
    redirectUrl: string;

    login(usuario: string, clave: string): Observable<boolean> {
        //login(usuario: string, clave: string): Observable<boolean> {
        //return Observable.of(true).delay(1000).do(val=> this.isLoggedIn = true);
        let data = {
            usuario: usuario,
            clave: clave
        }

        console.log(JSON.stringify(data));

        let body = JSON.stringify(data);
        let options = new RequestOptions({headers: this.headers});

        console.log('Ath-Service - 10 - Login : ' + this.isLoggedIn);

        return this.http.post(this.Url + '/login', body, options)
            .map(r=> {
                console.log('Ath-Service - 11 - Login : ' + this.isLoggedIn);
                //this.isLoggedIn = r.json();
                this.isLoggedIn = true;

                localStorage.setItem('token', r.json());

                //this.isLoggedIn = (r.json() == 'true');

                return this.isLoggedIn;
            })
            .catch(this.handleError);

        //return this.isLoggedIn;
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : '';
        console.error('An error occurred : ', errMsg);
        return Observable.throw(errMsg);
    }
}