import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaFallaComponent } from './components/lista-falla/lista-falla.component';
import { NuevaFallaComponent } from './components/nueva-falla/nueva-falla.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-fallas', component: ListaFallaComponent, data: { titulo: 'Lista de Fallas' } },
    { path: 'nueva-fallas', component: NuevaFallaComponent, data: { titulo: 'Registrar Fallas' } },
    { path: '**', redirectTo: 'lista-fallas' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FallaRoutingModule { }
