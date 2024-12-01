import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router
  ){}

  items: MenuItem[] | undefined;
  carrito : boolean = false
  totalProducdts: any = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Pagina de inicio',
        icon: 'pi pi-home',
        command: () => this.redirectAction('/')
      },
      {
        label: 'Productos naturales',
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'Accessories',
            icon: 'pi pi-bolt',
            command: () => this.redirectAction('product/Accessories')
          },
          {
            label: 'Fitness',
            icon: 'pi pi-server',
            command: () => this.redirectAction('product/Fitness')
          },
          {
            label: 'Clothing',
            icon: 'pi pi-pencil',
            command: () => this.redirectAction('product/Clothing')
          },
          {
            separator: true
          },
        ]
      },
      {
        label: 'Homeopatia',
        icon: 'pi pi-envelope',
        command: () => this.redirectAction('Homeopatia')
      },
      {
        
        icon: 'pi pi-shopping-cart',
        command: () => this.cargarProductosCarrito(),
        badge: JSON.parse(localStorage.getItem('product') || '[]').length
      },
    ];
  }

  cerrarCarro( event : boolean){
    this.carrito = false
  }

  cargarProductosCarrito(){
    let productos = localStorage.getItem("product")
    if(productos){
      this.carrito = true
      this.totalProducdts.push(JSON.parse(productos))
    }
  }

  redirectAction(url : string){
    this.router.navigate([url])
  }
}
