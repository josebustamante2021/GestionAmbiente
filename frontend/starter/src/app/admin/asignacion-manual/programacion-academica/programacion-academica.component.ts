import { Component, OnInit,ViewChild } from '@angular/core';
import { Area } from 'src/app/interfaces/reserva/area';
import { Filial } from 'src/app/interfaces/reserva/filial';
import { Especialidad } from 'src/app/interfaces/reserva/especialidad';
import { Semestre } from 'src/app/interfaces/reserva/semestre';
import { Sede } from 'src/app/interfaces/reserva/sede';
import { Ciclo } from 'src/app/interfaces/reserva/ciclos';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProgramacionAcademica } from 'src/app/interfaces/reserva/programacionAcademica';
import { ProgramacionHoraria } from 'src/app/interfaces/reserva/programacionHoraria';
import Swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ReservaReportesService } from 'src/app/services/reserva/reportes.service';
import { Turno } from 'src/app/interfaces/reserva/turno';
import { Annos } from 'src/app/interfaces/reserva/annos';
import { Meses } from 'src/app/interfaces/reserva/meses';
import { ReprocesoComponent } from '../dialogs/reproceso/reproceso.component';
import { QuitarAmbienteComponent } from '../dialogs/quitar-ambiente/quitar-ambiente.component';
import { QuitarAllambienteComponent } from '../dialogs/quitar-allambiente/quitar-allambiente.component';
import { AsignarAmbienteComponent } from '../dialogs/asignar-ambiente/asignar-ambiente.component';
import { CambiarCapacidadComponent } from '../dialogs/cambiar-capacidad/cambiar-capacidad.component';
import { QuitarAmbienteEspecialidadComponent } from '../dialogs/quitar-ambiente-especialidad/quitar-ambiente-especialidad.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/service/auth.service';
import {
  AbstractControl,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-programacion-academica',
  templateUrl: './programacion-academica.component.html',
  styleUrls: ['./programacion-academica.component.sass','./style.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProgramacionAcademicaComponent implements OnInit {

  procesando: boolean = false; areas: Area[];
  selectedArea: Area;
  filiales: Filial[];
  selectedFilial: Filial;
  especialidades: Especialidad[];
  selectedEspecialidad: Especialidad;
  sedes: Sede[];
  selectedSede: Sede;
  semestres: Semestre[];
  selectedSemestre: Semestre;
  form: FormGroup;
  selectedAreaStatus: number = 0;
  //turnos:String[]=["M","T","N"];
  turnos:Turno[];
  ciclos: Ciclo[];
  isTblLoading: boolean;
  isTblLoadingHorario: boolean;
  expandedElement: ProgramacionAcademica | null;
  progAcademica:ProgramacionAcademica[];
  horarios:ProgramacionHoraria[];
  displayedColumns: string[] = ['nombreFilial','nombreSede','nombrePrograma','nombreEspecialidad','curso','ciclo','turno', 'capacidad','capacidadDocente', 'matriculados','fechaInicio','fechaFin','actions'];
  dataSource: MatTableDataSource<ProgramacionAcademica> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;
  
  annos: Annos[];
  meses: Meses[];
  idLogin:number;

  constructor(private snackBar: MatSnackBar, public areaService: AreaService, public filialService: FilialService,
    public especialidadService: EspecialidadService, public semestreService: SemestreService, public sedeService: SedeService,
    public asignacionManualService:AsignacionManualService, private fb: FormBuilder,public reservaReportesService: ReservaReportesService,
    private authService: AuthService,
    public dialog: MatDialog) {
    this.idLogin=  this.authService.currentUserValue.id_login
    this.form = this.createForm();
    this.listaTurnos();
    this.listaAnnos();
    this.listaMeses();
  }


  createForm(): FormGroup {
    return this.fb.group({
      area: ['',
        [Validators.required],
      ],
      isSedeFilial: [''],
      isEspecialidad: [''],
      semestre: [''],
      annoProceso: ['',
        [Validators.minLength(4), Validators.maxLength(4)],
      ],
      mesProceso: ['',
        [Validators.minLength(2), Validators.maxLength(2)],
      ],
      filial: [0],
      sede: [0],
      especialidad: [0],      
      turno: [0],      
      ciclo: [0],
    });
  }
  formData(){
    let valorFilial=this.form.controls.filial.value;
    if(this.form.controls.filial.value==0){
      valorFilial=null;
    }
    let valorSede=this.form.controls.sede.value;
    if(this.form.controls.sede.value==0){
      valorSede=null;
    }
    let valorEspecialidad=this.form.controls.especialidad.value;
    if(this.form.controls.especialidad.value==0){
      valorEspecialidad=null;
    }
    let valorTurno=this.form.controls.turno.value;
    if(this.form.controls.turno.value==0){
      valorTurno=null;
    }
    let valorCiclo=this.form.controls.ciclo.value;
    if(this.form.controls.ciclo.value==0){
      valorCiclo=null;
    }

    let request: any = {
      area: this.form.controls.area.value
      , filial: valorFilial
      , sede: valorSede
      , especialidad: valorEspecialidad
      , semestre: this.form.controls.semestre.value
      , annoProceso: this.form.controls.annoProceso.value
      , mesProceso: this.form.controls.mesProceso.value
      , turno: valorTurno
      , ciclo: valorCiclo
      , id_login: this.idLogin
    };
    return request;
  }
  ngOnInit(): void {
    this.listaAreas();
    this.listaFiliales();
    this.listaSemestres();
  }
  listaCiclos() {

    this.selectedArea = null;
    this.asignacionManualService.getCiclos(this.formData()).subscribe(
      (response) => {   
        this.ciclos = null; 
        if (response.status == 200) {    
          this.ciclos=response.data
        }
      }
    );
  }
  listaAreas() {
    this.selectedArea = null;
    this.areaService.getAll().subscribe(
      (data) => {
        this.areas = null;
        if (data.status == 200) {
          this.areas = data.data;
        }
      }
    );
  }
  listaFiliales() {
    this.form.controls.filial.setValue(0);
    this.selectedFilial = null;
    this.filialService.getAll().subscribe(
      (data) => {
        this.filiales = null;
        if (data.status == 200) {
          this.filiales = data.data;
        }
      }
    );
  }
  listaEspecialidades() {
    this.form.controls.especialidad.setValue(0);
    this.form.controls.annoProceso.setValue("");
    this.form.controls.mesProceso.setValue("");
    this.form.controls.semestre.setValue("");
    if ('' + this.selectedArea.codigoArea == '04' || '' + this.selectedArea.codigoArea == '05') {
      this.selectedAreaStatus = 2;
      this.form.get('annoProceso').setValidators([Validators.required]);
      this.form.get('mesProceso').setValidators([Validators.required]);
      this.form.get('semestre').setValidators(null);
    } else {
      this.selectedAreaStatus = 1;
      this.form.get('annoProceso').setValidators(null);
      this.form.get('mesProceso').setValidators(null);
      this.form.get('semestre').setValidators(Validators.required);
    }

    this.form.get('annoProceso').updateValueAndValidity();
    this.form.get('mesProceso').updateValueAndValidity();
    this.form.get('semestre').updateValueAndValidity();
    this.selectedEspecialidad = null;
    this.especialidadService.getAll(this.selectedArea.codigoArea).subscribe(
      (data) => {
        this.especialidades = null;
        if (data.status == 200) {
          this.especialidades = data.data;
        }
      }
    );
    
    this.listaCiclos();
  }
  listaSemestres() {
    this.form.controls.semestre.setValue("");
    this.selectedSemestre = null;
    this.semestreService.getAll().subscribe(
      (data) => {
        this.semestres = null;
        if (data.status == 200) {
          this.semestres = data.data;
        }
      }
    );
  }

  listaSedes() {
    this.form.controls.sede.setValue(0);
    this.sedes = null;
    this.selectedSede = null;
    if(this.form.controls.filial.value!=0){
      this.sedeService.getAll(this.selectedFilial.filialID).subscribe(
        (data) => {
          this.sedes = null;
          if (data.status == 200) {
            this.sedes = data.data;
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
  }
  listaTurnos(){
    this.reservaReportesService.turnosAll().subscribe(
    (data) => {
      this.turnos = data;
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
  
  listaAnnos(){
    this.areaService.annosgetAll().subscribe(
      (data) => {
        this.annos = null;
        if (data.status == 200) {
          this.annos = data.data;
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
  listaMeses(){
    this.areaService.mesesgetAll().subscribe(
      (data) => {
        this.meses = null;
        if (data.status == 200) {
          this.meses = data.data;
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
  filtrar(){
    this.progAcademica=null;
    this.dataSource = new MatTableDataSource<ProgramacionAcademica>(null);
    this.isTblLoading = true;
    this.procesando = true;console.log(this.formData());
    this.asignacionManualService.getProgAcademica(this.formData()).subscribe(
      (response) => {   
        this.procesando = false;
        if (response.status == 200) {    console.log(response);
          this.progAcademica=response.data;
          this.dataSource = new MatTableDataSource<ProgramacionAcademica>(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isTblLoading = false;
        }
      }, (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.procesando = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error en el Proceso',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  filtrarAll(){
    this.progAcademica=null;
    this.dataSource = new MatTableDataSource<ProgramacionAcademica>(null);
    this.isTblLoading = true;
    this.procesando = true;console.log(this.formData());
    this.asignacionManualService.getProgAcademicaAll(this.formData()).subscribe(
      (response) => {   
        this.procesando = false;
        if (response.status == 200) {    console.log(response);
          this.progAcademica=response.data;
          this.dataSource = new MatTableDataSource<ProgramacionAcademica>(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isTblLoading = false;
        }
      }, (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.procesando = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error en el Proceso',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  progHoraria(codigoAca:number){   console.log(codigoAca); 
    this.isTblLoadingHorario = true;
    this.horarios=null;
    this.asignacionManualService.getProgHorario(codigoAca).subscribe(
      (response) => {       console.log(response);  
      this.isTblLoadingHorario = false;  
        if (response.status == 200) {    
          this.horarios=response.data;
        }
      }, (error: HttpErrorResponse) => {
        this.isTblLoadingHorario = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error en el Proceso',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  cambiarAmbiente(row){
    console.log("change ubicacion "+row.codigoAca+"---"+row.programacionHorarioID);
    const dialogRef = this.dialog.open(AsignarAmbienteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  
        console.log("ambiente atualizado");
        //this.progHoraria(result.codigoAca);
        let row = this.horarios.findIndex(obj => obj.programacionHorarioID  == result.programacionHorarioID);
        this.horarios[row].codigoAmbiente=result.codigoAmbiente;
      }
    });
  }

  reprocesar(row){
    console.log(row);
    //const id = row.id;
    const dialogRef = this.dialog.open(ReprocesoComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {   
        this.procesando = true;
        let request: any = {
          codigoAca: result.codigoAca,
          id_login:this.idLogin
        }

        this.asignacionManualService.reproceso(request).subscribe(
          (data) => {
            this.procesando = false;
            if (data.status == 200) {
              if (data.data.status == 1) {
                Swal.fire({
                  //position: 'top-end',
                  icon: 'success',
                  title: 'Proceso Finalizado',
                  showConfirmButton: false,
                  timer: 2500
                });
                this.progHoraria(result.codigoAca);
              } else {
                Swal.fire({
                  //position: 'top-end',
                  icon: 'error',
                  title: 'Ocurrio un Error en el Proceso',
                  showConfirmButton: false,
                  timer: 2500
                });
              }
            }
          }, (error: HttpErrorResponse) => {
            this.procesando = false;
            Swal.fire({
              //position: 'top-end',
              icon: 'error',
              title: 'Ocurrio un Error en el Proceso',
              showConfirmButton: false,
              timer: 2500
            });
          }
        );
        //this.progHoraria(result.codigoAca);        
      }
    });
  }
  quitarAmbienteAllHorarios(row){
    console.log(row);
    const dialogRef = this.dialog.open(QuitarAllambienteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  
        this.procesando = true;
                     
        this.asignacionManualService.reprocesoQuitarAmbienteAllHorarios(result.codigoAca,this.idLogin).subscribe(
          (response) => {
            this.procesando = false;
            if(response.data.status==1){
              this.progHoraria(result.codigoAca);
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
            this.procesando = false;
            this.showNotification(
              'snackbar-danger',
              'Ocurrio un error en el proceso...!!!',
              'bottom',
              'center'
            );
          }
        );
      }
    });

  }
  quitarAmbiente(row){
    const dialogRef = this.dialog.open(QuitarAmbienteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  
        this.procesando = true;
                     
        this.asignacionManualService.reprocesoQuitarAmbiente(result.programacionHorarioID,this.idLogin).subscribe(
          (response) => {
            this.procesando = false;
            if(response.data.status==1){
              let row = this.horarios.findIndex(obj => obj.programacionHorarioID  == result.programacionHorarioID);
              //this.horarios[row].codigoAmbiente=0;
              this.horarios[row].codigoAmbiente=null;
              console.log(this.horarios[row].codigoAmbiente=null);
              //this.progHoraria(result.codigoAca);
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
            this.procesando = false;
            this.showNotification(
              'snackbar-danger',
              'Ocurrio un error en el proceso...!!!',
              'bottom',
              'center'
            );
          }
        );
      }
    });
  }
  cambiarCapacidad(row){
    console.log(row);
    row.idLogin=this.idLogin
    const dialogRef = this.dialog.open(CambiarCapacidadComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  
        console.log(result);
        console.log(result.codigoAca);
        
        let row = this.progAcademica.findIndex(obj => obj.codigoAca  == result.codigoAca);
        this.progAcademica[row].capacidad=result.capacidad;
        this.progAcademica[row].capacidadDocente=result.capacidadDocente;
      }
    });
  }
  eliminacionMasiva(){
    console.log(this.formData());
    const dialogRef = this.dialog.open(QuitarAmbienteEspecialidadComponent, {
      data: this.formData(),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  console.log(result);
        this.procesando = true;
                     
        this.asignacionManualService.reprocesoEliminacionMasiva(result).subscribe(
          (response) => {
            this.procesando = false;
            if(response.data.status==1){
              Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Proceso Finalizado',
                showConfirmButton: false,
                timer: 2500
              });
              //this.progHoraria(result.codigoAca);
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
            this.procesando = false;
            this.showNotification(
              'snackbar-danger',
              'Ocurrio un error en el proceso...!!!',
              'bottom',
              'center'
            );
          }
        );
      }
    });

  }

  expanded(expandedElement,codigoAca){
    if(expandedElement!=null){
      this.progHoraria(codigoAca);
    }
  }
}
