import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuebleRoutingModule } from './mueble-routing.module';
import { MuebleComponent } from './components/mueble/mueble.component';
import { ListaMueblesComponent } from './components/lista-muebles/lista-muebles.component';
import { NuevoMuebleComponent } from './components/nuevo-mueble/nuevo-mueble.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MuebleComponent, ListaMueblesComponent, NuevoMuebleComponent],
  imports: [
    CommonModule,
    MuebleRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MuebleModule { }
