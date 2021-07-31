import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarArea } from 'src/app/Interfaces/cargar-area.interfaces';
import { environment } from 'src/environments/environment';
import { Area } from '../models/area';


//* URL API WEB
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  //* GUARDAR 
  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${base_url}/area`, area);
  }

  //* EDIT
  updateArea(area: Area): Observable<Area> {
    return this.http.put<Area>(`${base_url}/area`, area);
  }

  //* DELETE
  deleteArea(id: number): Observable<Area> {
    return this.http.delete<Area>(`${base_url}/area/${id}`);
  }

  //* LIST PAGIN
  loadArea(page: number = 1) {
    const url = `${base_url}/area/lista?page=${page}`;
    return this.http.get<cargarArea>(url);
  }

  //* LIST AREA 
  listArea() {
    return this.http.get(`${base_url}/area`)
  }

  //* BY ID 
  byIdArea(id: number) {
    return this.http.get(`${base_url}/area/${id}`);
  }
}
