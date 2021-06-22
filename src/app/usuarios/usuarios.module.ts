import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';


@NgModule({
  declarations: [UsuariosComponent, ListaUsuariosComponent, NuevoUsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
