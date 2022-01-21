import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Monitor } from 'src/app/monitor/models/monitor';
import { MonitorService } from 'src/app/monitor/services/monitor.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-monitor-modal',
  templateUrl: './monitor-modal.component.html',
  styleUrls: ['./monitor-modal.component.css']
})
export class MonitorModalComponent implements OnInit {

  //* VARIBLES
  public totalMonitor: number = 0;
  public monitor: Monitor[] = [];
  public page: number = 1;
  public take: number = 5;


  constructor(
    private monitorService: MonitorService,
    public modalService: ModalsService,
    public router: Router
  ) { }




  ngOnInit(): void {
    this.loadingMonitor();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.monitorService.newRolEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingMonitor();
    })
  }


  //* CARGAR MONITORES
  loadingMonitor() {
    this.monitorService.loadMonitor(this.page).subscribe(({ TotalRegistros, Monitors }) => {
      this.totalMonitor = TotalRegistros;
      this.monitor = Monitors
    })
  }


  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalMonitor + 1) {
      this.page -= valor;
    }
    this.loadingMonitor();
  }

  cerrarModal() {
    this.modalService.cerrarModalMonitor();
  }

  enviarData(codigo: string, id: number) {
    this.modalService.openMonitor.emit({
      monitorId: id,
      monitor: codigo
    })
    this.modalService.cerrarModalMonitor();

  }



}
