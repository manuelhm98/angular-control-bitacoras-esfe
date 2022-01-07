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
  private _ocultarModalArea: boolean = true;

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
  private _ocultarModalMonitor: boolean = true;

  get ocultarModalMonitor() {
    return this._ocultarModalMonitor;
  }
  abrirModaMonitor() {
    this._ocultarModalMonitor = false;
  }

  cerrarModalMonitor() {
    this._ocultarModalMonitor = true;
  }

}
