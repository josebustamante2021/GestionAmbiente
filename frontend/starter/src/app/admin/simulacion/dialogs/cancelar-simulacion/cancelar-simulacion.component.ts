import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-cancelar-simulacion',
  templateUrl: './cancelar-simulacion.component.html',
  styleUrls: ['./cancelar-simulacion.component.sass']
})
export class CancelarSimulacionComponent {
  constructor(public dialogRef: MatDialogRef<CancelarSimulacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.data);
  }

}
