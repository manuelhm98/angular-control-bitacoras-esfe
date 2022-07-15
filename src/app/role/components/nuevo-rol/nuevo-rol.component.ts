import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../services/roles.service';

import Swal from 'sweetalert2'
import { Roles } from '../../models/roles';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['./nuevo-rol.component.css']
})
export class NuevoRolComponent implements OnInit {

  role: Roles;
  registerForm: UntypedFormGroup;


  constructor(private fb: UntypedFormBuilder,
    public roleService: RolesService,
  ) {
  }

  ngOnInit(): void {
    /****VALIDACION DE FORMULARIO*****/
    this.registerForm = this.fb.group({
      Roles: ['', Validators.required],
      Estado: 1
    })
  }

  cerrarModal() {
    this.roleService.cerrarModal();
    this.registerForm.reset();
  }
  /**REGISTRAR NUEVO ROL */
  registerNewRol() {

    this.roleService.createNewRole(this.registerForm.value).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Ok...',
        text: 'Registro exitoso !!!',
        showConfirmButton: false,
        timer: 2000
      })
      this.roleService.newRegister.emit(resp);
      this.registerForm.reset();
      this.roleService.getListRole();
      this.roleService.cerrarModal();

    }, (err) => {
      if (err.name === "HttpErrorResponse") {
        Swal.fire('Error', 'Servidor no disponible', 'error',)
      }
    });
  }

}
