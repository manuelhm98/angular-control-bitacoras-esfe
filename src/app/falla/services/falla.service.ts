import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarFalla } from 'src/app/Interfaces/cargar-falla.interfaces';
import { environment } from 'src/environments/environment';
import { Falla } from '../models/falla';


//* URL API WEB 
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FallaService {

  constructor(private http: HttpClient) { }

  //* CREATE 
  createFalla(falla: Falla): Observable<Falla> {
    return this.http.post<Falla>(`${base_url}/falla`, falla);
  }

  //* EDIT 
  editFalla(falla: Falla): Observable<Falla> {
    return this.http.put<Falla>(`${base_url}/falla`, falla);
  }

  //* DELETE 
  deleteFalla(id: number): Observable<Falla> {
    return this.http.delete<Falla>(`${base_url}/falla/${id}`);
  }

  //* LIST PAGING
  loadingFalla(page: number = 1) {
    const url = `${base_url}/falla?page=${page}`;
    return this.http.get<cargarFalla>(url);
  }

  //* LISTA FALLA
  listFalla() {
    return this.http.get(`${base_url}/falla`);
  }

  //* BY ID 
  byIdFalla(id: number) {
    return this.http.get(`${base_url}/falla/${id}`);
  }
}
