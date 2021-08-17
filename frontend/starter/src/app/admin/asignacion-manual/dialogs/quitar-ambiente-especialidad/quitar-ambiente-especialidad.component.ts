import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-quitar-ambiente-especialidad',
  templateUrl: './quitar-ambiente-especialidad.component.html',
  styleUrls: ['./quitar-ambiente-especialidad.component.sass']
})
export class QuitarAmbienteEspecialidadComponent {
  constructor(public dialogRef: MatDialogRef<QuitarAmbienteEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.data);
  }

}
