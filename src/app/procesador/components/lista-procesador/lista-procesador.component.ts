import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Procesador } from '../../models/procesador';
import { ProcesadorService } from '../../services/procesador.service';

@Component({
  selector: 'app-lista-procesador',
  templateUrl: './lista-procesador.component.html',
  styleUrls: ['./lista-procesador.component.css']
})
export class ListaProcesadorComponent implements OnInit {

  //* VARIBLES
  public totalProcesador: number = 0;
  public procesador: Procesador[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private procesadorService: ProcesadorService
  ) { }

  ngOnInit(): void {
    this.loadingProcesador();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.procesadorService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingProcesador();
    })
  }

  abrirModal() {
    this.procesadorService.abrirModal();
  }
  deleteProcesador(id: number) {
    Swal.fire({
      title: '¿Eliminar Procesador?',
      text: 'Esta a punto de eliminar un Procesador',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.procesadorService.deleteProcesador(id)
          .subscribe(resp => {
            this.loadingProcesador();
            Swal.fire(
              'Procesador eliminado',
              `Procesador eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }
  //* CARGAR MONITORES
  loadingProcesador() {
    this.procesadorService.loadProcesador(this.page).subscribe(({ TotalRegistros, Procesadors }) => {
      this.totalProcesador = TotalRegistros;
      this.procesador = Procesadors
    })
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingProcesador();
  }
}
