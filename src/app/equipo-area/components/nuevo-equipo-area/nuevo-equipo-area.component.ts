import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/area/models/area';
import { AreaService } from 'src/app/area/services/area.service';
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
  form: FormGroup;


  constructor(
    public equipoAreaService: EquipoAreaService,
    public areaService: AreaService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  createEquipoArea() {

  }

  cerrarModal() {
    this.equipoAreaService.cerrarModal();
  }

}
