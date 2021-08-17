import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UsuariosService } from 'src/app/services/reserva/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent {
  constructor(
    public usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.usuariosService.eliminarUsuario(this.data.id_login).subscribe(
      (response) => {
        //this.data = data.data;
        console.log(response);
        if(response.data.status==1){
          this.dialogRef.close(this.data.id_login);
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
