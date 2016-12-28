//import {BrowserModule} from '@angular/platform-browser';
import {NgModule}       from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonModule}   from '@angular/common';
import {AdminRoutingModule} from "./admin.routing";

import {AdminComponent} from "./admin.component";
import {AdminDashboardComponent} from "./dashboard.component";
import {ProductoComponent} from "./producto.component";
import {CategoriaComponent} from "./categoria.component";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TinyMCEModule} from "../TinyMCE.module";

@NgModule({
    imports: [
        //BrowserModule,
        CommonModule,
        FormsModule,
        NgbModule,

        AdminRoutingModule,
        TinyMCEModule
    ],
    declarations: [
        AdminComponent,
        AdminDashboardComponent,
        ProductoComponent,
        CategoriaComponent
    ]
})
export class AdminModule {
}