import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ups } from '../../models/ups';
import { UpsService } from '../../services/ups.service';

@Component({
  selector: 'app-nuevo-ups',
  templateUrl: './nuevo-ups.component.html',
  styleUrls: ['./nuevo-ups.component.css']
})
export class NuevoUpsComponent implements OnInit {

  form: UntypedFormGroup;
  ups: any;

  constructor(
    public upsService: UpsService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    //* PARAMS 
    this.activatedRoute.params.subscribe(({ id }) => this.loadUps(id));
    this.form = this.fb.group({
      Codigo: ['', Validators.required],
      Estado: 1
    })
  }

  loadUps(id: number) {
    this.upsService.byIdUps(id).subscribe(data => {
      if (id === 0) {
        return;
      }

      this.ups = data;
      this.form.patchValue({
        Codigo: this.ups.Codigo,
        Estado: this.ups.Estado
      })
    })
  }

  createUps() {
    //Actualizar
    if (this.ups) {
      const data = {
        ...this.form.value,
        UpsID: this.ups.UpsID
      }
      this.upsService.updateUps(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Ups actualizado !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.upsService.newEvent.emit(resp);
        this.form.reset();
        this.upsService.loadUps();
        this.upsService.cerrarModal();
        return this.router.navigate(['/ups'])
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

      this.upsService.createUps(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.upsService.newEvent.emit(resp);
        this.form.reset();
        this.upsService.loadUps();
        this.upsService.cerrarModal();
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }
  }

  cerrarModal() {
    this.upsService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/ups'])
  }
}
