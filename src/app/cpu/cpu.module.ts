import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpuRoutingModule } from './cpu-routing.module';

import { NuevoCpuComponent } from './components/nuevo-cpu/nuevo-cpu.component';
import { ListaCpuComponent } from './components/lista-cpu/lista-cpu.component';
import { CpuComponent } from './components/cpu/cpu.component';


@NgModule({
  declarations: [NuevoCpuComponent, ListaCpuComponent, CpuComponent],
  imports: [
    CommonModule,
    CpuRoutingModule
  ]
})
export class CpuModule { }
