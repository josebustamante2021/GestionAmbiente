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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { AllUsuariosComponent } from './all-usuarios/all-usuarios.component';
import { DeleteComponent } from './all-usuarios/dialogs/delete/delete.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { UsuariosService } from 'src/app/services/reserva/usuarios.service';
import { NgxMaskModule } from 'ngx-mask';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CredencialesComponent } from './all-usuarios/dialogs/credenciales/credenciales.component';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [
    AllUsuariosComponent,
    DeleteComponent,
    CredencialesComponent
  ],
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
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MaterialFileInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    UsuariosRoutingModule,
    NgxMaskModule,
    MatRadioModule,
    MatTooltipModule
  ],
  providers: [UsuariosService],
})
export class UsuariosModule {}
