import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';


@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrls: ['./lista-roles.component.css']
})
export class ListaRolesComponent implements OnInit {



  constructor(public roleService: RolesService) { }

  ngOnInit(): void {
    this.roleService.getListRole();
  }

  /**ENVIAR DATA */
  dataRole(role) {
    this.roleService.postDataRole(role);
  }

}
