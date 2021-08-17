import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/interfaces/reserva/area';
import { Filial } from 'src/app/interfaces/reserva/filial';
import { Especialidad } from 'src/app/interfaces/reserva/especialidad';
import { Semestre } from 'src/app/interfaces/reserva/semestre';
import { Sede } from 'src/app/interfaces/reserva/sede';
import { TipoAmbiente } from 'src/app/interfaces/reserva/tipoAmbiente';
import { SimulacionReserva } from 'src/app/interfaces/reserva/simulacionReserva';
import { Annos } from 'src/app/interfaces/reserva/annos';
import { Meses } from 'src/app/interfaces/reserva/meses';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { SimulacionReservaService } from 'src/app/services/reserva/simulacion.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/service/auth.service';
import { CancelarSimulacionComponent } from '../dialogs/cancelar-simulacion/cancelar-simulacion.component';
import {
  AbstractControl,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-simulacion-lista',
  templateUrl: './simulacion-lista.component.html',
  styleUrls: ['./simulacion-lista.component.sass']
})
export class SimulacionListaComponent implements OnInit {
  procesando: boolean = false;
  isTblLoading: boolean;
  data: SimulacionReserva[];
  objetoSimulacion: SimulacionReserva;
  areas: Area[];
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
  interval;
  time: number = 0;
  selectedAreaStatus: number = 0;
  isSedeFilial = false;
  isEspecialidad = false;
  RegistrosProcesados: string;
  tiposAmbiente: TipoAmbiente[];
  annos: Annos[];
  meses: Meses[];

  displayedColumns: string[] = ['simulacionID', 'fecha_convert', 'codigoArea', 'nombreFilial','codigoSede', 'codigoEspecialidad','codigoTipoAmbiente', 'semestre', 'annoProceso', 'mesProceso', 'numRegistros','nameEstado', 'actions'];
  dataSource: MatTableDataSource<SimulacionReserva> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;
  idLogin:number;
  constructor(private snackBar: MatSnackBar, public areaService: AreaService, public filialService: FilialService,
    public especialidadService: EspecialidadService, public semestreService: SemestreService, public sedeService: SedeService,
    public simulacionReservaService: SimulacionReservaService, public dialog: MatDialog, private fb: FormBuilder, public tipoAmbienteService: TipoAmbienteService,
    private authService: AuthService) {
    this.idLogin=  this.authService.currentUserValue.id_login
    this.form = this.createForm();
    //this.consultarProceso();
    this.listaTipoAmbiente();
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
      annoProceso: [''],
      mesProceso: [''],
      filial: [0],
      sede: [0],
      especialidad: [0],
      tipoAmbiente: [0],
    });
  }

  ngOnInit(): void {
    this.listaAreas();
    this.listaFiliales();
    this.listaSemestres();
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
    this.dataSource = new MatTableDataSource<SimulacionReserva>(this.data);
    this.simulacionReservaService.getAll_SimulacionReserva().subscribe(
      (data) => {
        this.data = data.data;
        this.dataSource = new MatTableDataSource<SimulacionReserva>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isTblLoading = false;
        this.consultarProceso();
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.data = null;
        this.dataSource = new MatTableDataSource<SimulacionReserva>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  
  listaTipoAmbiente(){
    this.tipoAmbienteService.getAll().subscribe(
      (data) => {
        this.tiposAmbiente = null;
        if (data.status == 200) {
          this.tiposAmbiente = data.data;
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
  changeisSedeFilial(event) {
    if(event.checked){
      this.form.get('filial').setValidators(Validators.required);
      this.form.get('sede').setValidators(Validators.required);
    }else{
      
      this.form.get('filial').setValidators(null);
      this.form.get('sede').setValidators(null);
    }
    
    this.form.get('filial').updateValueAndValidity();
    this.form.get('sede').updateValueAndValidity();
  }
  changeisEspecialidad(event) {
    if(event.checked){
      this.form.get('especialidad').setValidators(Validators.required);
    }else{      
      this.form.get('especialidad').setValidators(null);
    }
    this.form.get('especialidad').updateValueAndValidity();
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  procesarSimulacion() {
    this.procesando = true;
    this.RegistrosProcesados="Procesando...";
    this.verificaProceso = setInterval(() => {
      this.consultarProcesoEjecutar();
    },5000);
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
    let valortipoAmbiente=this.form.controls.tipoAmbiente.value;
    if(this.form.controls.tipoAmbiente.value==0){
      valortipoAmbiente=null;
    }

    let request: any = {
      area: this.form.controls.area.value
      , filial: valorFilial
      , sede: valorSede
      , especialidad: valorEspecialidad
      , semestre: this.form.controls.semestre.value
      , annoProceso: this.form.controls.annoProceso.value
      , mesProceso: this.form.controls.mesProceso.value
      , tipoAmbiente: valortipoAmbiente
      , id_login: this.authService.currentUserValue.id_login
    };
    
    this.simulacionReservaService.simulacion(request).subscribe(
      (data) => {
        this.procesando = false;
        if (data.status == 200) {
          if (data.data.status == 1) {
            this.RegistrosProcesados = data.data.out_id + " Registros procesados";
            Swal.fire({
              //position: 'top-end',
              icon: 'success',
              title: 'Proceso Finalizado',
              showConfirmButton: false,
              timer: 2500
            });
            clearInterval(this.verificaProceso);
          } else {
            Swal.fire({
              //position: 'top-end',
              icon: 'error',
              title: 'Ocurrio un Error en el Proceso',
              showConfirmButton: false,
              timer: 2500
            });
            clearInterval(this.verificaProceso);
          }
        }
        this.refresh();
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
  }
  verificaProceso:any;
  accion:number=0;
  consultarProcesoEjecutar(){
    clearInterval(this.verificaProceso);
    this.procesando = true;
    this.simulacionReservaService.simulacionProceso(this.authService.currentUserValue.id_login).subscribe(
      (response) => {

        console.log("en proceso");
        if(response.data!=null){
          if(response.data.estado==0){
            this.loadData();
            this.consultarProceso();
           /* this.verificaProceso = setInterval(() => {
              this.consultarProceso();
            },15000);*/
          }
        }
       
        
      }, (error: HttpErrorResponse) => {
        this.RegistrosProcesados="Ocurrio un error en la conexion ";
        this.procesando = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  consultarProceso(){
    clearInterval(this.verificaProceso);
    this.procesando = true;
    this.simulacionReservaService.simulacionProceso(this.authService.currentUserValue.id_login).subscribe(
      (response) => {
        if(response.data!=null){
        if(response.data.estado==0){
          if(this.data!=null){
          if(this.data.length>0){
            this.objetoSimulacion=response.data;
            this.RegistrosProcesados = response.data.procesando+" / "+response.data.numRegistros + " Registros procesados";
            
          }
          }
          this.accion=this.accion++;          
             /* this.verificaProceso = setInterval(() => {
                this.consultarProceso();
              },60000);*/
        }else{
          this.RegistrosProcesados = response.data.procesando+" / "+response.data.numRegistros + " Registros procesados";
          this.procesando = false; 
          clearInterval(this.verificaProceso); 
        }
        let row = this.data.findIndex(obj => obj.simulacionID  == response.data.simulacionID);
        console.log(this.data[row]);
        this.data[row].procesando=response.data.procesando;
            this.data[row].numRegistros=response.data.numRegistros;
            this.data[row].estado=response.data.estado;
            this.data[row].nameEstado=response.data.nameEstado;
      }else{
        this.procesando = false;
        clearInterval(this.verificaProceso);
      }
        
      }, (error: HttpErrorResponse) => {
        clearInterval(this.verificaProceso);
        this.RegistrosProcesados="Ocurrio un error en la conexion ";
        this.procesando = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  
  getDialogData() {
    return this.data;
  }
  
  cancelarProceso(row){
    row.accion="Detener el Proceso";   
    const dialogRef = this.dialog.open(CancelarSimulacionComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  
        this.procesando = true;
                     
        this.simulacionReservaService.cancelarProceso(row.simulacionID).subscribe(
          (response) => {
            this.procesando = false;
            if(response.data.status==1){
              let row = this.data.findIndex(obj => obj.simulacionID  == response.data.out_id);
              this.data[row].estado=2;
              this.RegistrosProcesados="Se detuvo el proceso";
              Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Proceso Finalizado',
                showConfirmButton: false,
                timer: 2500
              });
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
  anularAsignacion(row){ 
    row.accion="Anular la asignacion procesada";   
    const dialogRef = this.dialog.open(CancelarSimulacionComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result!=null) {  
        this.procesando = true;
                     
        this.simulacionReservaService.anularAsignacion(row.simulacionID,this.idLogin).subscribe(
          (response) => {
            this.procesando = false;
            if(response.data.status==1){
              let row = this.data.findIndex(obj => obj.simulacionID  == response.data.out_id);
              this.data[row].estado=3;
              this.RegistrosProcesados="Asignacion anulada";
              Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Proceso Finalizado',
                showConfirmButton: false,
                timer: 2500
              });
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
  actualizarProceso(row){
    this.simulacionReservaService.simulacionProceso(this.idLogin).subscribe(
      (response) => {
        if(response.data!=null){
        if(response.data.estado==0){
          if(this.data!=null){
          if(this.data.length>0){
            this.objetoSimulacion=response.data;
            this.RegistrosProcesados = response.data.procesando+" / "+response.data.numRegistros + " Registros procesados";
            
          }
          }
          this.accion=this.accion++;          
              /*this.verificaProceso = setInterval(() => {
                this.consultarProceso();
              },15000);*/
        }else{
          this.RegistrosProcesados = response.data.procesando+" / "+response.data.numRegistros + " Registros procesados";
          this.procesando = false; 
          clearInterval(this.verificaProceso); 
        }
        let row = this.data.findIndex(obj => obj.simulacionID  == response.data.simulacionID);
        this.data[row].procesando=response.data.procesando;
            this.data[row].numRegistros=response.data.numRegistros;
            this.data[row].estado=response.data.estado;
            this.data[row].nameEstado=response.data.nameEstado;
      }else{
        this.procesando = false;
        clearInterval(this.verificaProceso);
      }
        
      }, (error: HttpErrorResponse) => {
        clearInterval(this.verificaProceso);
        this.RegistrosProcesados="Ocurrio un error en la conexion ";
        this.procesando = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
  
  
}
