import { Component } from '@angular/core';
import { Sp_traerInventario } from 'src/app/Interfaces/Graficas';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  productos: Sp_traerInventario[] = []
  selectedProduct: Sp_traerInventario | undefined;
  displayAddProductModal: boolean = false;
  displayModal = false;
  constructor(
    private endPointServices: EndpointService,
  ) { }

  showModal(product: Sp_traerInventario): void {
    this.selectedProduct = product;
    this.displayModal = true;
  }

  ngOnInit() {
    this.endPointServices.getServices('Inventario/getAll')
      .subscribe((data) => {
        if (data.status == 200) {
          this.productos = data.response
        }
      })
  }

  showAddProductModal() {
    this.displayAddProductModal = true;
  }
}
