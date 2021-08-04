import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoArea } from '../models/tipo-area';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TipoAreaService {

  constructor(private http: HttpClient) { }

  //* CREATE 
  createTipoArea(tipoArea: TipoArea): Observable<TipoArea> {
    return this.http.post<TipoArea>(`${base_url}/tipoarea`, tipoArea);
  }

  //* EDIT 
  updateTipoArea(tipoarea: TipoArea): Observable<TipoArea> {
    return this.http.put<TipoArea>(`${base_url}/tipoarea`, tipoarea);
  }

  //* DELETE 
  deleteTipoArea(id: number): Observable<TipoArea> {
    return this.http.delete<TipoArea>(`${base_url}/tipoarea/${id}`);
  }

  //* LIST PAGING 
  loadTipoAreas(page: number = 1) {
    const url = `${base_url}/tipoarea/lista?page=${page}`;
    return this.http.get(url);
  }

  //* LIST TIPO AREAS 
  listTipoAreas() {
    return this.http.get(`${base_url}/tipoarea`);
  }

  //* BYID 
  byIdTipoAreas(id: number) {
    return this.http.get(`${base_url}/tipoarea/${id}`);
  }
}
