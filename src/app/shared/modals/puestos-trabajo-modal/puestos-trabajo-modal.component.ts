import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuestosTrabajo } from 'src/app/puestos-trabajo/models/puestos-trabajo';
import { PuestosTrabajoService } from 'src/app/puestos-trabajo/services/puestos-trabajo.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-puestos-trabajo-modal',
  templateUrl: './puestos-trabajo-modal.component.html',
})
export class PuestosTrabajoModalComponent implements OnInit {

  //* DECLARACION DE VARIABLES
  public totalPuestosTrabajo: number = 0;
  public puestosTrabajo: PuestosTrabajo[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private puestosTrabajoService: PuestosTrabajoService,
    public modalService: ModalsService,
    public router: Router

  ) { }

  ngOnInit(): void {
    this.loadinPuestos();
  }

  loadinPuestos() {
    this.puestosTrabajoService.loadPuestosTrabajo(this.page).subscribe(({ TotalRegistros, PuestosTrabajos }) => {
      this.totalPuestosTrabajo = TotalRegistros;
      this.puestosTrabajo = PuestosTrabajos;
    })
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalPuestosTrabajo + 1) {
      this.page -= valor;
    }
    this.loadinPuestos();
  }

  enviarData(id: number) {
    this.modalService.openPuestos.emit({
      puestosId: id,
    })
    this.modalService.cerrarModalPuestos();
  }

  cerrarModal() {
    this.modalService.cerrarModalPuestos();
  }
}
