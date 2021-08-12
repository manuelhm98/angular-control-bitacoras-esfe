import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { cargarMonitor } from 'src/app/shared/Interface/cargar-monitor.interfaces';
import { environment } from 'src/environments/environment';
import { Monitor } from '../models/monitor';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MonitorService {


  //* EVENTS
  public newRolEvent: EventEmitter<Monitor> = new EventEmitter<Monitor>();

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
  createMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(`${base_url}/monitor`, monitor);
  }

  //* EDIT 
  updateMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.put<Monitor>(`${base_url}/monitor`, monitor);
  }

  //* DELETE
  deleteMonitor(id: number): Observable<Monitor> {
    return this.http.delete<Monitor>(`${base_url}/monitor/${id}`);
  }

  //* LIST PAGING 
  loadMonitor(page: number = 1) {
    const url = `${base_url}/monitor//lista?page=${page}`
    return this.http.get<cargarMonitor>(url);
  }

  //* LIST MONITOR 
  listMonitor() {
    return this.http.get(`${base_url}/monitor`);
  }

  //* BY ID 
  byIdMonitor(id: number) {
    return this.http.get(`${base_url}/monitor/${id}`);
  }
}
