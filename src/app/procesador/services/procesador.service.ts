import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarProcesador } from 'src/app/shared/Interface/cargar-procesador';
import { environment } from 'src/environments/environment';
import { Procesador } from '../models/procesador';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProcesadorService {

  public newEvent: EventEmitter<Procesador> = new EventEmitter<Procesador>();

  constructor(private http: HttpClient) { }

  //? MODALS 
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
  //TODO METODOS

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
    return this.http.get<cargarProcesador>(url);
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
