import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarUps } from 'src/app/shared/Interface/cargar-ups.interfaces';
import { environment } from 'src/environments/environment';
import { Ups } from '../models/ups';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UpsService {

  //* EVENTS
  public newEvent: EventEmitter<Ups> = new EventEmitter<Ups>();

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
  createUps(ups: Ups): Observable<Ups> {
    return this.http.post<Ups>(`${base_url}/ups`, ups);
  }

  //* EDIT 
  updateUps(ups: Ups): Observable<Ups> {
    return this.http.put<Ups>(`${base_url}/ups`, ups);
  }

  //* DELETE 
  deleteUps(id: number): Observable<Ups> {
    return this.http.delete<Ups>(`${base_url}/ups/${id}`);
  }

  //* LIST PAGING 
  loadUps(page: number = 1) {
    const url = `${base_url}/ups/lista?page=${page}`;
    return this.http.get<cargarUps>(url);
  }

  //* LIST UPS 
  listUps() {
    return this.http.get(`${base_url}/ups`);
  }

  //* BYID 
  byIdUps(id: number) {
    return this.http.get(`${base_url}/ups/${id}`);
  }
}
