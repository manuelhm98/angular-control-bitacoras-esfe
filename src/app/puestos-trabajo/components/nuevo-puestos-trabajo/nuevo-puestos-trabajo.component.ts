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


  form: FormGroup;
  constructor(
    public modalService: ModalsService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    this.dataMonitor();
    this.dataArea();

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

  createPuestos() {

  }

  abrirModalArea() {
    this.modalService.abrirModaArea();
  }

  abrirModalMonitor() {
    this.modalService.abrirModaMonitor();
  }

}
