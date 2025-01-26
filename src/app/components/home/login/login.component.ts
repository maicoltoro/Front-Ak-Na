import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint/endpoint.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private endPoinServices: EndpointService,
    private router: Router,
  ) { }

  isSignupMode: boolean = false;
  initialSection!: FormGroup;

  get f() {
    return this.initialSection.controls;
  }

  ngOnInit() {
    this.initialSection = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', [Validators.required]],
      nuevaContrasenna: ['', [Validators.required]],
      ConfirmaCuevaContrasenna: ['', [Validators.required]],
    });
  }


  toggleSignupMode(): void {
    this.isSignupMode = !this.isSignupMode;
  }

  iniciarSesion() {
    const obj = {
      correo: this.f['correo'].value,
      contrasenna: this.f['contrasenna'].value
    }
    this.endPoinServices.postServices('Login/inicioSesion', obj)
      .subscribe((data) => {
        if (data.status == 200) {
          sessionStorage.setItem("inicioSession", "true")
          this.router.navigate(['/administracion/inicio'])
        } else if (data.status == 401) {
          Swal.fire({
            title: 'Inicio de sesion denegado',
            icon: 'info',
            text: 'Usuario o contraseña incorrectos, por favor volver a ingresar'
          })
        }
      })
  }

  actualizaContrasenna() {
    if (this.f['ConfirmaCuevaContrasenna'].value == this.f['nuevaContrasenna'].value) {
      const obj = {
        correo: this.f['correo'].value,
        contrasenna: this.f['nuevaContrasenna'].value
      }

      this.endPoinServices.postServices('Login/actualizaContrasenna', obj)
        .subscribe((data) => {
          if (data.status == 200) {
            Swal.fire({
              title: 'Actualizado exitosamente',
              icon: 'success',
              text: 'La contraseña se cambio de manera exito'
            })
          } else if (data.status == 401) {
            Swal.fire({
              title: 'Error al actualizar la contraseña',
              icon: 'info',
              text: 'Por favor verifica el correo ingresado y vuelve a intentar'
            })
          }
        })
    } else {
      Swal.fire({
        title: 'Las contraseña no cuinciden',
        icon: 'warning',
        text: 'Las contraseñas deben coincidir, por favor verificar'
      })
    }
  }
}
