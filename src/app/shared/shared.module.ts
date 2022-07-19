import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './pages/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NotpageComponent } from './pages/notpage/notpage.component';
import { AreaModalComponent } from './modals/area-modal/area-modal.component';
import { MonitorModalComponent } from './modals/monitor-modal/monitor-modal.component';
import { UpsModalComponent } from './modals/ups-modal/ups-modal.component';
import { CpuModalComponent } from './modals/cpu-modal/cpu-modal.component';
import { MuebleModalComponent } from './modals/mueble-modal/mueble-modal.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalsComponent } from './modals/modals.component';
import { FallasModalComponent } from './modals/fallas-modal/fallas-modal.component';
import { PuestosTrabajoModalComponent } from './modals/puestos-trabajo-modal/puestos-trabajo-modal.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, BreadcrumbComponent, DashboardComponent, PagesComponent, NotpageComponent, AreaModalComponent, MonitorModalComponent, UpsModalComponent, CpuModalComponent, MuebleModalComponent, ModalsComponent, FallasModalComponent, PuestosTrabajoModalComponent],
  imports: [CommonModule, RouterModule, SharedRoutingModule, NgxChartsModule, BrowserAnimationsModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, BreadcrumbComponent, MonitorModalComponent],
})
export class SharedModule { }
