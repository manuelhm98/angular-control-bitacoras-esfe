import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { PuestosTrabajo } from '../../models/puestos-trabajo';
import { PuestosTrabajoService } from '../../services/puestos-trabajo.service';

@Component({
  selector: 'app-lista-puestos-trabajo',
  templateUrl: './lista-puestos-trabajo.component.html',
  styleUrls: ['./lista-puestos-trabajo.component.css']
})
export class ListaPuestosTrabajoComponent implements OnInit {

  //* DECLARACION DE VARIABLES
  public totalPuestosTrabajo: number = 0;
  public puestosTrabajo: PuestosTrabajo[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(private puestosTrabajoService: PuestosTrabajoService) { }

  ngOnInit(): void {
    this.loadinPuestos();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.puestosTrabajoService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinPuestos();
    })
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


  abrirModal() {

  }

  deleteArea() {

  }
}
