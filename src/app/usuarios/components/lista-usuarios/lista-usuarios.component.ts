import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public page: number = 1;
  public take: number = 5;



  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {

    this.loadingUser()
    this.usuarios;

  }

  //* CARGAR USUARIOS 
  loadingUser() {
    this.usuarioService.loadUser(this.page).subscribe(({ TotalRegistros, Usuarios }) => {
      this.totalUsuarios = TotalRegistros;
      this.usuarios = Usuarios
      console.log(this.usuarios)
    })
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


  userEdit(user: Usuario) {
    console.log(user)
  }
}
