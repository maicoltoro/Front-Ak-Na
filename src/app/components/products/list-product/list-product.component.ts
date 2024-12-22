import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/Interfaces/Categories';
import { Product } from 'src/app/Interfaces/Product';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  products: Product[] | undefined;
  productDatil :Product | undefined
  paginatedProducts: any[] = [];
  first: number = 0;
  rows: number = 5;
  Marcas: Marca[] = []
  idCategory: string | undefined = ''
  idMarcas: Array<number> = []
  valorMaximo: number = 0
  valorMinimo: number = 0
  isModalVisible: boolean = false;

  constructor(
    private endPointServices: EndpointService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  paginate(event: any): void {
    const start = event.first;
    const end = start + event.rows;
    this.paginatedProducts = this.products!.slice(start, end);
  }

  showDialog(prodcut : Product) {
    this.productDatil = prodcut
    this.isModalVisible = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idCategory = params.get('category')?.toString();
      this.endPointServices.getServices(`Product/${this.idCategory}`)
        .subscribe((data) => {
          this.products = data
          this.paginate({ first: this.first, rows: this.rows })
        })
      this.getMetodos()
    });
  }

  async getMetodos() {
    await this.getMarcas()
  }

  filtrarMarcas(event: any) {
    let idMarca = event.target.value;
    if (this.idMarcas.length > 0) {
      const index = this.idMarcas.indexOf(idMarca);
      if (index === -1) this.idMarcas.push(idMarca);
      else this.idMarcas.splice(index, 1);
    } else this.idMarcas.push(idMarca);

    this.endPointServices.getServices(`Product/FilterMarca/${this.idMarcas.toString()}/${this.idCategory}`)
      .subscribe((data) => {
        this.paginatedProducts = data
      })
  }

  ValorMinimoMaximo(event: any) {
    let valor = event.target.value
    let id = event.target.id
    if (id == "minimo") this.valorMinimo = valor
    else if (id == "maximo") this.valorMaximo = valor
    this.paginate({ first: this.first, rows: this.rows })
    if (this.valorMinimo > 0 && this.valorMaximo > 0) {
      this.paginatedProducts = this.paginatedProducts.filter(e => parseInt(e.Precio) >= this.valorMinimo && parseInt(e.Precio) <= this.valorMaximo)
    } else if (this.valorMinimo > 0) {
      this.paginatedProducts = this.paginatedProducts.filter(e => parseInt(e.Precio) >= this.valorMinimo)
    } else if (this.valorMaximo > 0) {
      this.paginatedProducts = this.paginatedProducts.filter(e => parseInt(e.Precio) <= this.valorMaximo)
    }
  }

  filtrarPrecio(event: any) {
    this.paginate({ first: this.first, rows: this.rows })
    let valor = event.target.value.split("-")
    let valorMinimo = valor[0]
    let valorMaximo = valor[1];
    if (Number.isNaN(parseInt(valorMinimo))) {
      if (valorMinimo == "menos") {
        this.paginatedProducts = this.paginatedProducts.filter(e => e.Precio <= parseInt(valorMaximo))
      } else if (valorMinimo == "mas") {
        this.paginatedProducts = this.paginatedProducts.filter(e => e.Precio >= parseInt(valorMaximo))
      }
    } else {
      this.paginatedProducts = this.paginatedProducts.filter(e => e.Precio >= parseInt(valorMinimo) && e.Precio <= parseInt(valorMaximo))
    }
  }

  getMarcas() {
    this.endPointServices.getServices(`Categories/Marca/${this.idCategory}`)
      .subscribe((data => {
        this.Marcas = data[0]
      }))
  }
}
