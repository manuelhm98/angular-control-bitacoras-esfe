import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Importacion de Modulos
import { ListaRolesComponent } from './components/lista-roles/lista-roles.component';
import { NuevoRolComponent } from './components/nuevo-rol/nuevo-rol.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-roles', component: ListaRolesComponent, data: { titulo: 'Roles' } },
      { path: 'nuevo-rol', component: NuevoRolComponent, data: { titulo: 'Agregar nuevo rol' } },
      { path: '**', redirectTo: 'lista-roles' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
