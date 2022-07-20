import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Bitacora } from '../../models/bitacora';
import { BitacoraService } from '../../services/bitacora.service';
@Component({
  selector: 'app-lista-bitacora',
  templateUrl: './lista-bitacora.component.html',
  styleUrls: ['./lista-bitacora.component.css']
})
export class ListaBitacoraComponent implements OnInit {

  public totalBitacora: number = 0;
  public bitacoras: Bitacora[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(public bitacoraService: BitacoraService) { }

  ngOnInit(): void {
    this.loadingBitacoras();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.bitacoraService.newEvent.pipe().subscribe(resp => {
      this.loadingBitacoras();
    })
  }

  deleteBitacoras
    (id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta a punto de eliminar un registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.bitacoraService.deleteBitacora(id)
          .subscribe(resp => {
            this.loadingBitacoras();
            Swal.fire(
              'Mueble eliminado',
              `Mueble eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }

  /**
   * This function is used to load the bitacoras from the database
   */
  loadingBitacoras() {
    this.bitacoraService.loadingBitacora(this.page).subscribe(({ TotalRegistros, Bitacoras }) => {
      this.totalBitacora = TotalRegistros;
      this.bitacoras = Bitacoras
    })
  }

  //* PAGINACION
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingBitacoras();
  }


  abrirModal() {
    this.bitacoraService.abrirModal();
  }
}
