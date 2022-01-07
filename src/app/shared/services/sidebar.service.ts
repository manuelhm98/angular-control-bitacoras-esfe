import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


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
        { titulo: 'Tipo de fallas', url: '/tipo-falla' }
      ]
    }
  ]

  usuario: any[] = [
    {
      titulo: 'Configuracion',
      icon: 'fas fa-cogs',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Roles', url: '/roles' }
      ]
    }
  ]

  constructor() { }
}
