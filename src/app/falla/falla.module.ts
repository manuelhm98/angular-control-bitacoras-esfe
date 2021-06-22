import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FallaRoutingModule } from './falla-routing.module';
import { FallaComponent } from './components/falla/falla.component';
import { ListaFallaComponent } from './components/lista-falla/lista-falla.component';
import { NuevaFallaComponent } from './components/nueva-falla/nueva-falla.component';


@NgModule({
  declarations: [FallaComponent, ListaFallaComponent, NuevaFallaComponent],
  imports: [
    CommonModule,
    FallaRoutingModule
  ]
})
export class FallaModule { }
