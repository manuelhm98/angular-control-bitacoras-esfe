import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Roles } from 'src/app/role/models/roles';
import { RolesService } from 'src/app/role/services/roles.service';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  /**AREGLO DE ROLES */
  public roles: Roles[] = [];

  /**VALIDACION DE FORMULARIO */
  public registerUser = this.fb.group({
    roleId: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    pass: ['', [Validators.required]],
    estado: ['1', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private roleService: RolesService, private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.cargarRole();
  }

  /**GUARDAR USUARIO */
  createUser() {
    if (this.registerUser.invalid) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se permiten campos vacios',
        showConfirmButton: false,
        timer: 1000
      })
    }

    this.usuarioService.createNewUser(this.registerUser.value).subscribe(resp => {
      console.log(resp);
      Swal.fire({
        icon: 'success',
        title: 'Ok...',
        text: 'Registro exitoso !!!',
        showConfirmButton: false,
        timer: 2000
      })
      this.usuarioService.loadUser();
      this.registerUser.reset();
      console.log(this.registerUser)
    }, (err) => {
      if (err.name === "HttpErrorResponse") {
        console.log(err)
        Swal.fire('Error', 'Servidor no disponible', 'error',)
      }
    })
  }

  cargarRole() {
    this.roleService.listRoles().subscribe(data => {
      console.log(data)
      this.roles = data as Roles[];
    })
  }
}
