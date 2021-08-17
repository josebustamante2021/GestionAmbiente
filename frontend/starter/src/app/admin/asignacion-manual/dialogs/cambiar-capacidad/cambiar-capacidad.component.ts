import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProgramacionAcademica } from 'src/app/interfaces/reserva/programacionAcademica';
import { CapacidadGrupo } from 'src/app/interfaces/reserva/capacidadGrupo';
//import { UsuariosService } from 'src/app/services/reserva/usuarios.service';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-cambiar-capacidad',
  templateUrl: './cambiar-capacidad.component.html',
  styleUrls: ['./cambiar-capacidad.component.sass']
})
export class CambiarCapacidadComponent {
  dialogTitle: string;
  proForm: FormGroup;
  obj: ProgramacionAcademica;
  capacidadGrupoL: CapacidadGrupo[];
  grupoSeleccionado:CapacidadGrupo=null;
  
  constructor(
    public dialogRef: MatDialogRef<CambiarCapacidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public asignacionManualService:AsignacionManualService,
    //public usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  )  { 
    this.obj = data;
    this.selectCapacidadGrupo(this.obj.codigoAca);
      console.log( this.obj);
      
    this.proForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      codigoAca: [this.obj.codigoAca],
      capacidad: [this.obj.capacidad,Validators.min(this.obj.matriculados)],
      capacidadDocente: [this.obj.capacidadDocente,Validators.min(0)],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  confirmAdd(){
    console.log(this.proForm.getRawValue());
    this.asignacionManualService.cambiarCapacidad(this.proForm.controls.codigoAca.value,this.proForm.controls.capacidad.value,this.proForm.controls.capacidadDocente.value,this.obj.idLogin).subscribe(
      (response) => {
        //this.data = data.data;
        console.log(response);
        if(response.data.status==1){
          this.obj.capacidad=this.proForm.controls.capacidad.value;
          this.obj.capacidadDocente=this.proForm.controls.capacidadDocente.value;
          this.dialogRef.close(this.obj);
          this.showNotification(
            'snackbar-success',
            'Capacidad Actualizada...!!!',
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  selectCapacidadGrupo(codigoAca){
    this.capacidadGrupoL = null;
    this.asignacionManualService.selectCapacidadGrupo(codigoAca).subscribe(
      (data) => {
        this.capacidadGrupoL = null;
        if (data.status == 200) {
          this.capacidadGrupoL = data.data;
        }
      }
    );
  }
  
  marcarGrupo(row){
    this.grupoSeleccionado=row;
    console.log(row);
    this.proForm.get('capacidad').setValidators([Validators.required,Validators.min(row.matriculados)]);
    this.proForm.get('capacidad').setValue(row.capacidad);
  }
  confirmAddxGrupo(){    
    console.log(this.grupoSeleccionado);
    console.log(this.proForm.getRawValue());
    this.asignacionManualService.cambiarCapacidadxGrupo(this.grupoSeleccionado.capacidadGrupoID,this.proForm.controls.codigoAca.value,this.proForm.controls.capacidad.value,this.proForm.controls.capacidadDocente.value,this.obj.idLogin).subscribe(
      (response) => {
        //this.data = data.data;
        console.log(response);
        if(response.data.status==1){
          this.obj.capacidad=this.proForm.controls.capacidad.value;
          this.obj.capacidadDocente=this.proForm.controls.capacidadDocente.value;
          this.dialogRef.close(this.obj);
          this.showNotification(
            'snackbar-success',
            'Capacidad Actualizada...!!!',
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
