import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//APP - Component's
import {AppComponent} from './app.component';
import {ProductoFormComponent} from './producto/productoForm.component';
import {DashBoardComponent} from "./dashboard.component";
import {ProductoComponent} from "./producto.component";

// TinyMCE
import {SimpleTinyComponent} from './TinyMCE.component';

//Service's
import {ProductoService} from './Services/producto.service';
import {CategoriaService} from "./Services/categoria.service";

import {routing} from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        //ProductoFormComponent,
        DashBoardComponent,
        ProductoComponent,

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
        CategoriaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}