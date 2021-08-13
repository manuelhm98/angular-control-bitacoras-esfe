import { Component, OnInit } from '@angular/core';
import { CpuService } from '../../services/cpu.service';

@Component({
  selector: 'app-lista-cpu',
  templateUrl: './lista-cpu.component.html',
  styleUrls: ['./lista-cpu.component.css']
})
export class ListaCpuComponent implements OnInit {

  constructor(
    private cpuService: CpuService
  ) { }

  ngOnInit(): void {
  }

  abrirModal() {
    this.cpuService.abrirModal();
  }

  changePage() {

  }
}
