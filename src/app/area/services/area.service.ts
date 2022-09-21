import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarArea } from 'src/app/shared/Interface/cargar-area.interfaces';
import { environment } from 'src/environments/environment';
import { Area } from '../models/area';


//* URL API WEB
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  //* EVENTS
  public newEvent: EventEmitter<Area> = new EventEmitter<Area>();

  constructor(private http: HttpClient) { }

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


  /**
   * It's a function that returns an observable of type cargarArea, which is an interface that I created
   * to handle the data that I'm getting from the API
   * @param {number} [page=1] - The page number to load.
   * @param {string} [name] - The name of the area to search for.
   * @param {string} [tipo] - string = ""
   * @returns an observable of the type cargarArea.
   */
  loadArea(page: number = 1, name: string = "", tipo: string = "") {
    if (name != "" && tipo != "") {
      const url = `${base_url}/area/lista?page=${page}&name=${name}&tipo=${tipo}`;
      return this.http.get<cargarArea>(url);
    } if (name != "") {
      const url = `${base_url}/area/lista?page=${page}&name=${name}`;
      return this.http.get<cargarArea>(url);
    } if (tipo != "") {
      const url = `${base_url}/area/lista?page=${page}&tipo=${tipo}`;
      return this.http.get<cargarArea>(url);
    } else {
      const url = `${base_url}/area/lista?page=${page}`;
      return this.http.get<cargarArea>(url);
    }
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
