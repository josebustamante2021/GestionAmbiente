import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dia } from 'src/app/interfaces/reserva/dia';
import { Filial } from 'src/app/interfaces/reserva/filial';
import { Sede } from 'src/app/interfaces/reserva/sede';
import { TipoAmbiente } from 'src/app/interfaces/reserva/tipoAmbiente';
import { Ambiente } from 'src/app/interfaces/reserva/ambiente';
import { Turno } from 'src/app/interfaces/reserva/turno';
import { Horas } from 'src/app/interfaces/reserva/horas';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { AmbienteService } from 'src/app/services/reserva/ambiente.service';
import { ReservaReportesService } from 'src/app/services/reserva/reportes.service';
import { DiasService } from 'src/app/services/reserva/dias.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OcupabilidadAmbiente } from 'src/app/interfaces/reserva/ocupabilidadAmbiente';
import { ExcelService } from 'src/app/core/service/excel.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/interfaces/format-datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
let workbook: ExcelProper.Workbook = new Excel.Workbook();

@Component({
  selector: 'app-ocupabilidad-ambiente',
  templateUrl: './ocupabilidad-ambiente.component.html',
  styleUrls: ['./ocupabilidad-ambiente.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class OcupabilidadAmbienteComponent implements OnInit {
  procesando: boolean = false;
  form: FormGroup;
  filiales: Filial[];
  selectedFilial: Filial;   
  sedes: Sede[];
  selectedSede: Sede;
  tiposAmbiente: TipoAmbiente[];
  selectedTipoAmbiente:TipoAmbiente;
  ambientes: Ambiente[];
  horas:Horas[];
  turnos:Turno[];
  dias: Dia[];
  selectedDia:Dia;
  requestFilter: any=null;

  reporteLista: OcupabilidadAmbiente[];
  isTblLoading: boolean;
  displayedColumns: string[] = ['nombreArea','nombreFilial','nombreSedeAca','codigoLocalSUNEDU','nombrePrograma','nombreEspecialidad','curso','turno','fechaInicio','fechaFinal','grupo','flagAmbienteComun','nombreTipoAmbiente','nombreSede','codigo','aforo', 'lunes','martes','miercoles','jueves','viernes','sabado','domingo'];
  dataSource: MatTableDataSource<OcupabilidadAmbiente> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,public reservaReportesService: ReservaReportesService,
    public filialService: FilialService, public sedeService: SedeService,public ambienteService:AmbienteService,
    public tipoAmbienteService: TipoAmbienteService,
    public diasService:DiasService,
    public datePipe:DatePipe,private excelService: ExcelService) {
    this.initForm();  
    this.listaFiliales();
    this.listaTipoAmbiente();
    this.listaDias();  
    this.listaTurnos();
   }

   initForm() {
    this.form = this.fb.group({      
      filial: ['',[Validators.required]],
      sede: ['',[Validators.required]],
      turno: [0],
      tipoAmbiente: ['',[Validators.required]],
      ambiente: [0],
      fechaInicio: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      dia: ['',[Validators.required]],
      horaInicio: ['',[Validators.required]],
      horaFin: ['',[Validators.required]]
    });
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
  listaDias(){
    this.diasService.getAll().subscribe(
      (data) => {
          this.dias = data;console.log(this.dias);
          this.selectedDia=this.dias[0];
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
  listaAmbientes() {
    this.form.controls.ambiente.setValue(0);
    this.ambientes = null;

    if(this.form.controls.tipoAmbiente.value!=0){
      console.log(this.selectedSede);
      console.log(this.selectedTipoAmbiente);
      console.log(this.selectedSede.codigoSede);
      console.log(this.selectedTipoAmbiente.codigo);
      console.log(this.form.controls.sede.value);
      let codSede=this.form.controls.sede.value;
      if(codSede!='0'){
        codSede=codSede.codigoSede;
      }
      console.log(codSede);
      this.ambienteService.getAll(codSede,this.selectedTipoAmbiente.codigo).subscribe(
        (data) => {console.log(data);
          this.ambientes = null;
          if (data.status == 200) {
            this.ambientes = data.data;
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
      (data) => {console.log("turnos.........");console.log(data);
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
  ngOnInit(): void {
  }

  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportar(){
    this.procesando = true;
    let request: any = this.formData();
    console.log(request);
    this.reservaReportesService.ocupabilidadAmbiente_download(request).subscribe(
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
  filtrar(){
    this.dataSource = new MatTableDataSource<OcupabilidadAmbiente>(null);
    this.reporteLista = null;
    this.isTblLoading = true;
    this.procesando = true;
    let request: any = this.formData();
    console.log(request);
    this.reservaReportesService.ocupabilidadAmbiente(request).subscribe(
      (response) => {
        console.log(response);
        this.procesando = false;
        
        this.reporteLista = response.data;
          this.dataSource = new MatTableDataSource<OcupabilidadAmbiente>(response.data);
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
  
  formData(){
    let valorFilial=this.form.controls.filial.value;
    if(this.form.controls.filial.value==0){
      valorFilial=null;
    }
    let valorSede=this.form.controls.sede.value;
    if(this.form.controls.sede.value==0){
      valorSede=null;
    }
    let valorTipoAmbiente=this.form.controls.tipoAmbiente.value;
    if(this.form.controls.tipoAmbiente.value==0){
      valorTipoAmbiente=null;
    }
    let valorAmbiente=this.form.controls.ambiente.value;
    if(this.form.controls.ambiente.value==0){
      valorAmbiente=null;
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
      filial: valorFilial
      , sede: valorSede
      , turno: valorTurno
      , tipoAmbiente: valorTipoAmbiente
      , ambiente: valorAmbiente
      , fechaInicio: fechaInicio
      , fechaFin: fechaFin
      , dia: this.form.controls.dia.value
      , horaInicio: horaInicio
      , horaFin: horaFin
      , listaOcupabilidadAmbiente:this.reporteLista
      , fechaInicio_convert: fechaInicio_convert
      , fechaFin_convert: fechaFin_convert
    };
    this.requestFilter=request;
    return request;
  }
  generateExcel() {
    //let request: any = this.formData();
    this.requestFilter.listaOcupabilidadAmbiente=this.reporteLista;
    this.excelService.generateExcelOcupabilidadAmbiente(this.requestFilter);
    
  }
}
