import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAreaComponent } from './components/lista-area/lista-area.component';
import { NuevaAreaComponent } from './components/nueva-area/nueva-area.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-area', component: ListaAreaComponent, data: { titulo: 'Lista Areas' } },
      { path: 'nueva-area', component: NuevaAreaComponent, data: { titulo: 'Nueva Area' } },
      { path: '**', redirectTo: 'lista-area' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRoutingModule { }
