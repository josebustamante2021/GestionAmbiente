import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.sass']
})
export class ReportesComponent implements OnInit {
  navLinks = [
    { path: 'distribucion', label: 'Distribucion de Turnos' },
    { path: 'validacion', label: 'Validacion de Turnos' },
    { path: 'asignacionHoraios', label: 'Asignacion de Horarios' },
    { path: 'disponiblidadHorarios', label: 'Disponibilidad de Horarios' },
    { path: 'ocupabilidadAmbiente', label: 'Ocupabilidad de Ambiente' },
    { path: 'capacidadOciosa', label: 'Capacidad Ociosa' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
