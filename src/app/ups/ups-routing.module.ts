import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUpsComponent } from './components/lista-ups/lista-ups.component';
import { NuevoUpsComponent } from './components/nuevo-ups/nuevo-ups.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-ups', component: ListaUpsComponent, data: { titulo: 'Ups' } },
    { path: 'nuevo-ups/:id', component: NuevoUpsComponent, data: { titulo: 'Registrar Ups' } },
    { path: '**', redirectTo: 'lista-ups' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpsRoutingModule { }
