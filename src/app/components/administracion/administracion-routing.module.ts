import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'Pedidos',
        component: PedidosComponent
    },
    {
        path: 'Inventario',
        component: InventarioComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdministracionRoutingModule { }
