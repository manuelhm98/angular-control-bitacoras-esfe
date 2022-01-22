import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PuestosTrabajo } from '../models/puestos-trabajo';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PuestosTrabajoService {

  constructor(private http: HttpClient) { }

  //* EVENTS
  public newEvent: EventEmitter<PuestosTrabajo> = new EventEmitter<PuestosTrabajo>();

  //* CREATE
  createPuestosTrabajo(puestosTrabajo: PuestosTrabajo): Observable<PuestosTrabajo> {
    return this.http.post<PuestosTrabajo>(`${base_url}/puestostrabajo`, puestosTrabajo);
  }

  //* EDIT
  updatePuestosTrabajo(puestosTrabajo: PuestosTrabajo): Observable<PuestosTrabajo> {
    return this.http.put<PuestosTrabajo>(`${base_url}/puestostrabajo`, puestosTrabajo);
  }

  //* DELETE
  deletePuestosTrabajo(id: number): Observable<PuestosTrabajo> {
    return this.http.delete<PuestosTrabajo>(`${base_url}/puestostrabajo/${id}`);
  }

  //* LIST PAGING
  loadPuestosTrabajo(page: number = 1) {
    const url = `${base_url}/puestostrabajo/lista?page?${page}`;
    return this.http.get(url);
  }

  //* LISTA PUESTOS TRABAJO
  listPuestosTrabajo() {
    return this.http.get(`${base_url}/puestostrabajo`);
  }

  //* BYID
  byIdPuestosTrabajo(id: number) {
    return this.http.get(`${base_url}/puestostrabajo/${id}`);
  }
}
