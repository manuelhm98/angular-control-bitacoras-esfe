import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Falla } from 'src/app/falla/models/falla';
import { FallaService } from 'src/app/falla/services/falla.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-fallas-modal',
  templateUrl: './fallas-modal.component.html',
})
export class FallasModalComponent implements OnInit {


  //* VARIABLES
  public totalFallas: number = 0;
  public falla: Falla[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private fallaService: FallaService,
    public modalService: ModalsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadingFalla();
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

  cerrarModal() {
    this.modalService.cerrarModalFallas();
  }

  enviarData(nombre: string, id: number) {
    this.modalService.openFallas.emit({
      fallaId: id,
      nombreFalla: nombre
    })
    this.modalService.cerrarModalFallas();
  }


}
