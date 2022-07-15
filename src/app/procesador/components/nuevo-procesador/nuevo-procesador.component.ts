import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProcesadorService } from '../../services/procesador.service';

@Component({
  selector: 'app-nuevo-procesador',
  templateUrl: './nuevo-procesador.component.html',
  styleUrls: ['./nuevo-procesador.component.css']
})
export class NuevoProcesadorComponent implements OnInit {

  //DECLARACION DE VARIABLES
  public procesador: any;
  public form: UntypedFormGroup;

  constructor(
    public procesadorService: ProcesadorService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    //* PARAMS 
    this.activatedRoute.params.subscribe(({ id }) => this.loadProcesador(id))
    //*VALIDACION DE FORMLULARIO
    this.form = this.fb.group(({
      Modelo: ['', Validators.required],
      Velocidad: ['', Validators.required],
      Estado: 1
    }))
  }

  loadProcesador(id: number) {
    this.procesadorService.byIdProcesador(id).subscribe(data => {
      if (id === 0) {
        return;
      }

      this.procesador = data;
      this.form.patchValue({
        Modelo: this.procesador.Modelo,
        Velocidad: this.procesador.Velocidad,
        Estado: this.procesador.Estado
      })
    })
  }

  cerrarModal() {
    this.procesadorService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/procesador'])
  }

  createProcesador() {
    //Actualizar
    if (this.procesador) {
      const data = {
        ...this.form.value,
        ProcesadorID: this.procesador.ProcesadorID
      }
      this.procesadorService.updateProcesador(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Procesador actualizado !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.procesadorService.newEvent.emit(resp);
        this.form.reset();
        this.procesadorService.loadProcesador();
        this.procesadorService.cerrarModal();
        return this.router.navigate(['/procesador'])
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

      this.procesadorService.createProcesador(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.procesadorService.newEvent.emit(resp);
        this.form.reset();
        this.procesadorService.loadProcesador();
        this.procesadorService.cerrarModal();
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }
  }
}
