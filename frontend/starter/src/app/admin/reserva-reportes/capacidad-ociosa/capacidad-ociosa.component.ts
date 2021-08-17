import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dia } from 'src/app/interfaces/reserva/dia';
import { Area } from 'src/app/interfaces/reserva/area';
import { Filial } from 'src/app/interfaces/reserva/filial';
import { Sede } from 'src/app/interfaces/reserva/sede';
import { TipoAmbiente } from 'src/app/interfaces/reserva/tipoAmbiente';
import { Turno } from 'src/app/interfaces/reserva/turno';
import { Horas } from 'src/app/interfaces/reserva/horas';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { ReservaReportesService } from 'src/app/services/reserva/reportes.service';
import { DiasService } from 'src/app/services/reserva/dias.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CapacidadOciosa } from 'src/app/interfaces/reserva/capacidadOciosa';

import { ExcelService } from 'src/app/core/service/excel.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/interfaces/format-datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-capacidad-ociosa',
  templateUrl: './capacidad-ociosa.component.html',
  styleUrls: ['./capacidad-ociosa.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class CapacidadOciosaComponent implements OnInit {
  procesando: boolean = false;
  form: FormGroup;
  areas: Area[];
  selectedArea: Area;
  selectedAreaStatus: number = 0;
  filiales: Filial[];
  selectedFilial: Filial;   
  sedes: Sede[];
  selectedSede: Sede;
  tiposAmbiente: TipoAmbiente[];
  turnos:Turno[];
  dias: Dia[];
  selectedDia:Dia;
  horas:Horas[];  
  requestFilter: any=null;
  flag = false;

  reporteLista: CapacidadOciosa[];
  isTblLoading: boolean;
  displayedColumns: string[] = ['nombreFilial','nombreSede','codigoLocalSUNEDU','nombreTipoAmbiente','codigo','aforo','fecha','dia','turno','horaInicio','horaFin', 'horasOcioso', 'horasOcupado'];
  dataSource: MatTableDataSource<CapacidadOciosa> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;

  constructor(private fb: FormBuilder, public areaService: AreaService, private snackBar: MatSnackBar,
    public filialService: FilialService, public sedeService: SedeService,
    public reservaReportesService: ReservaReportesService, public tipoAmbienteService: TipoAmbienteService,
    public diasService:DiasService,
    public datePipe:DatePipe,private excelService: ExcelService) { 
      this.initForm();  
      this.listaAreas();
      this.listaFiliales();
      this.listaTipoAmbiente();
      this.listaTurnos();
    }

    initForm() {
      this.form = this.fb.group({
        area: ['', [Validators.required]],
        filial: [0],
        sede: [0],
        tipoAmbiente: [0],
        fechaInicio: ['',[Validators.required]],
        fechaFin: ['',[Validators.required]],
        turno: [0],
        horaInicio: ['',[Validators.required]],
        horaFin: ['',[Validators.required]],
        flag: [false]
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
    let horaFin=this.form.controls.horaFin.value;

    let request: any = {
      area: this.form.controls.area.value
      , filial: valorFilial
      , sede: valorSede
      , turno: valorTurno
      , tipoAmbiente: valorTipoAmbiente
      , fechaInicio: fechaInicio
      , fechaFin: fechaFin
      , horaInicio: horaInicio
      , horaFin: horaFin
      , listaCapacidadOciosa:this.reporteLista
      , fechaInicio_convert: fechaInicio_convert
      , fechaFin_convert: fechaFin_convert
      , flag: this.form.controls.flag.value
    };
    if(this.form.controls.flag.value){
      this.displayedColumns = ['nombreFilial','nombreSede','codigoLocalSUNEDU','nombreTipoAmbiente','codigo','aforo','turno','horasOcioso', 'horasOcupado', 'ociosoPorcentaje', 'ocupadoPorcentaje'];
    }else{
      this.displayedColumns = ['nombreFilial','nombreSede','codigoLocalSUNEDU','nombreTipoAmbiente','codigo','aforo','fecha','dia','turno','horaInicio','horaFin', 'horasOcioso', 'horasOcupado'];
    }
    
    
    this.requestFilter=request;
    return request;
  }
  ngOnInit(): void {
  }

  
  filtrar(){
    this.dataSource = new MatTableDataSource<CapacidadOciosa>(null);
    this.reporteLista = null;
    this.isTblLoading = true;
    this.procesando = true;
    let request: any = this.formData();
    console.log(request);
    this.reservaReportesService.capacidadOciosa(request).subscribe(
      (response) => {
        console.log(response);
        this.procesando = false;
        
        this.reporteLista = response.data;
          this.dataSource = new MatTableDataSource<CapacidadOciosa>(response.data);
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
    this.reservaReportesService.capacidadOciosa_donwload(request).subscribe(
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
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  generateExcel() {
    //let request: any = this.formData();
    this.requestFilter.listaCapacidadOciosa=this.reporteLista;
    
    if(this.requestFilter.flag){
      this.excelService.generateExcelCapacidadOciosaFlag(this.requestFilter);
    }else{
      this.excelService.generateExcelCapacidadOciosa(this.requestFilter);
    }
  }
  
}
