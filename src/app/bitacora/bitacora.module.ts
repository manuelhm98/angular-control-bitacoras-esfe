import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { ListaBitacoraComponent } from './components/lista-bitacora/lista-bitacora.component';
import { NuevaBitacoraComponent } from './components/nueva-bitacora/nueva-bitacora.component';


@NgModule({
  declarations: [ListaBitacoraComponent, NuevaBitacoraComponent],
  imports: [
    CommonModule,
    BitacoraRoutingModule
  ]
})
export class BitacoraModule { }
