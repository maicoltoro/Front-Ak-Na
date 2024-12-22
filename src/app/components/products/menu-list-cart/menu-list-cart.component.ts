import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { CartService } from 'src/app/services/CartService';

@Component({
  selector: 'app-menu-list-cart',
  templateUrl: './menu-list-cart.component.html',
  styleUrls: ['./menu-list-cart.component.css'],
})
export class MenuListCartComponent {

  @Input() carrito: boolean = false
  @Input() listProduct: any = []
  @Output() cerrarCarrito = new EventEmitter<boolean>();
  ValorTotal: number = 0

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['listProduct']) {
      const newValue = changes['listProduct'].currentValue;

      if (this.isValid(newValue)) {
        this.calcularValorTotal();
      }
    }
  }

  continuarComprando() {
    this.cerrarCarrito.emit(false)
  }

  increaseQuantity(event: Product) {
    let cantidad = event.Cantidad;
    if (cantidad) cantidad++
    this.listProduct.filter((e: Product) => event.ID === e.ID && event.Cantidad === e.Cantidad)[0].Cantidad = cantidad;
    this.calcularValorTotal()
  }

  decreaseQuantity(event: Product) {
    let cantidad = event.Cantidad;
    if (cantidad) {
      cantidad--
      if (cantidad > 0) {
        this.listProduct.filter((e: Product) => event.ID === e.ID && event.Cantidad === e.Cantidad)[0].Cantidad = cantidad;
        this.calcularValorTotal()
      }
    }
  }

  abrirCarrito() {
    this.router.navigate(['product/products/carrito'], { state: { listProduct: this.listProduct } })
  }

  calcularValorTotal() {
    this.ValorTotal = 0
    for (let index = 0; index < this.listProduct.length; index++) {
      let valorProducto = this.listProduct[index].Cantidad * this.listProduct[index].Precio
      this.ValorTotal = this.ValorTotal + valorProducto
    }
  }

  vaciarCarro() {
    this.listProduct.splice(0, this.listProduct.length)
    localStorage.removeItem('product')
    this.ValorTotal = 0
    this.cartService.updateCartCount();
  }

  isValid(data: any): boolean {
    return data && Array.isArray(data) && data.length > 0;
  }
}