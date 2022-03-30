import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  menuCentros: any[];
  menuBitacoras: any[];
  menuUsuarios: any[];
  public rol;

  constructor(
    private sidebarService: SidebarService,
    private cookie: CookieService
  ) {
    this.menuItems = sidebarService.puestosTrabajo;
    this.menuCentros = sidebarService.centrosComputo;
    this.menuBitacoras = sidebarService.bitacoras;
    this.menuUsuarios = sidebarService.usuario;

  }

  ngOnInit(): void {
    this.checkRole();
  }


  //TODO FUNCIONAR PARA OBTENER ROL DE USUARIO LOGUA
  checkRole() {
    try {

      const token = this.cookie.get('token');
      const tokenInfo = this.getDecodedAccessToken(token);
      const role = tokenInfo.role;

      this.rol = role
      return this.rol;
    } catch (error) {
      return false
    }
  }


  //TODO FUNCION PARA DECODIFICAR JWT
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
