import { Component } from '@angular/core';
import { Factura, Product } from 'src/app/Interfaces/Product';


@Component({
  selector: 'app-detail-prodcut',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {

  totalProducdts: Array<Product> = [];
  product: Product | undefined;  
  carrito: boolean = false;
  quantity: number = 1;

  constructor() {
    this.product = history.state.product;
  }

  ngOnInit() {
    this.totalProducdts.push(JSON.parse(localStorage.getItem('product') || '[]'))
  }

  ActivarCarrito() {
    this.totalProducdts.splice(0, this.totalProducdts.length)
    let initialProduct = JSON.parse(localStorage.getItem('product') || '[]');
    initialProduct.push({
      ...this.product,
      Cantidad: this.quantity
    })
    localStorage.setItem('product', JSON.stringify(initialProduct));    
    const storedProduct = localStorage.getItem('product');
    if (storedProduct) {
      this.totalProducdts?.push(JSON.parse(storedProduct));
      this.carrito = true;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  cerrarCarro(event: boolean){
    this.carrito = event
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
