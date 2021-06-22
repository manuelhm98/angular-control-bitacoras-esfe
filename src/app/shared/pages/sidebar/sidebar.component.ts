import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

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

  constructor(private sidebarService: SidebarService) {
    this.menuItems = sidebarService.puestosTrabajo;
    this.menuCentros = sidebarService.centrosComputo;
    this.menuBitacoras = sidebarService.bitacoras;
    this.menuUsuarios = sidebarService.usuario;
  }

  ngOnInit(): void {
  }

}
