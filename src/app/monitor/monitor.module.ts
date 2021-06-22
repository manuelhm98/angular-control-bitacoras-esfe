import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './components/monitor/monitor.component';
import { NuevoMonitorComponent } from './components/nuevo-monitor/nuevo-monitor.component';
import { ListaMonitorComponent } from './components/lista-monitor/lista-monitor.component';


@NgModule({
  declarations: [MonitorComponent, NuevoMonitorComponent, ListaMonitorComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
