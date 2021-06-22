import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  puestosTrabajo: any[] = [
    {
      titulo: 'Puestos de trabajo',
      icon: 'fas fa-desktop',
      url: '/puestos-trabajo',
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
      url: '/area',
      submenu: [
        { titulo: 'Tipo de area', url: '/tipo-area' },
        { titulo: 'Equipo de areas', url: '/equipo-area' },
      ]
    }
  ]

  bitacoras: any[] = [
    {
      titulo: 'Bitacora',
      icon: 'fas fa-file-alt',
      url: '/bitacora',
      submenu: [
        { titulo: 'Fallas', url: '/falla' },
        { titulo: 'Tipo de fallas', url: '/tipo-falla' }
      ]
    }
  ]

  usuario: any[] = [
    {
      titulo: 'Usuarios',
      icon: 'fas fa-users-cog',
      url: '/usuarios',
      submenu: [
        { titulo: 'Roles', url: '/roles' },
        { titulo: 'Nuevo rol', url: 'roles//nuevo-rol' }
      ]
    }
  ]

  constructor() { }
}
