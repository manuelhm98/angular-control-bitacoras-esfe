import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  @Output() open: EventEmitter<any> = new EventEmitter();

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

}
