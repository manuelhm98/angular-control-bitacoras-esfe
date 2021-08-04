import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateCallback } from '@popperjs/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ups } from '../models/ups';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UpsService {

  constructor(private http: HttpClient) { }

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
    return this.http.get(url);
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
