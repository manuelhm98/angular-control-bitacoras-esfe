import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCpuComponent } from './components/lista-cpu/lista-cpu.component';
import { NuevoCpuComponent } from './components/nuevo-cpu/nuevo-cpu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-cpu', component: ListaCpuComponent, data: { titulo: 'Lista Cpu' } },
      { path: 'nuevo-cpu/:id', component: NuevoCpuComponent, data: { titulo: 'Registrar Cpu' } },
      { path: '**', redirectTo: 'lista-cpu' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpuRoutingModule { }
