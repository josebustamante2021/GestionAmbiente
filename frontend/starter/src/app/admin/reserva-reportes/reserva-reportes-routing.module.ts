import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';
import { DistribucionTurnoComponent } from 'src/app/admin/simulacion/distribucion-turno/distribucion-turno.component';
import { ValidacionTurnoComponent } from 'src/app/admin/simulacion/validacion-turno/validacion-turno.component';
import { PendingChangesGuard } from 'src/app/core/guard/pending-changes.guard';
import { AsignacionHorariosComponent } from './asignacion-horarios/asignacion-horarios.component';
import { DisponibilidadHorariosComponent } from './disponibilidad-horarios/disponibilidad-horarios.component';
import { OcupabilidadAmbienteComponent } from './ocupabilidad-ambiente/ocupabilidad-ambiente.component';
import { CapacidadOciosaComponent } from './capacidad-ociosa/capacidad-ociosa.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
		children: [
			{
				path: 'distribucion',
				component: DistribucionTurnoComponent
			},
			{
				path: 'validacion',
				component: ValidacionTurnoComponent,
				canDeactivate: [PendingChangesGuard]
			},
			{
				path: 'asignacionHoraios',
				component: AsignacionHorariosComponent
			},
			{
				path: 'disponiblidadHorarios',
				component: DisponibilidadHorariosComponent
			},
			{
				path: 'ocupabilidadAmbiente',
				component: OcupabilidadAmbienteComponent
			},
			{
				path: 'capacidadOciosa',
				component: CapacidadOciosaComponent
			},
		
		]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaReportesRoutingModule {}
