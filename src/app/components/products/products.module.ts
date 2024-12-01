import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './products-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginatorModule } from 'primeng/paginator';
import { DetailProductComponent } from './detail-product/DetailProductComponent'; 
import { SidebarModule } from 'primeng/sidebar';
import { MenuListCartComponent } from './menu-list-cart/menu-list-cart.component';
import { CarritoComponent } from './carrito/carrito.component';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ListProductComponent,
    DetailProductComponent,
    MenuListCartComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    PaginatorModule,
    SidebarModule,
    StepsModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports:[
    MenuListCartComponent
  ]
})
export class ProductsModule { }
