import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuario: Usuario[] = [];
  public page: number = 1;
  public take: number = 5;



  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {

    this.loadingUser()

  }


  loadingUser() {
    this.usuarioService.loadUser(this.page).subscribe(({ TotalRegistros, Usuarios }) => {
      this.totalUsuarios = TotalRegistros;
      this.usuario = Usuarios
      console.log(this.usuario)
    })
  }

  changePage(valor: number) {


    this.page += valor;

    /*  this.page >= this.totalUsuarios ? this.page : this.page + 1
     this.page <= 1 ? this.page : this.page - 1
  */
    if (this.page <= 1) {
      this.page = 1
    } else if (this.page > this.totalUsuarios + 1) {
      this.page -= valor;
    }
    this.loadingUser();


  }




}
