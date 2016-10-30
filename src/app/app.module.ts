import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ProductoFormComponent} from './producto/productoForm.component';

import {ProductoService} from './Services/producto.service';

import {routing} from './app.routing';
import {DashBoardComponent} from "./dashboard.component";

@NgModule({
    declarations: [
        AppComponent,
        ProductoFormComponent,
        DashBoardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        ProductoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}