import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-administracion',
  templateUrl: './header-administracion.component.html',
  styleUrls: ['./header-administracion.component.css']
})
export class HeaderAdministracionComponent {
  menuItems = [
    { text: 'inicio', icon: { viewBox: '0 0 179.1 145', paths: ['assets/img/ImgAdministracion/Home.png'] } },
    { text: 'Inventario', icon: { viewBox: '0 0 179.1 145', paths: ['assets/img/ImgAdministracion/inventario.png'] } },
    { text: 'Pedidos', icon: { viewBox: '0 0 179.1 145', paths: ['assets/img/ImgAdministracion/Pedidos.png'] } },
    { text: 'Ir a tienda', icon: { viewBox: '0 0 179.1 145', paths: ['assets/img/Logo.png'] } },
    { text: 'Cerrar sesion', icon: { viewBox: '0 0 179.1 145', paths: ['assets/img/ImgAdministracion/cerrarSesion.png'] } },
  ];
  activeItem = this.menuItems[0];

  constructor(
    private router: Router
  ) { }

  onMenuItemClick(item: any): void {
    if (item === this.activeItem) return;
    this.activeItem = item;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateLineWidths();
  }

  private updateLineWidths(): void {
    const buttons = document.querySelectorAll('.menu__item');
    buttons.forEach((button) => {
      const text = button.querySelector('.menu__text') as HTMLElement;
      if (text) {
        const lineWidth = `${text.offsetWidth}px`;
        (button as HTMLElement).style.setProperty('--lineWidth', lineWidth);
      }

    });
  }

  Redirigir(text: string) {
    if (text == "Cerrar sesion") {
      sessionStorage.removeItem("inicioSession")
      this.router.navigate(['login'])
    } else if (text == "Ir a tienda") {
      this.router.navigate([]).then(() => {
        const newTabUrl = this.router.serializeUrl(this.router.createUrlTree(['/']));
        window.open(newTabUrl, '_blank');
      });
    } else {
      this.router.navigate([`administracion/${text.replaceAll(' ', '')}`])
    }
  }
}
