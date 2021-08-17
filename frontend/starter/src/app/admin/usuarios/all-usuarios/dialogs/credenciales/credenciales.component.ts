import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/reserva/usuarios';
import { Rol } from 'src/app/interfaces/reserva/rol';
import { UsuariosService } from 'src/app/services/reserva/usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.component.html',
  styleUrls: ['./credenciales.component.sass']
})
export class CredencialesComponent{
  dialogTitle: string;
  proForm: FormGroup;
  usuarios: Usuarios;
  roles: Rol[];
  rolSeleccionado:Rol=null;

  isTblLoadingAsignar: boolean;
  displayedColumnsAsignar: string[] = ['descripcion','actions'];
  dataSourceAsignar: MatTableDataSource<Rol> | null;
  @ViewChild('paginatorAsignar', { static: true }) paginatorAsignar: MatPaginator;
  @ViewChild('sortTableSortAsignar') sortAsignar: MatSort;

  isTblLoading: boolean;
  displayedColumns: string[] = ['descripcion','actions'];
  dataSource: MatTableDataSource<Rol> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<CredencialesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
      this.usuarios = data.usuario;
      this.getRolesAsignados();
      this.getRolesNOAsignados();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getRolesAsignados(){
    this.dataSource = new MatTableDataSource<Rol>(null);
    this.isTblLoading = true;
    this.usuariosService.getRoles(this.usuarios.id_login,1).subscribe(
      (response) => {    
        this.roles= response.data; 
        this.dataSource = new MatTableDataSource<Rol>(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isTblLoading = false;        
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          'Ocurrio un error en el proceso...!!!',
          'bottom',
          'center'
        );
      }
    );
  }
  getRolesNOAsignados(){
    this.dataSourceAsignar = new MatTableDataSource<Rol>(null);
    this.isTblLoadingAsignar = true;
    this.usuariosService.getRoles(this.usuarios.id_login,0).subscribe(
      (response) => {  
        this.dataSourceAsignar = new MatTableDataSource<Rol>(response.data);
          this.dataSourceAsignar.paginator = this.paginatorAsignar;
          this.dataSourceAsignar.sort = this.sortAsignar;
          this.isTblLoadingAsignar = false;
        
      },
      (error: HttpErrorResponse) => {
        this.isTblLoadingAsignar = false;
        this.showNotification(
          'snackbar-danger',
          'Ocurrio un error en el proceso...!!!',
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
  marcarPermiso(row){
    this.rolSeleccionado=row;
  }
  quitarPermiso(row){
    this.usuariosService.quitarRol(this.usuarios.id_login,row.id_rol).subscribe(
      (response) => {
        if(response.data.status==1){
          this.getRolesAsignados();
          this.getRolesNOAsignados();
          this.showNotification(
            'snackbar-success',
            'Permiso eliminado...!!!',
            'bottom',
            'center'
          );
        }else{
          this.showNotification(
            'snackbar-danger',
            'Ocurrio un error en el proceso...!!!',
            'bottom',
            'center'
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.isTblLoadingAsignar = false;
        this.showNotification(
          'snackbar-danger',
          'Ocurrio un error en el proceso...!!!',
          'bottom',
          'center'
        );
      }
    );
  }
  savePermiso(){
    this.usuariosService.asignarRol(this.usuarios.id_login,this.rolSeleccionado.id_rol).subscribe(
      (response) => {  
        this.rolSeleccionado=null;
        if(response.data.status==1){
          this.getRolesAsignados();
          this.getRolesNOAsignados();
          this.showNotification(
            'snackbar-success',
            'Permiso asignado...!!!',
            'bottom',
            'center'
          );
        }else{
          this.showNotification(
            'snackbar-danger',
            'Ocurrio un error en el proceso...!!!',
            'bottom',
            'center'
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.rolSeleccionado=null;
        this.isTblLoadingAsignar = false;
        this.showNotification(
          'snackbar-danger',
          'Ocurrio un error en el proceso...!!!',
          'bottom',
          'center'
        );
      }
    );
  }
}
