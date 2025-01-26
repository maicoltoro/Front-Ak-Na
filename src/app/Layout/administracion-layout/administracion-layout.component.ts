import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion-layout',
  templateUrl: './administracion-layout.component.html',
  styleUrls: ['./administracion-layout.component.css']
})
export class AdministracionLayoutComponent {
  sesionActiva : boolean = false
  constructor(
    private router : Router
  ){}

  ngOnInit(){
    if(sessionStorage.getItem('inicioSession') == "true"){
      this.sesionActiva = true
    }else{
      Swal.fire({
        icon: 'warning',
        text : 'Lo sentimos pero debes iniciar sesion primero',
        title : 'Sesion inactiva'
      }).then((result) =>{
        this.router.navigate(['login'])
      })
    }
  }
}
