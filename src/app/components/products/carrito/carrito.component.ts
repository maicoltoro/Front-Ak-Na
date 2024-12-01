import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Dias } from 'src/app/Interfaces/Dias';
import { Factura, Product, TipoIdentificacion } from 'src/app/Interfaces/Product';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';

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

  daysOfWeek: Array<Dias> = [];
  ValorTotal: number = 0
  shippingCost = 5000; // Ejemplo de costo fijo

  valorEnvio: number = 132000
  constructor(
    private fb: FormBuilder,
    private endPoint: EndpointService
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
    await this.calcularValorTotal()
  }

  getDias() {
    this.endPoint.getServices('Dias')
      .subscribe((data) => {
        this.daysOfWeek = data
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
            Tiempo: 0
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
        tipoIdentificacion : this.f['tipoIdentificacion'].value,
        numeroIdentificacion :this.f['numeroIdentificacion'].value,
        suscripcionNoticias : this.f['subscribe'].value,
        valorCompra : this.ValorTotal + this.valorEnvio
      }
      this.endPoint.postServices('Carrito',obj).subscribe((data)  =>{
        console.log(data)
      })
    }
  }

  DiaEnvio(event: any) {
    this.f['selectedDay'].setValue(event.target.value)
    console.log(this.f)
  }

}
