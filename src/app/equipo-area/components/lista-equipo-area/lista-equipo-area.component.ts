import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EquipoArea } from '../../models/equipo-area';
import { EquipoAreaService } from '../../services/equipo-area.service';

@Component({
  selector: 'app-lista-equipo-area',
  templateUrl: './lista-equipo-area.component.html',
  styleUrls: ['./lista-equipo-area.component.css']
})
export class ListaEquipoAreaComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  public totalEquipoArea: number = 0;
  public equipoArea: EquipoArea[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private equipoAreaService: EquipoAreaService
  ) { }

  ngOnInit(): void {
    this.loadingEquipoArea();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.equipoAreaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingEquipoArea();
    })
  }


  loadingEquipoArea() {
    this.equipoAreaService.loadingEquipoArea(this.page).subscribe(({ TotalRegistros, EquipoAreas }) => {
      this.totalEquipoArea = TotalRegistros;
      this.equipoArea = EquipoAreas;
    })
  }

  abrirModal() {
    this.equipoAreaService.abrirModal();
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingEquipoArea();
  }

  deleteEquipoArea(nombre: string, id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta a punto de eliminar a ' + nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.equipoAreaService.deleteEquipoArea(id)
          .subscribe(resp => {
            this.loadingEquipoArea();
            Swal.fire(
              'Eliminado',
              `${nombre} fue eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }
}
