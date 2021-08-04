import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { report } from 'process';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TipoFalla } from '../models/tipo-falla';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TipoFallaService {

  constructor(private http: HttpClient) { }

  //* CREATE 
  createTipoFalla(tipoFalla: TipoFalla): Observable<TipoFalla> {
    return this.http.post<TipoFalla>(`${base_url}/tipofalla`, tipoFalla);
  }

  //* EDIT 
  updateTipoFalla(tipofalla: TipoFalla): Observable<TipoFalla> {
    return this.http.put<TipoFalla>(`${base_url}/tipofalla`, tipofalla);
  }

  //* DELETE 
  deleteTipoFalla(id: number): Observable<TipoFalla> {
    return this.http.delete<TipoFalla>(`${base_url}/tipofalla/${id}`);
  }

  //* LIST PAGING 
  loadTipoFalla(page: number = 1) {
    const url = `${base_url}/tipofalla/lista?page=${page}`;
    return this.http.get(url);
  }

  //* LIST TIPOFALLAS 
  listTipoFallas() {
    return this.http.get(`${base_url}/tipofalla`);
  }

  //* BYID 
  byIdTipoFalla(id: number) {
    return this.http.get(`${base_url}/tipofalla/${id}`);
  }
}
