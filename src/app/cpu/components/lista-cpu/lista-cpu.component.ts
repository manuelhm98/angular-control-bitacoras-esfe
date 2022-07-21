import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Cpu } from '../../models/cpu';
import { CpuService } from '../../services/cpu.service';

@Component({
  selector: 'app-lista-cpu',
  templateUrl: './lista-cpu.component.html',
  styleUrls: ['./lista-cpu.component.css']
})
export class ListaCpuComponent implements OnInit {


  //* VARIBLES
  public totalCpu: number = 0;
  public cpu: Cpu[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private cpuService: CpuService
  ) { }

  ngOnInit(): void {
    this.loadingCpu();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.cpuService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingCpu();
    })
  }

  abrirModal() {
    this.cpuService.abrirModal();
  }

  deleteCpu(id: number) {
    Swal.fire({
      title: '¿Eliminar ?',
      text: 'Esta a punto de eliminar un registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.cpuService.deleteCpu(id)
          .subscribe(resp => {
            this.loadingCpu();
            Swal.fire(
              'CPU eliminado',
              `CPU eliminado correctamente`,
              'success'
            )
          })
      }
    })

  }

  //* CARGAR MONITORES
  loadingCpu() {
    this.cpuService.loadingCpu(this.page).subscribe(({ TotalRegistros, Cpus }) => {
      this.totalCpu = TotalRegistros;
      this.cpu = Cpus
    })
  }

  //* Paginacion
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadingCpu();
  }
}
