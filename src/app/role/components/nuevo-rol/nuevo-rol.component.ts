import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles.service';

import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { Roles } from '../../models/roles';
import { ListaRolesComponent } from '../lista-roles/lista-roles.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['./nuevo-rol.component.css']
})
export class NuevoRolComponent implements OnInit {

  suscription: Subscription
  role: Roles;
  IdRole = 0;
  /****VALIDACION DE FORMULARIO*****/
  public registerForm = this.fb.group({
    Roles: ['', [Validators.required]],
    Estado: ['1', [Validators.required]]

  })


  constructor(private fb: FormBuilder,
    private roleService: RolesService,
  ) { }

  ngOnInit(): void {

  }

  /**REGISTRAR NUEVO ROL */
  registerNewRol() {
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se permiten campos vacios',
        showConfirmButton: false,
        timer: 1000
      })

    }

    this.roleService.createNewRole(this.registerForm.value).subscribe(resp => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: 'Ok...',
        text: 'Registro exitoso !!!',
        showConfirmButton: false,
        timer: 2000
      })
      this.roleService.getListRole();
      this.registerForm.reset();
    }, (err) => {
      if (err.name === "HttpErrorResponse") {
        console.log(err)
        Swal.fire('Error', 'Servidor no disponible', 'error',)
      }
    });
  }

}
