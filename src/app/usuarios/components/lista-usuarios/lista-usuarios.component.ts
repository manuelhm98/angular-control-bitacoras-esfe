import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public filterUser: Usuario[] = [];
  public page: number = 1;
  public name: string = "";
  public rol: string = "";
  public take: number = 5;
  form: FormGroup



  constructor(
    public usuarioService: UsuariosService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadingUser();
    this.form = this.fb.group({
      names: '',
      role: '',
    })

  }

  //* CARGAR USUARIOS 
  loadingUser() {
    this.usuarioService.loadUser(this.page, this.name, this.rol).subscribe(({ TotalRegistros, Usuarios }) => {
      this.totalUsuarios = TotalRegistros;
      this.usuarios = Usuarios
      this.filterUser = Usuarios
    })
  }

  //* SEARCH
  searchUser() {

    this.name = this.form.controls['names'].value

    this.rol = this.form.controls['role'].value

    this.loadingUser()
  }

  //* PAGINACION
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1
    } else if (this.page > this.totalUsuarios + 1) {
      this.page -= valor;
    }
    this.loadingUser();
  }

  //* ELIMINAR USUARIO
  deleteUser(nombre: string, id: number) {
    Swal.fire({
      title: '¿Eliminar Usuario?',
      text: 'Esta a punto de eliminar a ' + nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.deleteUser(id)
          .subscribe(resp => {
            this.loadingUser();
            Swal.fire(
              'Usuario eliminado',
              `${nombre} fue eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }
}
