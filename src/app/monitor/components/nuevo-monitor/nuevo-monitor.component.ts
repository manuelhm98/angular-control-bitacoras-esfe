import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitorService } from '../../services/monitor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-monitor',
  templateUrl: './nuevo-monitor.component.html',
  styleUrls: ['./nuevo-monitor.component.css']
})
export class NuevoMonitorComponent implements OnInit {

  //public monitor: Monitor[] = [];
  public monitor: any;
  public form: FormGroup;


  constructor(
    public monitorService: MonitorService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {

    //* PARAMS 
    this.activatedRoute.params.subscribe(({ id }) => this.loadMonitor(id));
    //* VALIDACION DEL FORMULARIO
    this.form = this.fb.group({
      Modelo: ['', Validators.required],
      Codigo: ['', Validators.required],
      Pulgadas: ['', Validators.required],
      Estado: 1
    })
  }

  cerrarModal() {
    this.monitorService.cerrarModal();
    this.form.reset();
    return this.router.navigate(['/monitor'])
  }

  loadMonitor(id: number) {
    this.monitorService.byIdMonitor(id).subscribe(data => {
      if (id === 0) {
        return;
      }

      this.monitor = data;
      this.form.patchValue({
        Modelo: this.monitor.Modelo,
        Codigo: this.monitor.Codigo,
        Pulgadas: this.monitor.Pulgadas,
        Estado: this.monitor.Estado
      })
    })
  }

  createMonitor() {
    //Actualizar
    if (this.monitor) {
      const data = {
        ...this.form.value,
        MonitorID: this.monitor.MonitorID
      }
      this.monitorService.updateMonitor(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Monitor actualizado !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.monitorService.newRolEvent.emit(resp);
        this.form.reset();
        this.monitorService.loadMonitor();
        this.monitorService.cerrarModal();
        return this.router.navigate(['/monitor'])
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

      this.monitorService.createMonitor(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.monitorService.newRolEvent.emit(resp);
        this.form.reset();
        this.monitorService.loadMonitor();
        this.monitorService.cerrarModal();
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }
  }

}
