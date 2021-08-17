import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduccionRoutingModule } from './produccion-routing.module';
import { ProduccionListaComponent } from './produccion-lista/produccion-lista.component';

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
import { AuthService } from 'src/app/core/service/auth.service';



@NgModule({
  declarations: [ProduccionListaComponent],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
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
export class ProduccionModule { }
