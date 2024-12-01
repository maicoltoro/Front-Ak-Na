import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailProductComponent } from './detail-product/DetailProductComponent'; 
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {
    path: ':category',
    component : ListProductComponent
  },
  {
    path: 'products/detail',
    component : DetailProductComponent
  },
  {
    path: 'products/carrito',
    component : CarritoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
