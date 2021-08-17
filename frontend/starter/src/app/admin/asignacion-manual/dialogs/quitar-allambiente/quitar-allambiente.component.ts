import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-quitar-allambiente',
  templateUrl: './quitar-allambiente.component.html',
  styleUrls: ['./quitar-allambiente.component.sass']
})
export class QuitarAllambienteComponent {
  constructor(public dialogRef: MatDialogRef<QuitarAllambienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.data);
  }

}
