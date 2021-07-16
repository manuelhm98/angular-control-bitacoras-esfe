import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

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
    return this.http.post<Usuario>(`${base_url}/usuario/guardar`, usuario);
  }

  /**LISTAR USUARIOS */
  listUser() {
    this.http.get(`${base_url}/usuario/lista`).toPromise().then((data) => {
      this.usuario = data as Usuario[];
    })
  }

}
