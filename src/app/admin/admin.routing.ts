import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from "./admin.component";
import {AdminDashboardComponent} from "./dashboard.component";
import {ProductoComponent} from "./producto.component";
import {CategoriaComponent} from "./categoria.component";
import {AuthGuard} from "../auth-guard.service";


const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [
            AuthGuard
        ],
        children: [
            {
                path: '',
                canActivateChild: [
                    AuthGuard
                ],
                children: [
                    {path: 'producto', component: ProductoComponent},
                    {path: 'categoria', component: CategoriaComponent},
                    {path: '', component: AdminDashboardComponent}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}