import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/area/models/area';
import { AreaService } from 'src/app/area/services/area.service';
import Swal from 'sweetalert2';
import { EquipoAreaService } from '../../services/equipo-area.service';

@Component({
  selector: 'app-nuevo-equipo-area',
  templateUrl: './nuevo-equipo-area.component.html',
  styleUrls: ['./nuevo-equipo-area.component.css']
})
export class NuevoEquipoAreaComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  public area: Area[] = [];
  public equipoArea: any;
  form: FormGroup;


  constructor(
    public equipoAreaService: EquipoAreaService,
    public areaService: AreaService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    //* CARGA DE DATOS
    this.loadAreas();
    //* VALIDACION DE FORMULARIO
    this.form = this.fb.group({
      AreaID: ['...', Validators.required],
      Equipo: ['', Validators.required],
      Codigo: ['', Validators.required],
      Estado: 1
    })
  }

  createEquipoArea() {
    //Actualizar
    if (this.equipoArea) {
      const data = {
        ...this.form.value,
        EquipoAreaID: this.equipoArea.EquipoAreaID
      }
      this.equipoAreaService.editEquipoArea(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.equipoAreaService.newEvent.emit(resp);
        this.form.reset();
        this.equipoAreaService.loadingEquipoArea();
        this.equipoAreaService.cerrarModal();
      })
    } else {
      if (this.form.invalid) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se permiten campos vacios',
          showConfirmButton: false,
          timer: 1000
        })
      }

      this.equipoAreaService.createEquipoArea(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.equipoAreaService.newEvent.emit(resp);
        this.form.reset();
        this.equipoAreaService.loadingEquipoArea();
        this.equipoAreaService.cerrarModal();
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }
  }

  cerrarModal() {
    this.equipoAreaService.cerrarModal();
    this.form.reset();
  }

  loadAreas() {
    this.areaService.listArea().subscribe(data => {
      this.area = data as Area[]
    })
  }

}
