import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories, Marca } from 'src/app/Interfaces/Categories';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-agregar',
  templateUrl: './modal-agregar.component.html',
  styleUrls: ['./modal-agregar.component.css']
})
export class ModalAgregarComponent {

  @Output() ocultarModal = new EventEmitter<boolean>()
  addProductForm!: FormGroup;
  displayAddProductModal: boolean = true;
  selectedFile: File | null = null;
  Spinner = false

  categorias: Categories[] | undefined
  marcas: Marca[] | undefined

  constructor(
    private fb: FormBuilder,
    private endPointService: EndpointService
  ) { }

  get f() {
    return this.addProductForm.controls;
  }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      cantidad: ['', Validators.required],
      imagen: [[], Validators.required],
      descuento: ['', Validators.required],
      valorDescuento: [0],
      fechaInicio: [''],
      fechaFin: [''],
    });

    this.getMetodos()
  }
  async getMetodos() {
    await this.getCategorias()
  }

  getMarcas(IdCategoria: number) {
    this.endPointService.getServices(`Categories/Marca/${IdCategoria}`)
      .subscribe((data) => {
        if (data.status == 200) {
          this.marcas = data.response[0]
        }
      })
  }

  ValidaFechaFinal() {
    if (this.f['fechaInicio'].value > this.f['fechaFin'].value) {
      Swal.fire({
        title: 'Lo sentimos!',
        icon: 'info',
        text: 'La fecha final del descuento no puede ser menor a la fecha de inicio'
      })
      this.f['fechaFin'].setValue('')
      this.f['fechaFin'].setErrors
    }
  }

  ValidaFechaInicio() {
    if (this.f['fechaInicio'].value < this.f['fechaFin'].value) {
      Swal.fire({
        title: 'Lo sentimos!',
        icon: 'info',
        text: 'La fecha de inicio del descuento no puede ser superior a la fecha final'
      })
      this.f['fechaInicio'].setValue('')
      this.f['fechaInicio'].setErrors
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      //input.value = '';
    }
  }

  getCategorias() {
    this.endPointService.getServices('Categories')
      .subscribe((data) => {
        if (data.status == 200) {
          this.categorias = data.response
        }
      })
  }

  onCancelAddProduct() {
    this.displayAddProductModal = false;
    this.ocultarModal.emit(false)
    this.addProductForm.reset();
  }

  onAddProduct() {
    if (this.addProductForm.valid) {
      let nombreCategoria = this.categorias?.filter(e => e.ID == this.addProductForm.get('categoria')?.value)[0].Nombre
      const formData = new FormData();

      let descuento = (this.f['descuento'].value == 'false') ? 0 : 1

      formData.append('IdCategoria', this.f['categoria'].value);
      formData.append('Nombre', this.f['nombre'].value);
      formData.append('idMarca', this.f['marca'].value);
      formData.append('precio', this.f['precio'].value);
      formData.append('descuento', descuento.toString());
      formData.append('CantidadDescuento', this.f['valorDescuento'].value);
      formData.append('fechaInicio', this.f['fechaInicio'].value);
      formData.append('fechaFin', this.f['fechaFin'].value);
      formData.append('Descripcion', this.f['descripcion'].value);
      formData.append('cantidad', this.f['cantidad'].value);
      formData.append('proyecto', 'Ak-Na'); // cambiar para que sea dinamico el tema del aplicativo
      if (nombreCategoria) {
        formData.append('carpeta', nombreCategoria);
      }

      if (this.selectedFile) {
        formData.append('files', this.selectedFile);
      }
      this.Spinner = true
      this.endPointService.postServices('google/InsertFile', formData)
        .subscribe((data) => {
          this.Spinner = false
          if (data.status == 200) {
            Swal.fire({
              title: 'Guardado',
              icon: 'success',
              text: 'el producto se agrego de manera correcta'
            }).then((e) => {
              this.ocultarModal.emit(false)
              this.displayAddProductModal = false;
            })
          } else {
            Swal.fire({
              title: 'Error',
              icon: 'warning',
              text: `sucedio un erro ${data.response}`
            })
          }
        })
    }
  }
}
