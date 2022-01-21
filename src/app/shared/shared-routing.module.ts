import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaModalComponent } from './modals/area-modal/area-modal.component';
import { MonitorModalComponent } from './modals/monitor-modal/monitor-modal.component';


//Importacion de Modulos


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'modal-area', component: AreaModalComponent, data: { titulo: '' } },
      { path: 'modal-monitor', component: MonitorModalComponent, data: { titulo: '' } },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
