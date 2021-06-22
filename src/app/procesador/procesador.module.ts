import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesadorRoutingModule } from './procesador-routing.module';
import { ProcesadorComponent } from './components/procesador/procesador.component';
import { ListaProcesadorComponent } from './components/lista-procesador/lista-procesador.component';
import { NuevoProcesadorComponent } from './components/nuevo-procesador/nuevo-procesador.component';


@NgModule({
  declarations: [ProcesadorComponent, ListaProcesadorComponent, NuevoProcesadorComponent],
  imports: [
    CommonModule,
    ProcesadorRoutingModule
  ]
})
export class ProcesadorModule { }
