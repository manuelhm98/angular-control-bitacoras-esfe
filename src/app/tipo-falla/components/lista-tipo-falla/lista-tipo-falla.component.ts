import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TipoFalla } from '../../models/tipo-falla';
import { TipoFallaService } from '../../services/tipo-falla.service';

@Component({
  selector: 'app-lista-tipo-falla',
  templateUrl: './lista-tipo-falla.component.html',
  styleUrls: ['./lista-tipo-falla.component.css']
})
export class ListaTipoFallaComponent implements OnInit {

  //* DECLARACION DE VARIABLES 
  public totalTipoFalla: number = 0;
  public tipoFalla: TipoFalla[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private tipoFallaService: TipoFallaService
  ) { }

  ngOnInit(): void {
    this.loadingTipoFalla();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.tipoFallaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingTipoFalla();
    })
  }

  deleteTipoFalla(id: number) {
    Swal.fire({
      title: '¿Eliminar Tipo de Falla?',
      text: 'Esta a punto de eliminar un Tipo de Falla',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.tipoFallaService.deleteTipoFalla(id)
          .subscribe(resp => {
            this.loadingTipoFalla();
            Swal.fire(
              'Tipo de Falla eliminado',
              `Tipo de Falla eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }

  loadingTipoFalla() {
    this.tipoFallaService.loadTipoFalla(this.page).subscribe(({ TotalRegistros, TipoFallas }) => {
      this.totalTipoFalla = TotalRegistros;
      this.tipoFalla = TipoFallas
    })
  }


  abrirModal() {
    this.tipoFallaService.abrirModal();
  }

  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalTipoFalla + 1) {
      this.page -= valor;
    }
    this.loadingTipoFalla();
  }
}
