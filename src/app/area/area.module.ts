import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { ListaAreaComponent } from './components/lista-area/lista-area.component';
import { NuevaAreaComponent } from './components/nueva-area/nueva-area.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreasComponent } from './components/areas/areas.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ListaAreaComponent, NuevaAreaComponent, AreasComponent],
  imports: [
    CommonModule,
    AreaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
})
export class AreaModule { }
