import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashBoardComponent} from "./dashboard.component";
import {ProductoComponent} from "./producto.component";
import {CategoriaComponent} from "./categoria.component";

const appRoutes: Routes = [
    {path: '', component: DashBoardComponent},
    {path: 'producto', component: ProductoComponent},
    {path: 'categoria', component: CategoriaComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);