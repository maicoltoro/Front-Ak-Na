import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './components/products/products.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Header/header-ventas/header.component';

import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from './footer-ventas/footer.component';
import { SidebarModule } from 'primeng/sidebar';
import { EndpointService } from './services/endpoint/endpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { VentasLayoutComponent } from './Layout/ventas-layout/ventas-layout.component';
import { AdministracionLayoutComponent } from './Layout/administracion-layout/administracion-layout.component';
import { HeaderAdministracionComponent } from './Header/header-administracion/header-administracion.component';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VentasLayoutComponent,
    AdministracionLayoutComponent,
    HeaderAdministracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    BrowserAnimationsModule,
    ProductsModule,
    SidebarModule,
    HttpClientModule,
    DockModule,
    TooltipModule
  ],
  providers: [EndpointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
