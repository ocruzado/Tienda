import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//APP - COMPONENT'S
import {AppComponent} from './app.component';


import {DashBoardComponent} from "./dashboard.component";
import {ProductoComponent} from "./producto.component";
import {CategoriaComponent} from "./categoria.component";

// TinyMCE
import {SimpleTinyComponent} from './TinyMCE.component';

//SERVICE
import {ProductoService} from './Services/producto.service';
import {CategoriaService} from "./Services/categoria.service";
import {ImagenService} from "./Services/imagen.service";

import {routing} from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        DashBoardComponent,
        ProductoComponent,
        CategoriaComponent,

        SimpleTinyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,

        NgbModule.forRoot()
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