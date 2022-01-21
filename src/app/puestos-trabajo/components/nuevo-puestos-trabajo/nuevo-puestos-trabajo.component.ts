import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { ModalsService } from 'src/app/shared/services/modals.service';

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



  form: FormGroup;
  constructor(
    public modalService: ModalsService,
    private fb: FormBuilder,
  ) {

  }

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
      Teclado: ['', Validators.required],
      Mouse: ['', Validators.required],
      Estado: 1
    })
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

  createPuestos() {

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
