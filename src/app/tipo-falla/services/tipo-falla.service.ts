import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { cargarTipoFalla } from 'src/app/shared/Interface/cargar-tipo-falla.interfaces';
import { environment } from 'src/environments/environment';
import { TipoFalla } from '../models/tipo-falla';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TipoFallaService {

  //* EVENTS
  public newEvent: EventEmitter<TipoFalla> = new EventEmitter<TipoFalla>();

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
    return this.http.get<cargarTipoFalla>(url);
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
