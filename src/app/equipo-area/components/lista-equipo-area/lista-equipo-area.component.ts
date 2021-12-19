import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { EquipoArea } from '../../models/equipo-area';
import { EquipoAreaService } from '../../services/equipo-area.service';

@Component({
  selector: 'app-lista-equipo-area',
  templateUrl: './lista-equipo-area.component.html',
  styleUrls: ['./lista-equipo-area.component.css']
})
export class ListaEquipoAreaComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  public totalEquipoArea: number = 0;
  public equipoArea: EquipoArea[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private equipoAreaService: EquipoAreaService
  ) { }

  ngOnInit(): void {
    this.loadingEquipoArea();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.equipoAreaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingEquipoArea();
    })
  }


  loadingEquipoArea() {
    this.equipoAreaService.loadingEquipoArea(this.page).subscribe(({ TotalRegistros, EquipoAreas }) => {
      this.totalEquipoArea = TotalRegistros;
      this.equipoArea = EquipoAreas;
    })
  }

  abrirModal() {
    this.equipoAreaService.abrirModal();
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalEquipoArea + 1) {
      this.page -= valor;
    }
    this.loadingEquipoArea();
  }

  deleteEquipoArea() {

  }
}
