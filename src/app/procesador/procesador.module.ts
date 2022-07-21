import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesadorRoutingModule } from './procesador-routing.module';
import { ProcesadorComponent } from './components/procesador/procesador.component';
import { ListaProcesadorComponent } from './components/lista-procesador/lista-procesador.component';
import { NuevoProcesadorComponent } from './components/nuevo-procesador/nuevo-procesador.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ProcesadorComponent, ListaProcesadorComponent, NuevoProcesadorComponent],
  imports: [
    CommonModule,
    ProcesadorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProcesadorModule { }
