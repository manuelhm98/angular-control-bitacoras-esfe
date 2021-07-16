import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpageComponent } from '../shared/pages/notpage/notpage.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';


import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


const routes: Routes = [{
  path: '', component: UsuariosComponent, data: { titulo: 'Usuarios' },
  children: [
    { path: 'lista-usuarios', component: ListaUsuariosComponent, data: { titulo: 'Usuarios' } },
    { path: 'nuevo-usuario', component: NuevoUsuarioComponent, data: { titulo: 'Registrar Usuario' } },
    { path: '**', redirectTo: 'lista-usuarios' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
