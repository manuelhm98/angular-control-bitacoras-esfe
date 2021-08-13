import { Component, OnInit } from '@angular/core';
import { ProcesadorService } from '../../services/procesador.service';

@Component({
  selector: 'app-nuevo-procesador',
  templateUrl: './nuevo-procesador.component.html',
  styleUrls: ['./nuevo-procesador.component.css']
})
export class NuevoProcesadorComponent implements OnInit {

  constructor(
    public procesadorService: ProcesadorService
  ) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.procesadorService.cerrarModal();
  }
}
