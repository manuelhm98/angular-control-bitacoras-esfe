import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Mueble } from 'src/app/mueble/models/mueble';
import { MuebleService } from 'src/app/mueble/services/mueble.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-mueble-modal',
  templateUrl: './mueble-modal.component.html',
  styleUrls: ['./mueble-modal.component.css']
})
export class MuebleModalComponent implements OnInit {

  public totalMuebles: number = 0;
  public mueble: Mueble[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private muebleService: MuebleService,
    public modalService: ModalsService
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

  cerrarModal() {
    this.modalService.cerrarModalMueble();
  }

  //* CARGAR MONITORES
  loadinMueble() {
    this.muebleService.loadMueble(this.page).subscribe(({ TotalRegistros, Muebles }) => {
      this.totalMuebles = TotalRegistros;
      this.mueble = Muebles
    })
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalMuebles + 1) {
      this.page -= valor;
    }
    this.loadinMueble();
  }


  enviarData(nombre: string, id: number) {
    this.modalService.openMueble.emit({
      muebleId: id,
      nombreMueble: nombre
    })
    this.modalService.cerrarModalMueble();

  }


}
