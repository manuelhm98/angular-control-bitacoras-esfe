import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  @Output() openArea: EventEmitter<any> = new EventEmitter();
  @Output() openMonitor: EventEmitter<any> = new EventEmitter();

  areaId: number;
  area: string;

  constructor() { }

  //* MODALS AREA
  public _ocultarModalArea: boolean = true;

  get ocultarModalArea() {
    return this._ocultarModalArea;
  }

  abrirModaArea() {
    this._ocultarModalArea = false;
  }

  cerrarModalArea() {
    this._ocultarModalArea = true;
  }

  //* MODAL MONITOR
  public _ocultarModalMonitor: boolean = true;

  get ocultarModalMonitor() {
    return this._ocultarModalMonitor;
  }

  abrirModaMonitor() {
    this._ocultarModalMonitor = false;
  }

  cerrarModalMonitor() {
    this._ocultarModalMonitor = true;
  }

  //* MODAL CPU
  public _ocultarModalCpu = false;

  get ocultarModalCpu() {
    return this._ocultarModalCpu;
  }

  abriModalCpu() {
    this._ocultarModalCpu = false;
  }

  cerrarModalCpu() {
    this._ocultarModalCpu = true;
  }


  //* MODAL MUEBLE


  //* MODAL UPS

}