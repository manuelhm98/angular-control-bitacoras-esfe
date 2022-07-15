import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ModalsService } from 'src/app/shared/services/modals.service';
import Swal from 'sweetalert2';
import { PuestosTrabajoService } from '../../services/puestos-trabajo.service';

@Component({
  selector: 'app-editar-puestos-trabajo',
  templateUrl: './editar-puestos-trabajo.component.html',
  styleUrls: ['./editar-puestos-trabajo.component.css']
})
export class EditarPuestosTrabajoComponent implements OnInit {

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

  form: UntypedFormGroup;

  constructor(
    public modalService: ModalsService,
    private fb: UntypedFormBuilder,
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

    this.activatedRoute.params.subscribe(({ id }) => this.cargarPuestos(id));

    //* VALIDACION DE FORM
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

  editarPuestos() {
    if (this.puestosTrabajo) {
      const data = {
        ...this.form.value,
        PuestosTrabajoID: this.puestosTrabajo.PuestosTrabajoID
      }
      this.puestosTrabajoService.updatePuestosTrabajo(data).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Ok...',
          text: 'Se actualizo exitosamente !!!',
          showConfirmButton: false,
          timer: 2000
        })
        this.puestosTrabajoService.newEvent.emit(resp);
        this.form.reset();
        this.puestosTrabajoService.loadPuestosTrabajo();
        return this.router.navigate(['puestos-trabajo'])
      }, (err) => {
        if (err.name === "HttpErrorResponse") {
          console.log(err)
          Swal.fire('Error', 'Servidor no disponible', 'error',)
        }
      })
    } else {
      Swal.fire('Error', 'Servidor no disponible', 'error',)
    }
  }

  cargarPuestos(id: number) {
    this.puestosTrabajoService.byIdPuestosTrabajo(id).subscribe(data => {
      if (id === 0) {
        return;
      }

      this.puestosTrabajo = data;
      this.areaNombre = this.puestosTrabajo.Area.NombreArea,
        this.monitorCodigo = this.puestosTrabajo.Monitor.Codigo,
        this.codigoUps = this.puestosTrabajo.Ups.Codigo,
        this.codigoCpu = this.puestosTrabajo.Cpu.Codigo,
        this.codigoMueble = this.puestosTrabajo.Mueble.Codigo,

        this.form.patchValue({
          AreaID: this.puestosTrabajo.AreaID,
          MonitorID: this.puestosTrabajo.MonitorID,
          UpsID: this.puestosTrabajo.UpsID,
          CpuID: this.puestosTrabajo.CpuID,
          MuebleID: this.puestosTrabajo.MuebleID,
          Teclado: this.puestosTrabajo.Teclado,
          Mouse: this.puestosTrabajo.Mouse
        })

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
