import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarEquipoArea } from 'src/app/shared/Interface/cargar-equipo-area.interfaces';
import { environment } from 'src/environments/environment';
import { EquipoArea } from '../models/equipo-area';


//* URL API WEB
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EquipoAreaService {

  constructor(private http: HttpClient) { }

  //* CREATE 
  createEquipoArea(equipoArea: EquipoArea): Observable<EquipoArea> {
    return this.http.post<EquipoArea>(`${base_url}/equipoarea`, equipoArea);
  }

  //* EDIT 
  editEquipoArea(equipoArea: EquipoArea): Observable<EquipoArea> {
    return this.http.put<EquipoArea>(`${base_url}/equipoarea`, equipoArea)
  }

  //* DELETE 
  deleteEquipoArea(id: number): Observable<EquipoArea> {
    return this.http.delete<EquipoArea>(`${base_url}/equipoarea/${id}`);
  }

  //* LIST PAGING 
  loadingEquipoArea(page: number = 1) {
    const url = `${base_url}/equipoarea?page=${page}`;
    return this.http.get<cargarEquipoArea>(url);
  }


  //* LIST EQUIPO AREA
  listEquipoArea() {
    return this.http.get(`${base_url}/equipoarea`);
  }

  //* BY ID
  byIdEquipoArea(id: number) {
    return this.http.get(`${base_url}/equipoarea/${id}`);
  }

}
