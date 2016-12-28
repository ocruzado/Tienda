import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    message: string;

    usuario: string = 'Usuario_01';
    clave: string = 'clave_01';

    constructor(public authService: AuthService, public router: Router) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ....';

        console.log('LoginComponent- 20 - Login ' + this.authService.isLoggedIn);

        this.authService.login(this.usuario, this.clave).subscribe(()=> {
            this.setMessage();

            console.log('LoginComponent- 21 - Login : ' + this.authService.isLoggedIn);
            if (this.authService.isLoggedIn) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/producto';

                this.router.navigate([redirect]);
            }
        });
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}