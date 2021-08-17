import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/services/reserva/usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CredencialesComponent } from './dialogs/credenciales/credenciales.component';
import { DeleteComponent } from './dialogs/delete/delete.component';

@Component({
  selector: 'app-all-usuarios',
  templateUrl: './all-usuarios.component.html',
  styleUrls: ['./all-usuarios.component.sass'],
})
export class AllUsuariosComponent implements OnInit {
  usuario: Usuario | null;
  isTblLoading: boolean;
  data: Usuario[];
  displayedColumns: string[] = ['id_login','userPrincipalName','lastName','firstName','estado','actions'];
  dataSource: MatTableDataSource<Usuario> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadData() {
    this.isTblLoading = true;
    this.data = null;
    this.dataSource = new MatTableDataSource<Usuario>(this.data);
    this.usuariosService.getAll().subscribe(
      (data) => {
        this.data = data.data;
        this.dataSource = new MatTableDataSource<Usuario>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isTblLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.data = null;
        this.dataSource = new MatTableDataSource<Usuario>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  actualizarAcceso(row){
    const dialogRef = this.dialog.open(CredencialesComponent, {
      
      data: {
        usuario: row,
      },width:'800px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result >0) {  
        this.refresh();
        this.showNotification(
          'snackbar-success',
          'Registro acualizado...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  
  delete(row) {
    const id = row.id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result >0) {   
        this.refresh();
        this.showNotification(
          'snackbar-success',
          'Registro eliminado...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  estadoUsuario(id_login,estado){
    this.usuariosService.accesoAlSistema(id_login,estado).subscribe(
      (response) => {
        if(response.data.status==1){
          this.loadData();
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