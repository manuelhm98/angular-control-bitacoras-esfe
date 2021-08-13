import { Component, OnInit } from '@angular/core';
import { ProcesadorService } from '../../services/procesador.service';

@Component({
  selector: 'app-lista-procesador',
  templateUrl: './lista-procesador.component.html',
  styleUrls: ['./lista-procesador.component.css']
})
export class ListaProcesadorComponent implements OnInit {

  constructor(
    private procesadorService: ProcesadorService
  ) { }

  ngOnInit(): void {
  }

  abrirModal() {
    this.procesadorService.abrirModal();
  }
}
