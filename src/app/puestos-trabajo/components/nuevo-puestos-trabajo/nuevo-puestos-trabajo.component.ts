import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ModalsService } from 'src/app/shared/services/modals.service';
import Swal from 'sweetalert2';
import { PuestosTrabajoService } from '../../services/puestos-trabajo.service';

@Component({
  selector: 'app-nuevo-puestos-trabajo',
  templateUrl: './nuevo-puestos-trabajo.component.html',
  styleUrls: ['./nuevo-puestos-trabajo.component.css']
})
export class NuevoPuestosTrabajoComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  public areaNombre: string;
  public idArea: number;

  public idMonitor: number;
  public monitorCodigo: string;

  public idCpu: number;
  public codigoCpu: string;

  public idMueble: number;
  public codigoMueble: string;

  public idUps: number;
  public codigoUps: string;

  public puestosTrabajo: any;
  form: FormGroup;

  constructor(
    public modalService: ModalsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public puestosTrabajoService: PuestosTrabajoService,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.dataMonitor();
    this.dataArea();
    this.dataCpu();
    this.dataMueble();
    this.dataUps();

    this.form = this.fb.group({
      AreaID: ['', Validators.required,],
      MonitorID: ['', Validators.required],
      UpsID: ['', Validators.required],
      CpuID: ['', Validators.required],
      MuebleID: ['', Validators.required],
      Teclado: [false, Validators.required],
      Mouse: [false, Validators.required],
      Estado: 1
    })
  }


  createPuestos() {
    if (this.form.value) {
      this.puestosTrabajoService.createPuestosTrabajo(this.form.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Registro exitoso !!!',
          showConfirmButton: false,
          timer: 3000
        })
        this.puestosTrabajoService.newEvent.emit(resp);
        this.puestosTrabajoService.loadPuestosTrabajo();
        this.form.reset();
        return this.router.navigate(['/puestos-trabajo'])
      })
    }
    else {
      Swal.fire('Error', 'Servidor no disponible', 'error',)
    }
  }


  dataArea() {
    this.modalService.openArea.pipe(
      delay(100)
    ).subscribe(data => {
      this.areaNombre = data.nombreArea;
      this.idArea = data.areaId;
      this.form.patchValue({ AreaID: this.idArea });
    })
  }

  dataMonitor() {
    this.modalService.openMonitor.subscribe(data => {
      this.idMonitor = data.monitorId,
        this.monitorCodigo = data.monitor;
      this.form.patchValue({ MonitorID: this.idMonitor });
      console.log(data)
    })
  }

  dataCpu() {
    this.modalService.openCpu.subscribe(data => {
      this.idCpu = data.cpuId,
        this.codigoCpu = data.nombreCpu;
      this.form.patchValue({ CpuID: this.idCpu });
      console.log(data)
    })
  }

  dataMueble() {
    this.modalService.openMueble.subscribe(data => {
      this.idMueble = data.muebleId,
        this.codigoMueble = data.nombreMueble;
      this.form.patchValue({ MuebleID: this.idMueble });
      console.log(data)
    })
  }

  dataUps() {
    this.modalService.openUps.subscribe(data => {
      this.idUps = data.upsId,
        this.codigoUps = data.nombreUps;
      this.form.patchValue({ UpsID: this.idUps });
      console.log(data)
    })
  }


  abrirModalArea() {
    this.modalService.abrirModaArea();
  }

  abrirModalMonitor() {
    this.modalService.abrirModaMonitor();
  }

  abrirModalCpu() {
    this.modalService.abriModalCpu()
  }

  abrirModalMueble() {
    this.modalService.abrirModalMueble()
  }

  abrirModalUps() {
    this.modalService.abrirModalUps()
  }
}
