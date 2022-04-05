import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Falla } from '../../models/falla';
import { FallaService } from '../../services/falla.service';

@Component({
  selector: 'app-lista-falla',
  templateUrl: './lista-falla.component.html',
  styleUrls: ['./lista-falla.component.css']
})
export class ListaFallaComponent implements OnInit {

  //* VARIABLES
  public totalFallas: number = 0;
  public falla: Falla[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private fallaService: FallaService
  ) { }

  ngOnInit(): void {
    this.loadingFalla();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.fallaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingFalla();
    })
  }

  //* CARGAR FALLAS
  loadingFalla() {
    this.fallaService.loadingFalla(this.page).subscribe(({ TotalRegistros, Fallas }) => {
      this.totalFallas = TotalRegistros;
      this.falla = Fallas
    })
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalFallas + 1) {
      this.page -= valor;
    }
    this.loadingFalla();
  }

  abrirModal() {
    this.fallaService.abrirModal();
  }



  deleteFalla(id: number) {
    Swal.fire({
      title: '¿Eliminar Falla?',
      text: 'Esta a punto de eliminar una Falla',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.fallaService.deleteFalla(id)
          .subscribe(resp => {
            this.loadingFalla();
            Swal.fire(
              'Falla eliminada',
              `Falla eliminada correctamente`,
              'success'
            )
          })
      }
    })
  }

}
