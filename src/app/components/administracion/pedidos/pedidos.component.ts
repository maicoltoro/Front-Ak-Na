import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Informacionfactura, InformacionPedido } from 'src/app/Interfaces/Product';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent {
  pedidos: InformacionPedido[] | undefined
  pedidoSeleccionada: InformacionPedido | undefined;
  facturas: Informacionfactura[] | undefined
  facturaSeleccionada: Informacionfactura[] | undefined
  items: MenuItem[] | undefined;

  constructor(
    private endPoinService: EndpointService,
    private messageService: MessageService
  ) {
    this.items = [
      {
        label: 'Pedido entregado',
        command: () => {
          this.save(3);
        }
      },
      {
        label: 'Pedido en camino',
        command: () => {
          this.save(4);
        }
      },
      {
        label: 'Pedido cancelado',
        command: () => {
          this.save(2);
        }
      },
    ];
  }

  ngOnInit() {
    this.getMetodos()
  }

  async getMetodos() {
    await this.getmetodoFactura()
  }

  getmetodoFactura() {
    this.endPoinService.postServices('Inventario/TraerInformacionPedido', { mes: 11 })
      .subscribe((data) => {
        if (data.status == 200) {
          this.pedidos = data.responsePedido
          this.facturas = data.responseFactura
        }
      })
  }

  save(estado: number) {
    this.endPoinService.postServices('Inventario/CambiarEstado', { pedidos: this.pedidoSeleccionada?.IdPedido, idEstado: estado })
      .subscribe((data) => {
        if (data.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estado del pedido actualizado' });
          setTimeout(() => {
            location.reload()
          }, 1000);
        }
      })
  }

  mostrarDetalle(indice: number) {
    if (this.pedidos) {
      this.pedidoSeleccionada = this.pedidos[indice]
      this.facturaSeleccionada = this.facturas?.filter(e => e.IdPedido == this.pedidoSeleccionada?.IdPedido)
    }
  }
}
