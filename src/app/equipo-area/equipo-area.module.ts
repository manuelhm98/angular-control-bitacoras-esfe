import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoAreaRoutingModule } from './equipo-area-routing.module';
import { NuevoEquipoAreaComponent } from './components/nuevo-equipo-area/nuevo-equipo-area.component';
import { ListaEquipoAreaComponent } from './components/lista-equipo-area/lista-equipo-area.component';
import { EquipoAreaComponent } from './components/equipo-area/equipo-area.component';


@NgModule({
  declarations: [NuevoEquipoAreaComponent, ListaEquipoAreaComponent, EquipoAreaComponent],
  imports: [
    CommonModule,
    EquipoAreaRoutingModule
  ]
})
export class EquipoAreaModule { }
