import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from 'src/app/shared/services/modals.service';

@Component({
  selector: 'app-nuevo-puestos-trabajo',
  templateUrl: './nuevo-puestos-trabajo.component.html',
  styleUrls: ['./nuevo-puestos-trabajo.component.css']
})
export class NuevoPuestosTrabajoComponent implements OnInit {

  //*DECLARACION DE VARIABLES
  formU
  public areaNombre: string;
  public idArea: number;
  form: FormGroup;
  constructor(
    public modalService: ModalsService,
    private fb: FormBuilder,
  ) {
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

  ngOnInit(): void {

    this.modalService.open.subscribe(data => {
      console.log(data)
      this.areaNombre = data.nombreArea;
      this.idArea = data.areaId;
      this.form.patchValue({ AreaID: this.idArea });
    })
  }




  createPuestos() {

  }

  abrirModal() {
    this.modalService.abrirModaArea();
  }
}
