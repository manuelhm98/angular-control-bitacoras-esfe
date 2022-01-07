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



@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, BreadcrumbComponent, DashboardComponent, PagesComponent, NotpageComponent, AreaModalComponent, MonitorModalComponent, UpsModalComponent, CpuModalComponent, MuebleModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, BreadcrumbComponent],
})
export class SharedModule { }
