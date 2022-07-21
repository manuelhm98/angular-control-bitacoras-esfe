import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PuestosTrabajo } from '../../models/puestos-trabajo';
import { PuestosTrabajoService } from '../../services/puestos-trabajo.service';

@Component({
  selector: 'app-lista-puestos-trabajo',
  templateUrl: './lista-puestos-trabajo.component.html',
  styleUrls: ['./lista-puestos-trabajo.component.css']
})
export class ListaPuestosTrabajoComponent implements OnInit {

  //* DECLARACION DE VARIABLES
  public totalPuestosTrabajo: number = 0;
  public puestosTrabajo: PuestosTrabajo[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private puestosTrabajoService: PuestosTrabajoService
  ) { }

  ngOnInit(): void {
    this.loadinPuestos();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.puestosTrabajoService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinPuestos();
    })
  }



  loadinPuestos() {
    this.puestosTrabajoService.loadPuestosTrabajo(this.page).subscribe(({ TotalRegistros, PuestosTrabajos }) => {
      this.totalPuestosTrabajo = TotalRegistros;
      this.puestosTrabajo = PuestosTrabajos;
    })
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadinPuestos();
  }


  abrirModal() {

  }

  deletePuestoTrabajo(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta a punto de eliminar un registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.puestosTrabajoService.deletePuestosTrabajo(id)
          .subscribe(resp => {
            this.loadinPuestos();
            Swal.fire(
              'Mueble eliminado',
              `Mueble eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }
}
