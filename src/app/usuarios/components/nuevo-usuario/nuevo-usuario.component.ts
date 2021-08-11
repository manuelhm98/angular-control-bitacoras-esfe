import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


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
  public user: any;
  public registerUser: FormGroup;




  constructor(
    private fb: FormBuilder,
    private roleService: RolesService,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarUsuario(id))
    this.cargarRole();
    this.registerUser = this.fb.group({
      roleId: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      estado: ['1', [Validators.required]]
    })
  }

  cargarUsuario(id: number) {
    this.usuarioService.userById(id).subscribe(data => {

      if (id === 0) {
        return;
      }
      this.user = data

      console.log(this.user)

      this.registerUser.patchValue({
        roleId: this.user.RoleID,
        nombre: this.user.Nombre,
        apellido: this.user.Apellido,
        email: this.user.Email,
        pass: this.user.Pass,
        estado: this.user.Estado
      })
    })
  }
  /**GUARDAR USUARIO */
  createUser() {

    //Actualizar
    if (this.user) {
      const data = {
        ...this.registerUser.value,
        UsuarioId: this.user.UsuarioID
      }
      this.usuarioService.updateUser(data).subscribe(resp => {
        console.log(resp)
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'El Usuario se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.usuarioService.loadUser();
        this.registerUser.reset();
      })
    } else {
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

  }



  cargarRole() {
    this.roleService.listRoles().subscribe(data => {
      console.log(data)
      this.roles = data as Roles[];
    })
  }
}
