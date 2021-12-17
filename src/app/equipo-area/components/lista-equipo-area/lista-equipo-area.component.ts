import { Component, OnInit } from '@angular/core';
import { EquipoAreaService } from '../../services/equipo-area.service';

@Component({
  selector: 'app-lista-equipo-area',
  templateUrl: './lista-equipo-area.component.html',
  styleUrls: ['./lista-equipo-area.component.css']
})
export class ListaEquipoAreaComponent implements OnInit {

  constructor(
    private equipoAreaService: EquipoAreaService
  ) { }

  ngOnInit(): void {
  }

  abrirModal() {
    this.equipoAreaService.abrirModal();
  }

  changePage(valor: number) {

  }

  deleteEquipoArea() {

  }
}
