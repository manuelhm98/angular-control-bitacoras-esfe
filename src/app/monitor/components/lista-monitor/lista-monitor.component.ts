import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Monitor } from '../../models/monitor';
import { MonitorService } from '../../services/monitor.service';

@Component({
  selector: 'app-lista-monitor',
  templateUrl: './lista-monitor.component.html',
  styleUrls: ['./lista-monitor.component.css']
})
export class ListaMonitorComponent implements OnInit {

  //* VARIBLES 
  public totalMonitor: number = 0;
  public monitor: Monitor[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private monitorService: MonitorService
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

  abrirModal() {
    this.monitorService.abrirModal();
  }

  deleteMonitor(id: number) {
    Swal.fire({
      title: '¿Eliminar Monitor?',
      text: 'Esta a punto de eliminar un monitor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.monitorService.deleteMonitor(id)
          .subscribe(resp => {
            this.loadingMonitor();
            Swal.fire(
              'Usuario eliminado',
              `Monitor eliminado correctamente`,
              'success'
            )
          })
      }
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
}
