import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CpuService } from '../../services/cpu.service';

@Component({
  selector: 'app-nuevo-cpu',
  templateUrl: './nuevo-cpu.component.html',
  styleUrls: ['./nuevo-cpu.component.css']
})
export class NuevoCpuComponent implements OnInit {

  form: FormGroup
  constructor(
    public cpuService: CpuService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.cpuService.cerrarModal();
  }

  createMonitor() {

  }
}
