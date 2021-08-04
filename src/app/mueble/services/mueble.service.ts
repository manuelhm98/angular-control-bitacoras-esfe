import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mueble } from '../models/mueble';

//* URL API WEB 
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MuebleService {

  constructor(private http: HttpClient) { }

  //* CREATE 
  createMueble(mueble: Mueble): Observable<Mueble> {
    return this.http.post<Mueble>(`${base_url}/mueble`, mueble);
  }

  //* EDIT 
  updateMueble(mueble: Mueble): Observable<Mueble> {
    return this.http.put<Mueble>(`${base_url}/mueble`, mueble);
  }

  //* DELETE
  deleteMueble(id: number): Observable<Mueble> {
    return this.http.delete<Mueble>(`${base_url}/mueble/${id}`);
  }

  //* LIST PAGING 
  loadMueble(page: number = 1) {
    const url = `${base_url}/mueble/lista?page=${page}`;
    return this.http.get(url);
  }

  //* LIST MUEBLE 
  listMueble() {
    return this.http.get(`${base_url}/mueble`);
  }

  //* BYID 
  byIdMueble(id: number) {
    return this.http.get(`${base_url}/mueble/${id}`);
  }

}
