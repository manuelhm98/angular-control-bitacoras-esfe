import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoAreaRoutingModule } from './tipo-area-routing.module';
import { TipoAreaComponent } from './components/tipo-area/tipo-area.component';
import { ListaTipoAreaComponent } from './components/lista-tipo-area/lista-tipo-area.component';
import { NuevoTipoAreaComponent } from './components/nuevo-tipo-area/nuevo-tipo-area.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [TipoAreaComponent, ListaTipoAreaComponent, NuevoTipoAreaComponent],
  imports: [
    CommonModule,
    TipoAreaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class TipoAreaModule { }
