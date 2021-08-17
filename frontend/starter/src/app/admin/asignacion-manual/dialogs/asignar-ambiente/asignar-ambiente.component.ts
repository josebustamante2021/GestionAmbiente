import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Ambiente } from 'src/app/interfaces/reserva/ambiente';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-asignar-ambiente',
  templateUrl: './asignar-ambiente.component.html',
  styleUrls: ['./asignar-ambiente.component.sass']
})
export class AsignarAmbienteComponent {
  ambienteSeleccionado:Ambiente=null;
  isTblLoading: boolean;
  displayedColumns: string[] = ['sede','pabellon','piso','codigo','descripcion','aream2','aforo','actions'];
  dataSource: MatTableDataSource<Ambiente> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;
  idLogin:number;

  constructor(public asignacionManualService:AsignacionManualService,public dialogRef: MatDialogRef<AsignarAmbienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private authService: AuthService) { 
      console.log(data);
      this.idLogin=  this.authService.currentUserValue.id_login
      this.buscarAmbientes(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.asignacionManualService.asignarAmbiente(this.data.programacionHorarioID,this.ambienteSeleccionado.ambienteID,this.idLogin).subscribe(
      (response) => {   
        console.log(response);
        console.log(this.ambienteSeleccionado);
        if (response.status == 200) {   
          this.showNotification(
            'snackbar-success',
            'Ambiente Asignado...!!!',
            'bottom',
            'center'
          );
          this.data.codigoAmbiente=this.ambienteSeleccionado.codigo
          this.dialogRef.close(this.data);
        }
      },(error: HttpErrorResponse) => {
        this.showNotification(
          'snackbar-danger',
          'Error en la conexion...!!!',
          'bottom',
          'center'
        );
      }
    );
    
  }
  buscarAmbientes(data){
    this.dataSource = new MatTableDataSource<Ambiente>(null);
    this.isTblLoading = true;
    this.asignacionManualService.buscarAmbiente(data.programacionHorarioID,data.codigoAca).subscribe(
      (response) => {   
        console.log(response);
        if (response.status == 200) {   
        this.dataSource = new MatTableDataSource<Ambiente>(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isTblLoading = false;
        }
      },(error: HttpErrorResponse) => {
        this.showNotification(
          'snackbar-danger',
          'Error en la conexion...!!!',
          'bottom',
          'center'
        );
      }
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  marcarAmbiente(row){
    this.ambienteSeleccionado=row;
  }
}
