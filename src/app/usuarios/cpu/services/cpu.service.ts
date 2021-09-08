import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cargarCpu } from 'src/app/shared/Interface/cargar-cpu.interfaces';
import { environment } from 'src/environments/environment';
import { Cpu } from '../models/cpu';


//* URL API WEB
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CpuService {

  //* EVENTS
  public newEvent: EventEmitter<Cpu> = new EventEmitter<Cpu>();

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
  createCpu(cpu: Cpu): Observable<Cpu> {
    return this.http.post<Cpu>(`${base_url}/cpu`, cpu);
  }

  //* EDIT
  editCpu(cpu: Cpu): Observable<Cpu> {
    return this.http.put<Cpu>(`${base_url}/cpu`, cpu);
  }

  //* DELETE
  deleteCpu(id: number): Observable<Cpu> {
    return this.http.delete<Cpu>(`${base_url}/cpu/${id}`);
  }

  //* LIST PAGING
  loadingCpu(page: number = 1) {
    const url = `${base_url}/cpu/lista?page=${page}`;
    return this.http.get<cargarCpu>(url);
  }

  //* LIST CPU
  listCpu() {
    return this.http.get(`${base_url}/cpu`);
  }

  //* BY ID
  byIdCpu(id: number) {
    return this.http.get(`${base_url}/cpu/${id}`);
  }


}
