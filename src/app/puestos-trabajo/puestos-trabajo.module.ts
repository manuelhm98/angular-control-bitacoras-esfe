import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosTrabajoRoutingModule } from './puestos-trabajo-routing.module';
import { PuestosTrabajoComponent } from './components/puestos-trabajo/puestos-trabajo.component';
import { ListaPuestosTrabajoComponent } from './components/lista-puestos-trabajo/lista-puestos-trabajo.component';
import { NuevoPuestosTrabajoComponent } from './components/nuevo-puestos-trabajo/nuevo-puestos-trabajo.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditarPuestosTrabajoComponent } from './components/editar-puestos-trabajo/editar-puestos-trabajo.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [PuestosTrabajoComponent, ListaPuestosTrabajoComponent, NuevoPuestosTrabajoComponent, EditarPuestosTrabajoComponent],
  imports: [
    CommonModule,
    PuestosTrabajoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PuestosTrabajoModule { }
