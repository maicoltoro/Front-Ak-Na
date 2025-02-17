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
  indiceSeleccionado: number | null = null;
  pedidosFiltrados: InformacionPedido[] | undefined;

  filtroNombre: string = '';
  filtroMes: string = '';
  filtroEstado: string = '';
  filtroFecha: string = '';

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
    this.endPoinService.postServices('Inventario/TraerInformacionPedido', { mes: 0 , anno : 0})
      .subscribe((data) => {
        if (data.status == 200) {
          this.pedidos = data.responsePedido
          this.facturas = data.responseFactura
          this.pedidosFiltrados = data.responsePedido
        }
      })
  }

  save(estado: number) {
    let obj = {
      pedidos: this.pedidoSeleccionada?.IdPedido,
      idEstado: estado,
      estado : (estado == 2) ? 'Pedido cancelado' :  (estado == 4) ? 'pedido en camino' : 'Pedido entregado',
      nombreUsuario: this.pedidoSeleccionada?.NombreCompleto,
      correo: this.pedidoSeleccionada?.Correo
    }
    this.endPoinService.postServices('Inventario/CambiarEstado', obj)
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
    if (this.pedidosFiltrados) {
      this.indiceSeleccionado = indice;
      this.pedidoSeleccionada = this.pedidosFiltrados[indice]
      this.facturaSeleccionada = this.facturas?.filter(e => e.IdPedido == this.pedidoSeleccionada?.IdPedido)
    }
  }

  filtarMes(){
    const obj ={
      mes : this.filtroMes.split("-")[1],
      anno : this.filtroMes.split("-")[0]
    }
    this.endPoinService.postServices('Inventario/TraerInformacionPedido', obj)
    .subscribe((data) => {
      if (data.status == 200) {
        this.pedidos = data.responsePedido
        this.facturas = data.responseFactura
        this.pedidosFiltrados = data.responsePedido
      }
    })
  }

  filtrarPedidos() {
    this.pedidosFiltrados = this.pedidos?.filter((pedido) => {
      const cumpleNombre =
        !this.filtroNombre ||
        pedido.NombreCompleto.toLowerCase().includes(this.filtroNombre.toLowerCase());

      const cumpleEstado = !this.filtroEstado || pedido.Estado === this.filtroEstado;

      const cumpleFecha =
        !this.filtroFecha ||
        pedido.IdPedido.toString() === this.filtroFecha;

      return cumpleNombre && cumpleEstado && cumpleFecha;
    });
  }
}
