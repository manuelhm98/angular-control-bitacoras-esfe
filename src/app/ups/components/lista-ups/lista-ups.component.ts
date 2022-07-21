import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Ups } from '../../models/ups';
import { UpsService } from '../../services/ups.service';

@Component({
  selector: 'app-lista-ups',
  templateUrl: './lista-ups.component.html',
  styleUrls: ['./lista-ups.component.css']
})
export class ListaUpsComponent implements OnInit {

  //* VARIBLES
  public totalUps: number = 0;
  public upss: Ups[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private upsService: UpsService
  ) { }

  ngOnInit(): void {
    this.loadingUps();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.upsService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingUps();
    })
  }

  abrirModal() {
    this.upsService.abrirModal();
  }

  deleteUps(id: number) {
    Swal.fire({
      title: '¿Eliminar Ups?',
      text: 'Esta a punto de eliminar un Ups',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.upsService.deleteUps(id)
          .subscribe(resp => {
            this.loadingUps();
            Swal.fire(
              'Ups eliminado',
              `Ups eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }

  //* CARGAR MONITORES
  loadingUps() {
    this.upsService.loadUps(this.page).subscribe(({ TotalRegistros, Ups }) => {
      this.totalUps = TotalRegistros;
      this.upss = Ups
    })
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingUps();
  }
}
