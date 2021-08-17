import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-quitar-ambiente',
  templateUrl: './quitar-ambiente.component.html',
  styleUrls: ['./quitar-ambiente.component.sass']
})
export class QuitarAmbienteComponent {
  constructor(public dialogRef: MatDialogRef<QuitarAmbienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.data);
  }
}
