import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuebleRoutingModule } from './mueble-routing.module';
import { MuebleComponent } from './components/mueble/mueble.component';
import { ListaMueblesComponent } from './components/lista-muebles/lista-muebles.component';
import { NuevoMuebleComponent } from './components/nuevo-mueble/nuevo-mueble.component';


@NgModule({
  declarations: [MuebleComponent, ListaMueblesComponent, NuevoMuebleComponent],
  imports: [
    CommonModule,
    MuebleRoutingModule
  ]
})
export class MuebleModule { }
