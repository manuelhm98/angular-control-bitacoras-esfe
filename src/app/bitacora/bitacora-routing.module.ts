import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuard } from '../shared/core/guards/roles.guard';
import { ListaBitacoraComponent } from './components/lista-bitacora/lista-bitacora.component';
import { NuevaBitacoraComponent } from './components/nueva-bitacora/nueva-bitacora.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'lista-bitacora', component: ListaBitacoraComponent, data:
      {
        titulo: 'Bitacoras',
        role: ['Admin', 'Supervisor']
      },
      canActivate: [RolesGuard]
    },
    {
      path: 'nueva-bitacora', component: NuevaBitacoraComponent, data:
      {
        titulo: 'Registrar Bitacora',
        role: ['Admin', 'Supervisor', 'Docente']
      },
      canActivate: [RolesGuard]
    },
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
