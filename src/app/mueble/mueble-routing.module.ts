import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMueblesComponent } from './components/lista-muebles/lista-muebles.component';
import { NuevoMuebleComponent } from './components/nuevo-mueble/nuevo-mueble.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-muebles', component: ListaMueblesComponent, data: { titulo: 'Lista de Muebles' } },
    { path: 'nuevo-mueble', component: NuevoMuebleComponent, data: { titulo: 'Registrar Mueble' } },
    { path: '**', redirectTo: 'lista-muebles' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuebleRoutingModule { }
