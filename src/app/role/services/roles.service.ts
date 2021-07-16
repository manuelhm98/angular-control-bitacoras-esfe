import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Roles } from "../models/roles";
import { BehaviorSubject, Observable } from 'rxjs';

//**********URL API WEB **************/
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  /****Arreglo de Roles */
  listaRole: Roles[];

  private actualizarRoleForm = new BehaviorSubject<Roles>({} as any);

  constructor(private http: HttpClient) { }

  /********METODO GUARDAR********/
  createNewRole(roles: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${base_url}/role`, roles)
  }

  /********METODO LISTAR ROLE */
  getListRole() {
    this.http.get(`${base_url}/role`)
      .toPromise()
      .then((data) => {
        this.listaRole = data as Roles[];
      })
  }

  /**CARGAR ROLES */
  listRoles() {
    return this.http.get(`${base_url}/role`)
  }


  /***METODO PARA ENVIAR DATOS ENTRE COMPONENTES */
  postDataRole(role) {
    this.actualizarRoleForm.next(role);
  }

  /***METODO PARA RECIBIR DATOS ENTRE COMPONENTES */
  getDataRole(): Observable<Roles> {
    return this.actualizarRoleForm.asObservable();
  }


}
