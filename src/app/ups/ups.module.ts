import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpsRoutingModule } from './ups-routing.module';
import { CpuComponent } from './components/cpu/cpu.component';
import { ListaUpsComponent } from './components/lista-ups/lista-ups.component';
import { NuevoUpsComponent } from './components/nuevo-ups/nuevo-ups.component';


@NgModule({
  declarations: [CpuComponent, ListaUpsComponent, NuevoUpsComponent],
  imports: [
    CommonModule,
    UpsRoutingModule
  ]
})
export class UpsModule { }
