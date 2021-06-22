import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Roles } from "../models/roles";
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';


//**********VARIABLES**************/
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  /********METODO GUARDAR********/
  createNewRole(roles: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${base_url}/role`, roles)
  }
}
