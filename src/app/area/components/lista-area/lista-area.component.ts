import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { delay, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Area } from '../../models/area';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-lista-area',
  templateUrl: './lista-area.component.html',
  styleUrls: ['./lista-area.component.css']
})
export class ListaAreaComponent implements OnInit {

  //* DECLARACION DE VARIABLES
  public totalArea: number = 0;
  public area: Area[] = [];
  public filterArea: Area[] = [];
  public page: number = 1;
  public take: number = 5;
  public name: string = "";
  public tipo: string = "";
  form: FormGroup

  constructor(private areaService: AreaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadinArea();
    //* RECIBE UN EVENTO PARA RECARGAR EL COMPONENTE
    this.areaService.newEvent.pipe(
      delay(100)
    ).subscribe(resp => {
      this.loadinArea();
    })

    this.form = this.fb.group({
      names: '',
      tipo: '',
    })
  }

  //* SEARCH
  searchArea() {
    this.name = this.form.controls['names'].value
    this.tipo = this.form.controls['tipo'].value
    this.loadinArea()
  }

  abrirModal() {
    this.areaService.abrirModal();
  }

  loadinArea() {
    this.areaService.loadArea(this.page, this.name, this.tipo).subscribe(({ TotalRegistros, Areas }) => {
      this.totalArea = TotalRegistros;
      this.area = Areas
      this.filterArea = Areas
    })
  }

  //* PAGINACION
  pageChangeEvent(event: number) {
    this.page = event;
    this.loadinArea();
  }


  deleteArea(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta a punto de eliminar un registro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.areaService.deleteArea(id)
          .subscribe(resp => {
            this.loadinArea();
            Swal.fire(
              'AREA eliminado',
              `AREA eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }
}
