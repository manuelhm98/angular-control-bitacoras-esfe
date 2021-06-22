import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaBitacoraComponent } from './components/lista-bitacora/lista-bitacora.component';
import { NuevaBitacoraComponent } from './components/nueva-bitacora/nueva-bitacora.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'lista-bitacora', component: ListaBitacoraComponent, data: { titulo: 'Bitacoras' } },
    { path: 'nueva-bitacora', component: NuevaBitacoraComponent, data: { titulo: 'Registrar Bitacora' } },
    {
      path: '**', redirectTo: 'lista-bitacora'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule { }
