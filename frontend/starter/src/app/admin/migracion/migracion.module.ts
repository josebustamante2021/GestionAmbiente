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
import { MigracionListaComponent } from './migracion-lista/migracion-lista.component';
import { MigracionRoutingModule } from './migracion-routing.module';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { MigrarService } from 'src/app/services/reserva/migrar.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { AmbienteService } from 'src/app/services/reserva/ambiente.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExcelService } from 'src/app/core/service/excel.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [MigracionListaComponent],
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
    MigracionRoutingModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  providers: [SemestreService, AreaService, FilialService, EspecialidadService, 
    SedeService,MigrarService, TipoAmbienteService,AmbienteService,AsignacionManualService,ExcelService,AuthService,DatePipe],
})
export class MigracionModule { }
