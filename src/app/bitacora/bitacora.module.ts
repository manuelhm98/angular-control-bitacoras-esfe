import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule } from './bitacora-routing.module';
import { ListaBitacoraComponent } from './components/lista-bitacora/lista-bitacora.component';
import { NuevaBitacoraComponent } from './components/nueva-bitacora/nueva-bitacora.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleBitacoraComponent } from './components/detalle-bitacora/detalle-bitacora.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ListaBitacoraComponent, NuevaBitacoraComponent, DetalleBitacoraComponent],
  imports: [
    CommonModule,
    BitacoraRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class BitacoraModule { }
