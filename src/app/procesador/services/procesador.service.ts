import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Procesador } from '../models/procesador';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProcesadorService {

  constructor(private http: HttpClient) { }

  //* CREATE 
  createProcesador(procesador: Procesador): Observable<Procesador> {
    return this.http.post<Procesador>(`${base_url}/procesador`, procesador);
  }

  //* EDIT 
  updateProcesador(procesador: Procesador): Observable<Procesador> {
    return this.http.put<Procesador>(`${base_url}/procesador`, procesador);
  }

  //* DELETE
  deleteProcesador(id: number): Observable<Procesador> {
    return this.http.delete<Procesador>(`${base_url}/procesador/${id}`);
  }

  //* LIST PAGING 
  loadProcesador(page: number = 1) {
    const url = `${base_url}/procesador/lista?page=${page}`
    return this.http.get(url);
  }

  //* LIST PROCESADOR 
  listProcesador() {
    return this.http.get(`${base_url}/procesador`)
  }

  //* BYID
  byIdProcesador(id: number) {
    return this.http.get(`${base_url}/procesador/${id}`);
  }
}
