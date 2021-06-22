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

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, BreadcrumbComponent, DashboardComponent, PagesComponent, NotpageComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, BreadcrumbComponent],
})
export class SharedModule { }
