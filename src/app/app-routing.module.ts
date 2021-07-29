import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginComponent } from './auth/components/login/login.component';
import { RolesComponent } from './role/components/roles/roles.component';
import { RoleModule } from './role/role.module';
import { PagesComponent } from './shared/pages.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { NotpageComponent } from './shared/pages/notpage/notpage.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'area',
        loadChildren: () => import('./area/area.module').then((m) => m.AreaModule)
      },
      {
        path: 'bitacora',
        loadChildren: () => import('./bitacora/bitacora.module').then((m) => m.BitacoraModule)
      },
      {
        path: 'cpu',
        loadChildren: () => import('./cpu/cpu.module').then((m) => m.CpuModule)
      },
      {
        path: 'equipo-area',
        loadChildren: () => import('./equipo-area/equipo-area.module').then((m) => m.EquipoAreaModule)
      },
      {
        path: 'falla',
        loadChildren: () => import('./falla/falla.module').then((m) => m.FallaModule)
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then((m) => m.MonitorModule)
      },
      {
        path: 'mueble',
        loadChildren: () => import('./mueble/mueble.module').then((m) => m.MuebleModule)
      },
      {
        path: 'procesador',
        loadChildren: () => import('./procesador/procesador.module').then((m) => m.ProcesadorModule)
      },
      {
        path: 'puestos-trabajo',
        loadChildren: () => import('./puestos-trabajo/puestos-trabajo.module').then((m) => m.PuestosTrabajoModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./role/role.module').then((m) => m.RoleModule)
      },
      {
        path: 'tipo-area',
        loadChildren: () => import('./tipo-area/tipo-area.module').then((m) => m.TipoAreaModule)
      },
      {
        path: 'tipo-falla',
        loadChildren: () => import('./tipo-falla/tipo-falla.module').then((m) => m.TipoFallaModule)
      },
      {
        path: 'ups',
        loadChildren: () => import('./ups/ups.module').then((m) => m.UpsModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule
        )
      },
    ]
  },

  {
    path: '**', component: NotpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
