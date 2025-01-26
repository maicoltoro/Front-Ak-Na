import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { InventarioComponent } from './inventario/inventario.component';
import { PedidosComponent } from './pedidos/pedidos.component'
import { TableModule } from 'primeng/table'
import { ChipModule } from 'primeng/chip'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ModalEditarComponent } from './inventario/modal-editar/modal-editar.component';
import { ModalAgregarComponent } from './inventario/modal-agregar/modal-agregar.component'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast'
import { SplitButtonModule } from 'primeng/splitbutton'
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    InicioComponent,
    InventarioComponent,
    PedidosComponent,
    ModalEditarComponent,
    ModalAgregarComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule,
    ChartModule,
    ProgressBarModule,
    TableModule,
    ChipModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    SplitButtonModule
  ],
  providers: [
    MessageService  
  ]
})
export class AdministracionModule { }
