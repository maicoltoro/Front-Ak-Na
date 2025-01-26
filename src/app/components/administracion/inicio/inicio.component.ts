import { Component } from '@angular/core';
import { GraficaClientesFrecuentes, GraficaDiasVenta, GraficaMesCantidadVentas, GraficaProductosMasVendidos, GraficaProductosPorCategoria } from 'src/app/Interfaces/Graficas';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  GraficaVentasMes: GraficaMesCantidadVentas[] = []
  GraficaMasVendidos: GraficaProductosMasVendidos[] = []
  GraficaProductosCategorio: any
  GraficaClientesFrecuentes: any
  GraficaDiasVentas: any

  constructor(
    private endPoindService: EndpointService
  ) { }

  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.getMetodos()
  }

  async getMetodos() {
    await this.getGraficaClientesFrecuentes()
    await this.getGraficaVentasMes()
    await this.getGraficaDiasVenta()
    await this.getGraficaProductosCategoria()
    await this.getGraficaProductosMasVendidos()
  }

  getGraficaVentasMes() {
    this.endPoindService.getServices('Grafica/GraficaVentasMes')
      .subscribe((data) => {
        if (data.status == 200) {
          let meses: any = []
          let Valores: any = []
          this.GraficaVentasMes = data.response
          this.GraficaVentasMes.forEach(e => {
            meses.push(e.Mes)
            Valores.push(e.CantidadPedidos)
          })
          this.chartData = {
            labels: meses,
            datasets: [
              { label: 'Pedidos', data: Valores, borderColor: '#42A5F5', fill: false }
            ]
          };
        }
      })
  }

  getGraficaProductosMasVendidos() {
    this.endPoindService.getServices('Grafica/GraficaProductosMasVendidos')
      .subscribe((data) => {
        if (data.status == 200) {
          this.GraficaMasVendidos = data.response
        }
      })
  }

  getGraficaClientesFrecuentes() {
    this.endPoindService.getServices('Grafica/GraficaClientesFrecuentes')
      .subscribe((data) => {
        if (data.status == 200) {
          let response: GraficaClientesFrecuentes[] = data.response
          let label: any = []
          let valores: any = []
          response.forEach(e => {
            label.push(e.Cliente)
            valores.push(e.CantidadPedidos)
          });

          this.GraficaClientesFrecuentes = {
            labels: label,
            datasets: [
              { data: valores, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
            ]
          }
        }
      })
  }

  getGraficaProductosCategoria() {
    this.endPoindService.getServices('Grafica/GraficaProductosCategoria')
      .subscribe((data) => {
        if (data.status == 200) {
          let response: GraficaProductosPorCategoria[] = data.response
          let label: any = []
          let valores: any = []
          response.forEach(e => {
            label.push(e.Categoria)
            valores.push(e.CantidadPedidos)
          });

          this.GraficaProductosCategorio = {
            labels: label,
            datasets: [
              { data: valores, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
            ]
          }
        }
      })
  }

  getGraficaDiasVenta() {
    this.endPoindService.getServices('Grafica/GraficaDiasVenta')
      .subscribe((data) => {
        if (data.status == 200) {
          this.GraficaDiasVentas = data.response

          let response: GraficaDiasVenta[] = data.response
          let label: any = []
          let valores: any = []
          response.forEach(e => {
            label.push(e.DiaSemana)
            valores.push(e.CantidadPedidos)
          });
          this.GraficaDiasVentas = {
            labels: label,
            datasets: [
              { data: valores, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
            ]
          }
        }
      })
  }
}
