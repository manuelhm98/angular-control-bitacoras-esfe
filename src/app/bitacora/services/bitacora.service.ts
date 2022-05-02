import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarBitacora } from 'src/app/shared/Interface/cargar-bitacora.interfaces';
import { environment } from 'src/environments/environment';
import { Bitacora } from '../models/bitacora';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private http: HttpClient) { }

  //* EVENTS
  public newEvent: EventEmitter<Bitacora> = new EventEmitter<Bitacora>();

  //* CREATE
  createBitacora(bitacora: Bitacora): Observable<Bitacora> {
    return this.http.post<Bitacora>(`${base_url}/bitacora`, bitacora);
  }

  //* EDIT
  updateBitacora(bitacora: Bitacora): Observable<Bitacora> {
    return this.http.put<Bitacora>(`${base_url}/bitacora`, bitacora);
  }

  //* DELETE
  deleteBitacora(id: number): Observable<Bitacora> {
    return this.http.delete<Bitacora>(`${base_url}/bitacora/${id}`)
  }

  //* LIST PAGING
  loadingBitacora(page: number = 1) {
    const url = `${base_url}/bitacora/lista?page=${page}`;
    return this.http.get<cargarBitacora>(url);
  }

  //* LISTA BITACORAS
  listBitacora() {
    return this.http.get(`${base_url}/bitacora`)
  }

  //* BY ID
  byIdBitacora(id: number) {
    return this.http.get(`${base_url}/bitacora/${id}`);
  }
}
