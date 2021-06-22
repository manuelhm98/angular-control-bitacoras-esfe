import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTipoAreaComponent } from './components/lista-tipo-area/lista-tipo-area.component';
import { NuevoTipoAreaComponent } from './components/nuevo-tipo-area/nuevo-tipo-area.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-tipo-area', component: ListaTipoAreaComponent, data: { titulo: 'Tipos de area' } },
    { path: 'nuevo-tipo-area', component: NuevoTipoAreaComponent, data: { titulo: 'Registrar Tipo de Area' } },
    { path: '**', redirectTo: 'lista-tipo-area' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAreaRoutingModule { }
