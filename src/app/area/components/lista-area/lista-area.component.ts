import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-lista-area',
  templateUrl: './lista-area.component.html',
  styleUrls: ['./lista-area.component.css']
})
export class ListaAreaComponent implements OnInit {

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
  }


  abrirModal() {
    this.areaService.abrirModal();
  }
}
