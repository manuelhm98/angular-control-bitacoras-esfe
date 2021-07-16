import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RolesComponent } from './components/roles/roles.component';
import { ListaRolesComponent } from './components/lista-roles/lista-roles.component';
import { NuevoRolComponent } from './components/nuevo-rol/nuevo-rol.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RolesComponent, ListaRolesComponent, NuevoRolComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
