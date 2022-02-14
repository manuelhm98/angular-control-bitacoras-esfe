import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPuestosTrabajoComponent } from './components/editar-puestos-trabajo/editar-puestos-trabajo.component';
import { ListaPuestosTrabajoComponent } from './components/lista-puestos-trabajo/lista-puestos-trabajo.component';
import { NuevoPuestosTrabajoComponent } from './components/nuevo-puestos-trabajo/nuevo-puestos-trabajo.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-puestos-trabajo', component: ListaPuestosTrabajoComponent, data: { titulo: 'Puestos de Trabajo' } },
    { path: 'nuevo-puesto-trabajo/:id', component: NuevoPuestosTrabajoComponent, data: { titulo: 'Registar Puestos de Trabajo' } },
    { path: 'editar-puestos-trabajo/:id', component: EditarPuestosTrabajoComponent, data: { titulo: 'Editar Puestos de Trabajo' } },
    { path: '**', redirectTo: 'lista-puestos-trabajo' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuestosTrabajoRoutingModule { }
