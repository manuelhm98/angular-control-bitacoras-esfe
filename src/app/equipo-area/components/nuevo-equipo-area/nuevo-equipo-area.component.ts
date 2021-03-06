import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  form: UntypedFormGroup;


  constructor(
    public equipoAreaService: EquipoAreaService,
    public areaService: AreaService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //* ACTIVATED ROUTE :ID
    this.activatedRoute.params.subscribe(({ id }) => this.cargarEquipoArea(id));
    //* CARGA DE DATOS
    this.loadAreas();
    //* VALIDACION DE FORMULARIO
    this.form = this.fb.group({
      AreaID: ['', Validators.required],
      Equipo: ['', Validators.required],
      Codigo: ['', Validators.required],
      Estado: 1
    })
  }

  cargarEquipoArea(id: number) {
    this.equipoAreaService.byIdEquipoArea(id).subscribe(data => {
      if (id === 0) {
        return;
      }

      this.equipoArea = data;

      this.form.patchValue({
        AreaID: this.equipoArea.AreaID,
        Equipo: this.equipoArea.Equipo,
        Codigo: this.equipoArea.Codigo,
        Estado: this.equipoArea.Estado,
      })
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
        return this.router.navigate(['/equipo-area'])
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
    return this.router.navigate(['/equipo-area'])
  }

  loadAreas() {
    this.areaService.listArea().subscribe(data => {
      this.area = data as Area[]
    })
  }

}
