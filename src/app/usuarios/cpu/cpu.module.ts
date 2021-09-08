import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpuRoutingModule } from './cpu-routing.module';

import { NuevoCpuComponent } from './components/nuevo-cpu/nuevo-cpu.component';
import { ListaCpuComponent } from './components/lista-cpu/lista-cpu.component';
import { CpuComponent } from './components/cpu/cpu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [NuevoCpuComponent, ListaCpuComponent, CpuComponent],
  imports: [
    CommonModule,
    CpuRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CpuModule { }
