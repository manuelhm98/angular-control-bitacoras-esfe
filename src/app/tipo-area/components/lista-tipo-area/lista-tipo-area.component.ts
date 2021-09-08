import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TipoArea } from '../../models/tipo-area';
import { TipoAreaService } from '../../services/tipo-area.service';

@Component({
  selector: 'app-lista-tipo-area',
  templateUrl: './lista-tipo-area.component.html',
  styleUrls: ['./lista-tipo-area.component.css']
})
export class ListaTipoAreaComponent implements OnInit {

  //* DECLARACION DE VARIABLES 
  public totolTipoArea: number = 0;
  public tipoArea: TipoArea[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private tipoAreaService: TipoAreaService,

  ) { }

  ngOnInit(): void {
    this.loadinTipoArea();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.tipoAreaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinTipoArea();
    })
  }
  deleteTipoArea(id: number) {
    Swal.fire({
      title: '¿Eliminar Tipo de Area?',
      text: 'Esta a punto de eliminar un Tipo de Area',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.tipoAreaService.deleteTipoArea(id)
          .subscribe(resp => {
            this.loadinTipoArea();
            Swal.fire(
              'Tipo de Area eliminado',
              `Tipo de Area eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }

  loadinTipoArea() {
    this.tipoAreaService.loadTipoAreas(this.page).subscribe(({ TotalRegistros, TipoAreas }) => {
      this.totolTipoArea = TotalRegistros;
      this.tipoArea = TipoAreas
    })
  }

  abrirModal() {
    this.tipoAreaService.abrirModal();
  }

  //* Paginacion 
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totolTipoArea + 1) {
      this.page -= valor;
    }
    this.loadinTipoArea();
  }

}
