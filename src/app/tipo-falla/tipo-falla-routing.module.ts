import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTipoFallaComponent } from './components/lista-tipo-falla/lista-tipo-falla.component';
import { NuevoTipoFallaComponent } from './components/nuevo-tipo-falla/nuevo-tipo-falla.component';
import { TipoFallaComponent } from './components/tipo-falla/tipo-falla.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-tipo-falla', component: ListaTipoFallaComponent, data: { titulo: 'Tipos de Falla' } },
      { path: 'nuevo-tipo-falla/:id', component: NuevoTipoFallaComponent, data: { titulo: 'Registrar Tipo Falla' } },
      { path: '**', redirectTo: 'lista-tipo-falla' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoFallaRoutingModule { }
