import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosTrabajoRoutingModule } from './puestos-trabajo-routing.module';
import { PuestosTrabajoComponent } from './components/puestos-trabajo/puestos-trabajo.component';
import { ListaPuestosTrabajoComponent } from './components/lista-puestos-trabajo/lista-puestos-trabajo.component';
import { NuevoPuestosTrabajoComponent } from './components/nuevo-puestos-trabajo/nuevo-puestos-trabajo.component';


@NgModule({
  declarations: [PuestosTrabajoComponent, ListaPuestosTrabajoComponent, NuevoPuestosTrabajoComponent],
  imports: [
    CommonModule,
    PuestosTrabajoRoutingModule
  ]
})
export class PuestosTrabajoModule { }
