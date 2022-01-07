import { Component, OnInit } from '@angular/core';
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
  }

  loadinArea() {
    this.areaService.loadArea(this.page).subscribe(({ TotalRegistros, Areas }) => {
      this.totalArea = TotalRegistros;
      this.area = Areas
    })
  }

  enviarData(nombre: string, id: number) {

    this.modalService.open.emit({
      areaId: id,
      nombreArea: nombre
    })
    /*   this.modalService.areaId = id;
      this.modalService.area = nombre; */
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
