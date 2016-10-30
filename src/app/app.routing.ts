import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import {ProductoComponent} from './producto/producto.component';
import {DashBoardComponent} from "./dashboard.component";
import {ProductoFormComponent} from "./producto/productoForm.component";

const appRoutes: Routes = [
    {path: '', component: DashBoardComponent},
    {path: 'producto', component: ProductoFormComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);