import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import {ProductoComponent} from './producto/producto.component';
import {DashBoardComponent} from "./dashboard.component";
//import {ProductoFormComponent} from "./producto/productoForm.component";
import {ProductoComponent} from "./producto.component";
import {CategoriaComponent} from "./categoria.component";

const appRoutes: Routes = [
    {path: '', component: DashBoardComponent},
    //{path: 'producto', component: ProductoFormComponent}
    {path: 'producto', component: ProductoComponent},
    {path: 'categoria', component: CategoriaComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);