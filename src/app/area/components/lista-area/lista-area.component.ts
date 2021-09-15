import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Area } from '../../models/area';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-lista-area',
  templateUrl: './lista-area.component.html',
  styleUrls: ['./lista-area.component.css']
})
export class ListaAreaComponent implements OnInit {

  //* DECLARACION DE VARIABLES 
  public totalArea: number = 0;
  public area: Area[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.loadinArea();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.areaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinArea();
    })
  }




  abrirModal() {
    this.areaService.abrirModal();
  }

  loadinArea() {
    this.areaService.loadArea(this.page).subscribe(({ TotalRegistros, Areas }) => {
      this.totalArea = TotalRegistros;
      this.area = Areas
    })
  }

  //* Paginacion 
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalArea + 1) {
      this.page -= valor;
    }
    this.loadinArea();
  }

  deleteArea(id: number) {
    Swal.fire({
      title: '¿Eliminar Area?',
      text: 'Esta a punto de eliminar una AREA',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.areaService.deleteArea(id)
          .subscribe(resp => {
            this.loadinArea();
            Swal.fire(
              'AREA eliminado',
              `AREA eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }
}
