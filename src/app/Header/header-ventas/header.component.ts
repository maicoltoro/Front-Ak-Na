import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { EndpointService } from '../../services/endpoint/endpoint.service';
import { CartService } from '../../services/CartService';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private endPoind: EndpointService,
    private cartService: CartService
  ) { }

  items: MenuItem[] | undefined;
  carrito: boolean = false
  totalProducdts: any = [];
  cartItemCount: number = 0;

  ngOnInit() {
    this.cartService.cartItems$.subscribe((count) => {
      this.cartItemCount = count;
      this.initializeMenu();
    });
    this.initializeMenu();
  }

  initializeMenu() {
    let Categorias: any = [];
    this.endPoind.getServices('Categories').subscribe((data) => {
      if(data.status == 200){
        for (let index = 0; index < data.response.length; index++) {
          Categorias.push({
            label: data.response[index].Nombre,
            icon: 'pi pi-tag',
            command: () => this.redirectAction(`product/${data.response[index].ID}`)
          });
        }
        this.items = [
          {
            label: 'Pagina de inicio',
            icon: 'pi pi-home',
            command: () => this.redirectAction('/')
          },
          {
            label: 'Productos naturales',
            icon: 'pi pi-briefcase',
            items: Categorias
          },
          {
            label: 'Homeopatia',
            icon: 'pi pi-envelope',
            command: () => this.redirectAction('Homeopatia')
          },
          {
            icon: 'pi pi-shopping-cart',
            command: () => this.cargarProductosCarrito(),
            badge: `${this.cartItemCount}`
          }
        ];
      }
    });
  }

  cerrarCarro(event: boolean) {
    this.carrito = false
  }

  cargarProductosCarrito() {
    let productos = sessionStorage.getItem("product")
    this.totalProducdts = []
    if (productos) {
      this.carrito = true
      this.totalProducdts.push(JSON.parse(productos))
    } else {
      Swal.fire({
        title: "Lo siento!",
        text: "Todavia no has agregado ningun producto",
        icon: "info"
      });
    }
  }

  redirectAction(url: string) {
    this.router.navigate([url])
  }
}
