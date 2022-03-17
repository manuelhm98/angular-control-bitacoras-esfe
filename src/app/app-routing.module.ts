import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { RolesGuard } from './shared/core/guards/roles.guard';
import { SessionGuard } from './shared/core/guards/session.guard';
import { PagesComponent } from './shared/pages.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';
import { NotpageComponent } from './shared/pages/notpage/notpage.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [SessionGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'area',
        loadChildren: () => import('./area/area.module').then((m) => m.AreaModule),
        data: {
          role: ['Admin', 'Docente']
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'bitacora',
        loadChildren: () => import('./bitacora/bitacora.module').then((m) => m.BitacoraModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'cpu',
        loadChildren: () => import('./cpu/cpu.module').then((m) => m.CpuModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'equipo-area',
        loadChildren: () => import('./equipo-area/equipo-area.module').then((m) => m.EquipoAreaModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'falla',
        loadChildren: () => import('./falla/falla.module').then((m) => m.FallaModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then((m) => m.MonitorModule)
      },
      {
        path: 'mueble',
        loadChildren: () => import('./mueble/mueble.module').then((m) => m.MuebleModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'procesador',
        loadChildren: () => import('./procesador/procesador.module').then((m) => m.ProcesadorModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'puestos-trabajo',
        loadChildren: () => import('./puestos-trabajo/puestos-trabajo.module').then((m) => m.PuestosTrabajoModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'roles',
        loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'tipo-area',
        loadChildren: () => import('./tipo-area/tipo-area.module').then((m) => m.TipoAreaModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'tipo-falla',
        loadChildren: () => import('./tipo-falla/tipo-falla.module').then((m) => m.TipoFallaModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'ups',
        loadChildren: () => import('./ups/ups.module').then((m) => m.UpsModule),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule
        ),
        data: {
          role: 'Admin'
        },
        canActivate: [RolesGuard]
      },
      {
        path: 'modals',
        loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule
        )
      },
    ]
  },

  {
    path: '**', component: NotpageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
