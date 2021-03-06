import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Roles } from "../models/roles";
import { Observable } from 'rxjs';
import { cargarRoles } from 'src/app/shared/Interface/cargar-roles.interfaces';


//**********URL API WEB **************/
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  /****Arreglo de Roles */
  listaRole: Roles[] = [];

  //* EVENTS
  public newRegister: EventEmitter<Roles> = new EventEmitter<Roles>();

  constructor(private http: HttpClient) { }

  /********METODO GUARDAR********/
  createNewRole(roles: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${base_url}/rol`, roles)
  }


  //* MODALS 
  private _ocultarModal: boolean = true;

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }


  /********METODO LISTAR ROLE */
  /*   getListRole() {
      this.http.get(`${base_url}/role`)
        .toPromise()
        .then((data) => {
          this.listaRole = data as Roles[];
        })
    } */
  //*METODO LISTAR ROLE 
  getListRole(page: number = 1) {
    const url = `${base_url}/rol/lista?page=${page}`
    return this.http.get<cargarRoles>(url)
  }

  //* ELIMINAR ROLES 
  deleteRoles(id: number): Observable<Roles> {
    return this.http.delete<Roles>(`${base_url}/rol/${id}`)
  }
  //* UPDATE ROLES
  updateRoles(roles: Roles) {
    return this.http.put(`${base_url}/rol`, roles)
  }

  //* BY ID ROLE
  byIdRoles(id: number) {
    return this.http.get(`${base_url}/rol/${id}`)
  }
  //*CARGAR ROLES 
  listRoles() {
    return this.http.get(`${base_url}/rol`)
  }



}
