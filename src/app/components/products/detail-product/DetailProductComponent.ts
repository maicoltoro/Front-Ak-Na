import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { CartService } from 'src/app/services/CartService';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail-prodcut',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {

  totalProducdts: Array<Product> = [];
  @Input() product: Product | null = null;
  quantity: number = 1;
  carrito: boolean = false;
  valorDescuento  = 0

  constructor(
    private cartService: CartService
  ) { }

  ngOnChanges() {
    this.totalProducdts.push(JSON.parse(sessionStorage.getItem('product') || '[]'))
    this.valorDescuento = 0
    this.quantity = 1;
    if(this.product){
      this.valorDescuento = (this.product.Precio - (this.product.Precio * (this.product.Cantidaddescuento / 100)))
    }
  }

  ActivarCarrito() {
    this.totalProducdts.splice(0, this.totalProducdts.length)
    let initialProduct = JSON.parse(sessionStorage.getItem('product') || '[]');
    initialProduct.push({
      ...this.product,
      Cantidad: this.quantity
    })
    if(this.valorDescuento != 0) initialProduct[initialProduct.length -1].Precio = this.valorDescuento
    sessionStorage.setItem('product', JSON.stringify(initialProduct));
    const storedProduct = sessionStorage.getItem('product');
    if (storedProduct) {
      this.totalProducdts?.push(JSON.parse(storedProduct));
      this.carrito = true;
      this.cartService.updateCartCount();
    }
    Swal.fire({
      title:'OK',
      icon:'success',
      text:'Producto agregado al carrito'
    })
  }

  increaseQuantity() {
    let CantidadPermitida = this.product?.Inventario[0].cantidad
    if (CantidadPermitida) {
      CantidadPermitida -=1 
      if (CantidadPermitida > this.quantity) {
        this.quantity++;
      } else {
        Swal.fire({
          title: 'Lo sentimos ',
          icon: 'info',
          text: `No puedes pedir mas de ${CantidadPermitida} ya que es el limite permitido de este producto por el momento`
        })
      }
    }
  }

  cerrarCarro(event: boolean) {
    this.carrito = event
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
