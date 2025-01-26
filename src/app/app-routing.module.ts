import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasLayoutComponent } from './Layout/ventas-layout/ventas-layout.component';
import { AdministracionLayoutComponent } from './Layout/administracion-layout/administracion-layout.component';

const routes: Routes = [
  {
    path: '',
    component: VentasLayoutComponent,
    children: [
      {
        path: '', 
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule),
      },
    ]
  },
  {
    path: 'administracion',
    component: AdministracionLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/administracion/administracion.module').then(m => m.AdministracionModule),
      },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
