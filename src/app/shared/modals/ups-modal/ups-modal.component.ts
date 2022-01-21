import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Ups } from 'src/app/ups/models/ups';
import { UpsService } from 'src/app/ups/services/ups.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-ups-modal',
  templateUrl: './ups-modal.component.html',
  styleUrls: ['./ups-modal.component.css']
})
export class UpsModalComponent implements OnInit {

  //* VARIBLES
  public totalUps: number = 0;
  public upss: Ups[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private upsService: UpsService,
    public modalService: ModalsService
  ) { }

  ngOnInit(): void {
    this.loadingUps();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.upsService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadingUps();
    })
  }


  //* CARGAR Ups
  loadingUps() {
    this.upsService.loadUps(this.page).subscribe(({ TotalRegistros, Ups }) => {
      this.totalUps = TotalRegistros;
      this.upss = Ups
    })
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalUps + 1) {
      this.page -= valor;
    }
    this.loadingUps();
  }

  enviarData(nombre: string, id: number) {
    this.modalService.openUps.emit({
      upsId: id,
      nombreUps: nombre
    })
    this.modalService.cerrarModalUps();
  }

  cerrarModal() {
    this.modalService.cerrarModalUps();
  }
}
