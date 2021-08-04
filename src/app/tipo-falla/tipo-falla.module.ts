import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoFallaRoutingModule } from './tipo-falla-routing.module';
import { TipoFallaComponent } from './components/tipo-falla/tipo-falla.component';
import { ListaTipoFallaComponent } from './components/lista-tipo-falla/lista-tipo-falla.component';
import { NuevoTipoFallaComponent } from './components/nuevo-tipo-falla/nuevo-tipo-falla.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TipoFallaComponent, ListaTipoFallaComponent, NuevoTipoFallaComponent],
  imports: [
    CommonModule,
    TipoFallaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TipoFallaModule { }
