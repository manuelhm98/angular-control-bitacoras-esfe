import { Component, OnInit } from '@angular/core';
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


  //* CARGAR BITACORA
  loadingBitacoras() {
    this.bitacoraService.loadingBitacora(this.page).subscribe(({ TotalRegistros, Bitacoras }) => {
      this.totalBitacora = TotalRegistros;
      this.bitacoras = Bitacoras
    })
  }

  //* PAGINACION
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1
    } else if (this.page > this.totalBitacora + 1) {
      this.page -= valor;
    }
    this.loadingUser();
  }

  loadingUser() {
    throw new Error('Method not implemented.');
  }

}
