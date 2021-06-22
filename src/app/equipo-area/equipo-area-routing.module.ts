import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEquipoAreaComponent } from './components/lista-equipo-area/lista-equipo-area.component';
import { NuevoEquipoAreaComponent } from './components/nuevo-equipo-area/nuevo-equipo-area.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-equipo-area', component: ListaEquipoAreaComponent, data: { titulo: 'Equipos de Area' } },
      { path: 'nuevo-equipo-area', component: NuevoEquipoAreaComponent, data: { titulo: 'Registrar Equipo de Area' } },
      { path: '**', redirectTo: 'lista-equipo-area' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoAreaRoutingModule { }
