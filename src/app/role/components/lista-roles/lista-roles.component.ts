import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Roles } from '../../models/roles';
import { RolesService } from '../../services/roles.service';


@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {

  //* DECLARACION DE VARIBALES
  public totalRoles: number = 0;
  public roles: Roles[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(public roleService: RolesService) { }

  ngOnInit(): void {
    this.loadingRole();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.roleService.newRegister.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingRole();
    })
  }

  abrirModal() {
    this.roleService.abrirModal();
  }

  //* CARGAR ROLES
  loadingRole() {
    this.roleService.getListRole(this.page).subscribe(({ TotalRegistros, Roles }) => {
      this.totalRoles = TotalRegistros;
      this.roles = Roles
    })
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingRole();
  }



}
