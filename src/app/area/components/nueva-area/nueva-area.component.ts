import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-nueva-area',
  templateUrl: './nueva-area.component.html',
  styleUrls: ['./nueva-area.component.css']
})
export class NuevaAreaComponent implements OnInit {

  constructor(public areaService: AreaService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.areaService.cerrarModal();
  }
}
