import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import {ProductoComponent} from './producto/producto.component';
import {DashBoardComponent} from "./dashboard.component";
//import {ProductoFormComponent} from "./producto/productoForm.component";
import {ProductoComponent} from "./producto.component";

const appRoutes: Routes = [
    {path: '', component: DashBoardComponent},
    //{path: 'producto', component: ProductoFormComponent}
    {path: 'producto', component: ProductoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);