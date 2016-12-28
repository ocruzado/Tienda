import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashBoardComponent} from "./dashboard.component";
//import {ProductoComponent} from "./admin/producto.component";
//import {CategoriaComponent} from "./admin/categoria.component";
import {PageNotFoundComponent} from "./pagenotfound.component";

const appRoutes: Routes = [
    {path: '', component: DashBoardComponent},
    //{path: 'producto', component: ProductoComponent},
    //{path: 'categoria', component: CategoriaComponent},
    { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);