import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';

import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    TagModule
  ]
})
export class HomeModule { }
