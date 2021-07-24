import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { cargarUsuario } from 'src/app/Interfaces/cargar-usuarios.interfaces';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

/***URL API WEB */
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario[] = [];

  constructor(private http: HttpClient) { }

  /**METODO GUARDAR USUARIOS */
  createNewUser(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${base_url}/usuario`, usuario);
  }

  //* CARGAR USUARIOS PAGINADOS 
  loadUser(page: number = 1) {
    const url = `${base_url}/usuario/lista?page=${page}`
    return this.http.get<cargarUsuario>(url)
  }

  //* ELIMINAR USUARIOS
  deleteUser(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${base_url}/usuario/${id}`)
  }

  //* OBTENER MEDICO POR ID 
  userById(id: number) {
    return this.http.get(`${base_url}/${id}`);
  }

}
