import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Area } from 'src/app/area/models/area';
import { AreaService } from 'src/app/area/services/area.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.css']
})
export class AreaModalComponent implements OnInit {

  //* DECLARACION DE VARIABLES
  public totalArea: number = 0;
  public area: Area[] = [];
  public page: number = 1;
  public take: number = 5;

  constructor(
    private areaService: AreaService,
    public modalService: ModalsService
  ) { }

  ngOnInit(): void {
    this.loadinArea();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.areaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinArea();
    })
  }

  loadinArea() {
    this.areaService.loadArea(this.page).subscribe(({ TotalRegistros, Areas }) => {
      this.totalArea = TotalRegistros;
      this.area = Areas
    })
  }

  enviarData(nombre: string, id: number) {
    this.modalService.openArea.emit({
      areaId: id,
      nombreArea: nombre
    })
    this.modalService.cerrarModalArea();
  }

  //* Paginacion
  changePage(valor: number) {
    this.page += valor;
    if (this.page <= 1) {
      this.page = 1;
    } else if (this.page > this.totalArea + 1) {
      this.page -= valor;
    }
    this.loadinArea();
  }

  cerrarModal() {
    this.modalService.cerrarModalArea();
  }
}
