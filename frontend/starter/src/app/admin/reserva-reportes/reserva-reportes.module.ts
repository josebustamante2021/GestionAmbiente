import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReportesComponent } from './reportes/reportes.component';
import { ReservaReportesRoutingModule } from './reserva-reportes-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { ReservaReportesService } from 'src/app/services/reserva/reportes.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsignacionHorariosComponent } from './asignacion-horarios/asignacion-horarios.component';
import { DisponibilidadHorariosComponent } from './disponibilidad-horarios/disponibilidad-horarios.component';
import { CapacidadOciosaComponent } from './capacidad-ociosa/capacidad-ociosa.component';
import { SimulacionReservaService } from 'src/app/services/reserva/simulacion.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { DiasService } from 'src/app/services/reserva/dias.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl} from 'ng-pick-datetime';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { OcupabilidadAmbienteComponent } from './ocupabilidad-ambiente/ocupabilidad-ambiente.component'
import { AmbienteService } from 'src/app/services/reserva/ambiente.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ExcelService } from 'src/app/core/service/excel.service';
export class DefaultIntl extends OwlDateTimeIntl {
  cancelBtnLabel= 'Cancelar';

  /** A label for the set button */
  setBtnLabel= 'Seleccionar'
}

@NgModule({
  declarations: [ReportesComponent,AsignacionHorariosComponent,DisponibilidadHorariosComponent,CapacidadOciosaComponent, OcupabilidadAmbienteComponent],
  imports: [
    CommonModule,
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
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatTooltipModule,
    ReservaReportesRoutingModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    OwlDateTimeModule,
    MatProgressSpinnerModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule
  ],
  providers: [ DatePipe,{provide: OwlDateTimeIntl, useClass: DefaultIntl},
    AreaService, FilialService, EspecialidadService,SedeService,SemestreService,ReservaReportesService,SimulacionReservaService,TipoAmbienteService, DiasService,AmbienteService,ExcelService ]
})
export class ReservaReportesModule { }
