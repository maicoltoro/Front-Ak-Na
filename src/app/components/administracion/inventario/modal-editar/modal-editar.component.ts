import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sp_traerInventario } from 'src/app/Interfaces/Graficas';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent {

  @Input() selectedProduct: Sp_traerInventario | undefined;
  @Output()  ocultarModal = new EventEmitter<boolean>()
  displayModal: boolean = true;

  editProductForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private endPointServices: EndpointService,
  ) { }

  get f() {
    return this.editProductForm.controls;
  }

  ngOnInit() {
    this.editProductForm = this.fb.group({
      ID: [''],
      Nombre: ['', [Validators.required]],
      Descripcion: ['', Validators.required],
      Cantidad: ['', [Validators.required]],
      Precio: ['', [Validators.required]],
      Descuento: [''],
      fechaIniDes: [''],
      fechaFinDes: [''],
      Activo: ['', [Validators.required,]],
      Imagen: [''],
      AgDesc: ['']
    });

    this.initFormEdit()
  }

  onCancel() {
    this.displayModal = false;
    this.ocultarModal.emit(false)
    this.editProductForm.reset();
  }

  initFormEdit() {
    this.f['ID'].setValue(this.selectedProduct?.ID)
    this.f['Nombre'].setValue(this.selectedProduct?.Nombre)
    this.f['Cantidad'].setValue(this.selectedProduct?.Cantidad)
    this.f['Precio'].setValue(this.selectedProduct?.Precio)
    this.f['Descripcion'].setValue(this.selectedProduct?.Descripcion)
    this.f['Activo'].setValue(this.selectedProduct?.Activo)
    this.f['Descuento'].setValue(this.selectedProduct?.Descuento)
    this.f['fechaIniDes'].setValue(this.selectedProduct?.FechaInicioDesc)
    this.f['fechaFinDes'].setValue(this.selectedProduct?.FechaFinDesc)
  }

  onSave() {
    if (this.editProductForm.valid) {
      const obj: object = {
        IdProducto: this.f['ID'].value,
        Cantidad: this.f['Cantidad'].value,
        Nombre: this.f['Nombre'].value,
        precio: this.f['Precio'].value,
        CantidadDescuento: this.f['Descuento'].value,
        fechaIni: this.f['fechaIniDes'].value,
        fechaFin: this.f['fechaFinDes'].value,
        Descripcion: this.f['Descripcion'].value,
        Activo: this.f['Activo'].value
      }

      this.endPointServices.postServices('Inventario/UpdateInventario', obj)
        .subscribe((data) => {
          if (data.status == 200) {
            if (data.response != 0) {
              Swal.fire({
                title: 'Correcto',
                icon: 'success',
                text: 'El producto se actualizo de manera correcta'
              })
            } else {
              Swal.fire({
                title: 'Lo siento',
                icon: 'warning',
                text: 'Sucedio un error, por favor volver a intentar'
              })
            }
          }
        })
      this.displayModal = false;
    }
  }
}
