import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Dias } from 'src/app/Interfaces/Dias';
import { Factura, Product, TipoIdentificacion } from 'src/app/Interfaces/Product';
import { CartService } from 'src/app/services/CartService';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  items: MenuItem[] = [];
  active: number = 0;
  products: Product[];
  tipoIdentificacion: TipoIdentificacion[] | undefined
  checkoutForm!: FormGroup;
  departments = ['Cali'];
  FechaEnvioGratis = ''

  daysOfWeek: Array<Dias> = [];
  ValorTotal: number = 0
  valorEnvio: number = 0
  constructor(
    private fb: FormBuilder,
    private endPoint: EndpointService,
    private router: Router,
    private cartService: CartService
  ) {
    this.products = history.state.listProduct;
  }

  get f() {
    return this.checkoutForm.controls;
  }

  ngOnInit() {
    this.getMetodos()

    this.items = [
      {
        label: 'Información personal',
      },
      {
        label: 'Opción de entrega',
      },
      {
        label: 'Confirmación',
      }
    ];

    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      selectedDay: ['', Validators.required],
      subscribe: [false],
      numeroIdentificacion: ['', [Validators.required]],
      tipoIdentificacion: ['', Validators.required,]
    });
  }

  async getMetodos() {
    await this.getDias()
    await this.getTipoIdentificacion()
    //await this.getEnvio()
    await this.calcularValorTotal()
  }

  getDias() {
    this.endPoint.getServices('Dias')
      .subscribe((data) => {
        this.FechaEnvioGratis = new Date(data[0].FechaEnvioGratis).toLocaleDateString('es-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        let semana : Dias[] = this.getCurrentWeekRange()
        let fechaEnvioGratis = new Date(data[0].FechaEnvioGratis.split('T')[0]).toLocaleDateString()
        semana.forEach(e  =>{
          e.valida = (new Date().toLocaleDateString() < e.fecha) ? true : false 
          e.envioGratis = (e.fecha == fechaEnvioGratis) ? true : false
          return e
        })
        this.daysOfWeek = semana
      })
  }

  getEnvio() {
    this.endPoint.getServices('Dias/ValorEnvio')
      .subscribe((data) => {
        this.valorEnvio = parseInt(data[0].ValorEnvio)
      })
  }

  getTipoIdentificacion() {
    this.endPoint.getServices('Carrito/TipoIdentificacion')
      .subscribe((data) => {
        this.tipoIdentificacion = data
      })
  }

  calcularValorTotal() {
    this.ValorTotal = 0
    for (let index = 0; index < this.products!.length; index++) {
      let valorProducto = this.products[index].Cantidad * this.products[index].Precio
      this.ValorTotal = this.ValorTotal + valorProducto
    }
  }

  getCurrentWeekRange() {
    let objfecha: Array<Dias> = []
    for (let index = 0; index < 7; index++) {
      const today = new Date();
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() + index);
      const formatDate = (date: Date) => date.toLocaleDateString();

      objfecha.push({
        dia: firstDayOfWeek.toLocaleDateString('es-us',{weekday: 'long'}),
        fecha: formatDate(firstDayOfWeek)
      })
    }
    return objfecha
  }

  ReguistrarCompra() {
    if (this.checkoutForm.valid) {
      let objfactura: Factura[] = []
      for (let index = 0; index < this.products.length; index++) {
        objfactura.push(
          {
            ID: this.products[index].ID,
            Cantidad: this.products[index].Cantidad,
            DiaEntrega: this.f['selectedDay'].value,
            HoraFin: '',
            HoraInicio: '',
            Tiempo: 0,
            Imagen : this.products[index].imagen,
            Nombre : this.products[index].Nombre,
            Precio : this.products[index].Precio
          }
        )
      }

      let obj: object = {
        ...objfactura,
        nombre: this.f['fullName'].value,
        correo: this.f['email'].value,
        direccion: this.f['address'].value,
        telefono: this.f['phone'].value,
        departamento: this.f['department'].value,
        tipoIdentificacion: this.f['tipoIdentificacion'].value,
        numeroIdentificacion: this.f['numeroIdentificacion'].value,
        suscripcionNoticias: this.f['subscribe'].value,
        valorCompra: this.ValorTotal + this.valorEnvio
      }
      this.endPoint.postServices('Carrito', obj).subscribe((data) => {
        if (data.status == 200) {
          Swal.fire({
            title: "Felicidades!",
            text: "Tu pedido se realizo con exito, en tu correo podras ver un resumen de tu pedido",
            icon: "success"
          }).then((result) => {
            localStorage.removeItem('product')
            this.cartService.updateCartCount();
            this.router.navigate(["/"])
          })
        }
      })
    }
  }

  DiaEnvio(event: any) {
    let fecha = event.target.value.split(' - ')[1].replace("  ", "")
    let envioGratis = this.daysOfWeek.filter(e => e.fecha == fecha)[0].envioGratis
    if(envioGratis){
      this.valorEnvio = 0
    }else {
      this.getEnvio()
    }
    this.f['selectedDay'].setValue(event.target.value)
  }
}
