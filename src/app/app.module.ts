import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//APP - Component's
import {AppComponent} from './app.component';
import {ProductoFormComponent} from './producto/productoForm.component';
import {DashBoardComponent} from "./dashboard.component";

// TinyMCE
import {SimpleTinyComponent} from './TinyMCE.component';

//Service's
import {ProductoService} from './Services/producto.service';
import {CategoriaService} from "./Services/categoria.service";

import {routing} from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        ProductoFormComponent,
        DashBoardComponent,

        SimpleTinyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        ProductoService,
        CategoriaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}