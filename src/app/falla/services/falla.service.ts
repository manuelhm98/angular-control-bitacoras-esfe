import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarFalla } from 'src/app/shared/Interface/cargar-falla.interfaces';
import { environment } from 'src/environments/environment';
import { Falla } from '../models/falla';


//* URL API WEB 
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FallaService {

  //* EVENTS
  public newEvent: EventEmitter<Falla> = new EventEmitter<Falla>();

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
    const url = `${base_url}/falla/lista?page=${page}`;
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
