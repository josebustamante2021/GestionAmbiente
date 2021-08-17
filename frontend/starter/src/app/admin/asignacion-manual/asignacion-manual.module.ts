import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignacionManualRoutingModule } from './asignacion-manual-routing.module';
import { ProgramacionAcademicaComponent } from './programacion-academica/programacion-academica.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReservaReportesService } from 'src/app/services/reserva/reportes.service';
import { SimulacionReservaService } from 'src/app/services/reserva/simulacion.service';
import { ReprocesoComponent } from './dialogs/reproceso/reproceso.component';
import { QuitarAmbienteComponent } from './dialogs/quitar-ambiente/quitar-ambiente.component';
import { AsignarAmbienteComponent } from './dialogs/asignar-ambiente/asignar-ambiente.component';
import { QuitarAllambienteComponent } from './dialogs/quitar-allambiente/quitar-allambiente.component';
import { CambiarCapacidadComponent } from './dialogs/cambiar-capacidad/cambiar-capacidad.component';
import { QuitarAmbienteEspecialidadComponent } from './dialogs/quitar-ambiente-especialidad/quitar-ambiente-especialidad.component';
import { AuthService } from 'src/app/core/service/auth.service';

@NgModule({
  declarations: [ProgramacionAcademicaComponent, ReprocesoComponent, QuitarAmbienteComponent, AsignarAmbienteComponent, QuitarAllambienteComponent, CambiarCapacidadComponent, QuitarAmbienteEspecialidadComponent],
  imports: [
    CommonModule,
    AsignacionManualRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [SemestreService,  AreaService, FilialService, EspecialidadService, 
    SedeService,AsignacionManualService,ReservaReportesService,SimulacionReservaService,AuthService],
})
export class AsignacionManualModule { }
