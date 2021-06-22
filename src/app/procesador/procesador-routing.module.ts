import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProcesadorComponent } from './components/lista-procesador/lista-procesador.component';
import { NuevoProcesadorComponent } from './components/nuevo-procesador/nuevo-procesador.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-procesadores', component: ListaProcesadorComponent, data: { titulo: 'Lista de Procesadores' } },
    { path: 'nuevo-procesador', component: NuevoProcesadorComponent, data: { titulo: 'Registrar Procesador' } },
    { path: '**', redirectTo: 'lista-procesadores' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesadorRoutingModule { }
