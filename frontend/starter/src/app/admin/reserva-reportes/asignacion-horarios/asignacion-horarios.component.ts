import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/interfaces/reserva/area';
import { Filial } from 'src/app/interfaces/reserva/filial';
import { Sede } from 'src/app/interfaces/reserva/sede';
import { Especialidad } from 'src/app/interfaces/reserva/especialidad';
import { Semestre } from 'src/app/interfaces/reserva/semestre';
import { TipoAmbiente } from 'src/app/interfaces/reserva/tipoAmbiente';
import { Turno } from 'src/app/interfaces/reserva/turno';
import { Horas } from 'src/app/interfaces/reserva/horas';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { ReservaReportesService } from 'src/app/services/reserva/reportes.service';
import { AsignacionHorarios } from 'src/app/interfaces/reserva/asignacionHorarios';
import { Annos } from 'src/app/interfaces/reserva/annos';
import { Meses } from 'src/app/interfaces/reserva/meses';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExcelService } from 'src/app/core/service/excel.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/interfaces/format-datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-asignacion-horarios',
  templateUrl: './asignacion-horarios.component.html',
  styleUrls: ['./asignacion-horarios.component.sass','./asignacion-horarios.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class AsignacionHorariosComponent implements OnInit {
  procesando: boolean = false;
  form: FormGroup;
  areas: Area[];
  selectedArea: Area;
  selectedAreaStatus: number = 0;
  semestres: Semestre[];
  selectedSemestre: Semestre;
  filiales: Filial[];
  selectedFilial: Filial;   
  sedes: Sede[];
  selectedSede: Sede;
  especialidades: Especialidad[];
  selectedEspecialidad: Especialidad;
  tiposAmbiente: TipoAmbiente[];
  turnos:Turno[];
  horas:Horas[];
  requestFilter: any=null;
  annos: Annos[];
  meses: Meses[];

  reporteLista: AsignacionHorarios[];
  isTblLoading: boolean;
  displayedColumns: string[] = ['nombreFilial','nombreSede','codigoLocalSUNEDU','nombrePrograma','nombreEspecialidad','turno','curso','ciclo', 'nombreTipoAmbiente','capacidad','matriculados', 'nombreTipoHora','nombreTipoEnsenanza','asignado','noAsignado'];
  dataSource: MatTableDataSource<AsignacionHorarios> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;

  constructor(private fb: FormBuilder, public areaService: AreaService, private snackBar: MatSnackBar, public semestreService: SemestreService,
    public filialService: FilialService, public especialidadService: EspecialidadService, public sedeService: SedeService,
    public reservaReportesService: ReservaReportesService, public tipoAmbienteService: TipoAmbienteService,
    public datePipe:DatePipe,private excelService: ExcelService) { 
    this.initForm();    
    this.listaAreas();
    this.listaFiliales();
    this.listaSemestres();
    this.listaTipoAmbiente();
    this.listaTurnos();
    this.listaAnnos();
    this.listaMeses();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.form = this.fb.group({
      area: ['',
        [Validators.required],
      ],
      isSedeFilial: [false],
      isEspecialidad: [false],
      semestre: [''],
      annoProceso: ['',[Validators.minLength(4), Validators.maxLength(4)]],
      mesProceso: ['',[Validators.minLength(2), Validators.maxLength(2)]],
      filial: [0],
      sede: [0],
      especialidad: [0],
      turno: [0],
      tipoAmbiente: [0],
      aforoInferior: ['',[Validators.required]],
      aforoSuperior: ['',[Validators.required]],
      fechaInicio: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      horaInicio: ['',[Validators.required]],
      horaFin: ['',[Validators.required]],
      tipo: [1,[Validators.required]]
    });
  }
  
  listaAreas() {
    this.selectedArea = null;
    this.areaService.getAll().subscribe(
      (data) => {
        this.areas = null;
        if (data.status == 200) {
          this.areas = data.data;
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
  listaFiliales() {
    this.selectedFilial = null;    
    this.filialService.getAll().subscribe(
      (data) => {
        this.filiales = null;
        if (data.status == 200) {
          this.filiales = data.data;
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
  listaSemestres() {
    this.selectedSemestre = null;
    this.semestreService.getAll().subscribe(
      (data) => {
        this.semestres = null;
        if (data.status == 200) {
          this.semestres = data.data;
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
  listaHoras(){
    this.form.controls.horaInicio.setValue("");
    this.form.controls.horaFin.setValue("");
    this.horas=null;
    let valorTurno=this.form.controls.turno.value;
    if(this.form.controls.turno.value==0){
      valorTurno=null;
    }else{
      valorTurno=valorTurno.id;
    }
    console.log(valorTurno);
    this.reservaReportesService.horas(valorTurno).subscribe(
      (response) => {
        this.horas=response.data;
        console.log(response);
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
    let valorTipoAmbiente=this.form.controls.tipoAmbiente.value;
    if(this.form.controls.tipoAmbiente.value==0){
      valorTipoAmbiente=null;
    }
    let valorTurno=this.form.controls.turno.value;
    if(this.form.controls.turno.value==0){
      valorTurno=null;
    }

    let fechaInicio=this.form.controls.fechaInicio.value;
    fechaInicio =this.datePipe.transform(fechaInicio, 'yyyy-MM-dd');
    let fechaFin=this.form.controls.fechaFin.value;
    fechaFin =this.datePipe.transform(fechaFin, 'yyyy-MM-dd');

    let fechaInicio_convert =this.datePipe.transform(fechaInicio, 'dd/MM/yyyy');
    let fechaFin_convert =this.datePipe.transform(fechaFin, 'dd/MM/yyyy');

    let horaInicio=this.form.controls.horaInicio.value;
    //horaInicio =this.datePipe.transform(horaInicio, 'HH:mm');
    let horaFin=this.form.controls.horaFin.value;
    //horaFin =this.datePipe.transform(horaFin, 'HH:mm');

    let request: any = {
      area: this.form.controls.area.value
      , filial: valorFilial
      , sede: valorSede
      , especialidad: valorEspecialidad
      , semestre: this.form.controls.semestre.value
      , annoProceso: this.form.controls.annoProceso.value
      , mesProceso: this.form.controls.mesProceso.value
      , turno: valorTurno
      , tipoAmbiente: valorTipoAmbiente
      , aforoInferior: this.form.controls.aforoInferior.value
      , aforoSuperior: this.form.controls.aforoSuperior.value
      , fechaInicio: fechaInicio
      , fechaFin: fechaFin
      , horaInicio: horaInicio
      , horaFin: horaFin
      , tipo:this.form.controls.tipo.value
      , listaAsignacionHorario:this.reporteLista
      , fechaInicio_convert: fechaInicio_convert
      , fechaFin_convert: fechaFin_convert
    };
    
    this.requestFilter=request;
    return request;
  }
  filtrar(){
    this.dataSource = new MatTableDataSource<AsignacionHorarios>(null);
    this.reporteLista = null;
    this.isTblLoading = true;
    this.procesando = true;
    let request: any = this.formData();
    console.log(request);
    this.reservaReportesService.asignacionHorarios(request).subscribe(
      (response) => {
        console.log(response);
        this.procesando = false;
        
        this.reporteLista = response.data;
          this.dataSource = new MatTableDataSource<AsignacionHorarios>(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isTblLoading = false;
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
  exportar(){
    this.procesando = true;
    let request: any = this.formData();
    console.log(request);
    this.reservaReportesService.asignacionHorarios_donwload(request).subscribe(
      (response) => {
        console.log(response);
        this.procesando = false;
        if (response.status == 200) {
          if (response.data.status == 1) {
            Swal.fire({
              //position: 'top-end',
              icon: 'success',
              title: 'Proceso Finalizado',
              showConfirmButton: false,
              timer: 2500
            });
            window.open(response.data.data);
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
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  formSubmit(){}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  generateExcel() {
    //let request: any = this.formData();
    this.requestFilter.listaAsignacionHorario=this.reporteLista;
    this.excelService.generateExcelAsignacionHorario(this.requestFilter);
    
  }

}
