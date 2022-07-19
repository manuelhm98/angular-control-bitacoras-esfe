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


  /**
   * The function changePage() is used to change the page of the table, it receives a number as a
   * parameter, if the number is less than 1, the page is set to 1, if the number is greater than the
   * total number of pages, the page is set to the previous page
   * @param {number} valor - number: This is the value that will be added to the page variable.
   */
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1
    } else if (this.page > this.totalBitacora + 1) {
      this.page -= valor;
    }
    this.loadingBitacoras();
  }

  abrirModal() {
    this.bitacoraService.abrirModal();
  }
}
