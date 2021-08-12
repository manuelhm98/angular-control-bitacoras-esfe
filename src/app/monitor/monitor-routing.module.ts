import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMonitorComponent } from './components/lista-monitor/lista-monitor.component';
import { NuevoMonitorComponent } from './components/nuevo-monitor/nuevo-monitor.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-monitor', component: ListaMonitorComponent, data: { titulo: 'Lista de Monitores' } },
    { path: 'nuevo-monitor/:id', component: NuevoMonitorComponent, data: { titulo: 'Registrar Monitor' } }, { path: '**', redirectTo: 'lista-monitor' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
