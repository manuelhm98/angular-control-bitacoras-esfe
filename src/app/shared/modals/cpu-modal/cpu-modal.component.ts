import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Cpu } from 'src/app/cpu/models/cpu';
import { CpuService } from 'src/app/cpu/services/cpu.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-cpu-modal',
  templateUrl: './cpu-modal.component.html',
  styleUrls: ['./cpu-modal.component.css']
})
export class CpuModalComponent implements OnInit {

  //* VARIBLES
  public totalCpu: number = 0;
  public cpu: Cpu[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private cpuService: CpuService,
    public modalService: ModalsService,
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

  //* CARGAR MONITORES
  loadingCpu() {
    this.cpuService.loadingCpu(this.page).subscribe(({ TotalRegistros, Cpus }) => {
      this.totalCpu = TotalRegistros;
      this.cpu = Cpus
    })
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalCpu + 1) {
      this.page -= valor;
    }
    this.loadingCpu();
  }

  enviarData(nombre: string, id: number) {
    this.modalService.openCpu.emit({
      cpuId: id,
      nombreCpu: nombre
    })
    this.modalService.cerrarModalCpu();

  }

  cerrarModal() {
    this.modalService.cerrarModalCpu();
  }

}
