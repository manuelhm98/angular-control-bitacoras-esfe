import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sidebar: boolean = true;
  constructor(
    private cookie: CookieService,
    private router: Router,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
  }

  logaout() {
    this.cookie.deleteAll('token');
    return this.router.navigate(['/', 'login'])
  }

  abrirSidebar() {

    if (this.sidebarService._ocultarSidebar) {
      this.sidebarService.abrirSidebar();
    } else {
      this.sidebarService.cerrarSidebar();
    }

  }




}
