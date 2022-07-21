import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoAreaRoutingModule } from './equipo-area-routing.module';
import { NuevoEquipoAreaComponent } from './components/nuevo-equipo-area/nuevo-equipo-area.component';
import { ListaEquipoAreaComponent } from './components/lista-equipo-area/lista-equipo-area.component';
import { EquipoAreaComponent } from './components/equipo-area/equipo-area.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [NuevoEquipoAreaComponent, ListaEquipoAreaComponent, EquipoAreaComponent],
  imports: [
    CommonModule,
    EquipoAreaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class EquipoAreaModule { }
