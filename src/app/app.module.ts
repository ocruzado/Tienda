import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//APP - COMPONENT'S
import {AppComponent} from './app.component';

import {DashBoardComponent} from "./dashboard.component";
//import {ProductoComponent} from "./admin/producto.component";
//import {CategoriaComponent} from "./admin/categoria.component";

// TinyMCE
//import {SimpleTinyComponent} from './TinyMCE.component';

//SERVICE
import {ProductoService} from './Services/producto.service';
import {CategoriaService} from "./Services/categoria.service";
import {ImagenService} from "./Services/imagen.service";

import {routing} from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//ROUTING
//import {AdminRoutingModule} from "./admin/admin.routing";
import {AdminModule} from "./admin/admin.module";
import {PageNotFoundComponent} from "./pagenotfound.component";
import {TinyMCEModule} from "./TinyMCE.module";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";

@NgModule({
    declarations: [
        AppComponent,
        DashBoardComponent,
        //ProductoComponent,
        //CategoriaComponent,
        LoginComponent,
        //AdminComponent,
        PageNotFoundComponent
        //SimpleTinyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,

        NgbModule.forRoot(),
        AdminModule,
        LoginRoutingModule,

        TinyMCEModule
    ],
    providers: [
        ProductoService,
        CategoriaService,
        ImagenService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}