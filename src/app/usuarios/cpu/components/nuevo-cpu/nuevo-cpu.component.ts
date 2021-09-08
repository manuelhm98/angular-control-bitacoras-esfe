import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Procesador } from 'src/app/procesador/models/procesador';
import { ProcesadorService } from 'src/app/procesador/services/procesador.service';
import Swal from 'sweetalert2';
import { CpuService } from '../../services/cpu.service';

@Component({
  selector: 'app-nuevo-cpu',
  templateUrl: './nuevo-cpu.component.html',
  styleUrls: ['./nuevo-cpu.component.css']
})
export class NuevoCpuComponent implements OnInit {

  public procesador: Procesador[] = [];
  public filterProc: Procesador[] = [];
  public cpu: any;
  form: FormGroup

  constructor(
    public cpuService: CpuService,
    private procesadorService: ProcesadorService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarCpu(id));
    this.loadProcesadors();
    this.form = this.fb.group({
      ProcesadorID: [Validators.required],
      Codigo: ['', Validators.required],
      Ram: ['', Validators.required],
      Almacenamiento: ['', Validators.required],
      search: '',
      Estado: 1
    })
  }

  searchProcesador() {
    let text: string = this.form.controls['search'].value
    this.filterProc = this.procesador.filter((pro) =>
      pro.Modelo.toLowerCase().includes(text.toLowerCase()) ||
      pro.Velocidad.toLowerCase().includes(text.toLowerCase()))

  }
  cerrarModal() {
    this.cpuService.cerrarModal();
    this.form.reset();
  }

  cargarCpu(id: number) {
    this.cpuService.byIdCpu(id).subscribe(data => {

      if (id === 0) {
        return;
      }
      this.cpu = data

      this.form.patchValue({
        ProcesadorID: this.cpu.ProcesadorID,
        Codigo: this.cpu.Codigo,
        Ram: this.cpu.Ram,
        Almacenamiento: this.cpu.Almacenamiento,
        Estado: this.cpu.Estado
      })
    })
  }

  createMonitor() {
    //Actualizar
    if (this.cpu) {
      const data = {
        ...this.form.value,
        CpuID: this.cpu.CpuID
      }
      this.cpuService.editCpu(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'CPU  se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.cpuService.newEvent.emit(resp);
        this.form.reset();
        this.cpuService.loadingCpu();
        this.cpuService.cerrarModal();
        return this.router.navigate(['/cpu'])
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

      this.cpuService.createCpu(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.cpuService.newEvent.emit(resp);
        this.cpuService.loadingCpu();
        this.form.reset();
        this.cpuService.cerrarModal();
        return this.router.navigate(['/cpu'])
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    }

  }

  loadProcesadors() {
    this.procesadorService.listProcesador().subscribe(data => {
      this.procesador = data as Procesador[];
      this.filterProc = data as Procesador[];
    })
  }
}
