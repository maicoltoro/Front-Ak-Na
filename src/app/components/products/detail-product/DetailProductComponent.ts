import { Component, Input } from '@angular/core';
import {  Product } from 'src/app/Interfaces/Product';
import { CartService } from 'src/app/services/CartService';


@Component({
  selector: 'app-detail-prodcut',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {

  totalProducdts: Array<Product> = [];
  @Input() product: Product | undefined;
  carrito: boolean = false;
  quantity: number = 1;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.totalProducdts.push(JSON.parse(sessionStorage.getItem('product') || '[]'))
  }

  ActivarCarrito() {
    this.totalProducdts.splice(0, this.totalProducdts.length)
    let initialProduct = JSON.parse(sessionStorage.getItem('product') || '[]');
    initialProduct.push({
      ...this.product,
      Cantidad: this.quantity
    })
    sessionStorage.setItem('product', JSON.stringify(initialProduct));
    const storedProduct = sessionStorage.getItem('product');
    if (storedProduct) {
      this.totalProducdts?.push(JSON.parse(storedProduct));
      this.carrito = true;
      this.cartService.updateCartCount();
    }
  }

  increaseQuantity() {
    this.quantity++;
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
