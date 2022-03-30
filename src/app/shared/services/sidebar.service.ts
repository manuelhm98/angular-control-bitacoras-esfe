import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  //*
  public _ocultarSidebar: boolean = false;

  get ocultarSidebar() {
    return this._ocultarSidebar;
  }

  abrirSidebar() {
    this._ocultarSidebar = false;
  }

  cerrarSidebar() {
    this._ocultarSidebar = true;
  }

  //TODO SIDEBAR

  puestosTrabajo: any[] = [
    {
      titulo: 'Inventario',
      icon: 'fas fa-dolly-flatbed',
      submenu: [
        { titulo: 'Muebles', url: '/mueble' },
        { titulo: 'UPS', url: '/ups' },
        { titulo: 'Monitores', url: '/monitor' },
        { titulo: 'CPU', url: '/cpu' },
        { titulo: 'Procesador', url: '/procesador' },
      ]
    }
  ]

  centrosComputo: any[] = [
    {
      titulo: 'Centros de computo',
      icon: 'fas fa-laptop-house',

      submenu: [
        { titulo: 'Areas de computo', url: '/area' },
        { titulo: 'Tipo de area', url: '/tipo-area' },
        { titulo: 'Equipo de areas', url: '/equipo-area' },
      ]
    }
  ]

  bitacoras: any[] = [
    {
      titulo: 'Fallas',
      icon: 'fas fa-file-alt',
      submenu: [
        { titulo: 'Fallas', url: '/falla' },
        { titulo: 'Tipo de fallas', url: '/tipo-falla' },

      ]
    }
  ]

  usuario: any[] = [
    {
      titulo: 'Mantenimiento',
      icon: 'fas fa-cogs',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Roles', url: '/roles' }
      ]
    }
  ]

  constructor() { }
}
