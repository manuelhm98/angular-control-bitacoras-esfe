import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Mueble } from '../../models/mueble';
import { MuebleService } from '../../services/mueble.service';

@Component({
  selector: 'app-lista-muebles',
  templateUrl: './lista-muebles.component.html',
  styleUrls: ['./lista-muebles.component.css']
})
export class ListaMueblesComponent implements OnInit {

  public totalMuebles: number = 0;
  public mueble: Mueble[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private muebleService: MuebleService
  ) { }

  ngOnInit(): void {
    this.loadinMueble();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.muebleService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinMueble();
    })
  }

  deleteMueble(id: number) {
    Swal.fire({
      title: '¿Eliminar Mueble?',
      text: 'Esta a punto de eliminar un Mueble',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.muebleService.deleteMueble(id)
          .subscribe(resp => {
            this.loadinMueble();
            Swal.fire(
              'Mueble eliminado',
              `Mueble eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }

  abrirModal() {
    this.muebleService.abrirModal();
  }

  //* CARGAR MONITORES
  loadinMueble() {
    this.muebleService.loadMueble(this.page).subscribe(({ TotalRegistros, Muebles }) => {
      this.totalMuebles = TotalRegistros;
      this.mueble = Muebles
    })
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadinMueble();
  }
}
