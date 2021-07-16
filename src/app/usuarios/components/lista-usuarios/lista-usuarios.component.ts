import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {


  constructor(public usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.listUser();
  }

  /**CARGAR USUARIOS 
  loadUsers() {
    this.usuarioService.listUser().subscribe(resp => {
      this.usuarios = resp as Usuario[];
    })
  }*/


}
