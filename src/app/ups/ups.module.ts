import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpsRoutingModule } from './ups-routing.module';
import { ListaUpsComponent } from './components/lista-ups/lista-ups.component';
import { NuevoUpsComponent } from './components/nuevo-ups/nuevo-ups.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpsComponent } from './components/ups/ups.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [UpsComponent, ListaUpsComponent, NuevoUpsComponent],
  imports: [
    CommonModule,
    UpsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class UpsModule { }
