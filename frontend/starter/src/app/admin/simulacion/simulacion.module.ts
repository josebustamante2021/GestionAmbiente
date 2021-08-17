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
import { SimulacionListaComponent } from './simulacion-lista/simulacion-lista.component';
import { SimulacionRoutingModule } from './simulacion-routing.module';
//import { SimulacionService } from 'src/app/services/simulacion.service';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SimulacionReservaService } from 'src/app/services/reserva/simulacion.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
//import { DistribucionService } from 'src/app/services/distribucion.service';
//import { ValidacionService } from 'src/app/services/validacion.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { AmbienteService } from 'src/app/services/reserva/ambiente.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DistribucionTurnoComponent } from './distribucion-turno/distribucion-turno.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { FullCalendarModule } from "@fullcalendar/angular";
//import { CalendarService } from "src/app/services/calendar.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { ValidacionTurnoComponent } from './validacion-turno/validacion-turno.component';
import { SimulacionProgacademicasComponent } from './simulacion-progacademicas/simulacion-progacademicas.component';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExcelService } from 'src/app/core/service/excel.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { CancelarSimulacionComponent } from './dialogs/cancelar-simulacion/cancelar-simulacion.component';
import { AnularAsignacionComponent } from './dialogs/anular-asignacion/anular-asignacion.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);


@NgModule({
  declarations: [SimulacionListaComponent, DistribucionTurnoComponent, ValidacionTurnoComponent, SimulacionProgacademicasComponent, CancelarSimulacionComponent, AnularAsignacionComponent],
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
    SimulacionRoutingModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  providers: [SemestreService, AreaService, FilialService, EspecialidadService, 
    SedeService,SimulacionReservaService, TipoAmbienteService,AmbienteService,AsignacionManualService,ExcelService,AuthService],
})
export class SimulacionModule { }
