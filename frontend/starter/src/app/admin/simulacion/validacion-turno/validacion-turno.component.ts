import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/interfaces/reserva/area';
import { Filial } from 'src/app/interfaces/reserva/filial';
import { Especialidad } from 'src/app/interfaces/reserva/especialidad';
import { Semestre } from 'src/app/interfaces/reserva/semestre';
import { Sede } from 'src/app/interfaces/reserva/sede';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { SimulacionReservaService } from 'src/app/services/reserva/simulacion.service';
import { ValidacionTurno } from 'src/app/interfaces/reserva/validacionTurno';
import { Annos } from 'src/app/interfaces/reserva/annos';
import { Meses } from 'src/app/interfaces/reserva/meses';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { ExcelService } from 'src/app/core/service/excel.service';

@Component({
  selector: 'app-validacion-turno',
  templateUrl: './validacion-turno.component.html',
  styleUrls: ['./validacion-turno.component.sass']
})
export class ValidacionTurnoComponent implements OnInit {
 // @HostListener('window:beforeunload')
  //canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
  //}

  procesando: boolean = false;
  form: FormGroup;
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
  selectedAreaStatus: number = 0;
  isSedeFilial = false;
  isEspecialidad = false;
  requestFilter: any=null;
  annos: Annos[];
  meses: Meses[];

  progAcademicaLista: ValidacionTurno[];
  isTblLoadingSimulacion: boolean;
  displayedColumnsSimulacion: string[] = ['nombreArea','semestre','annoProceso','mesProceso','nombreFilial','nombreSede','codigoLocalSUNEDU','nombrePrograma','nombreEspecialidad','ciclo','curso','turno','fechaInicio','fechaFin', 'nombreTipoAmbiente','grupo','flagAmbienteComun','lunes','martes','miercoles','jueves','viernes','sabado','domingo','cumple'];
  dataSourceSimulacion: MatTableDataSource<ValidacionTurno> | null;
  @ViewChild('paginatorSimulacion', { static: true }) paginatorSimulacion: MatPaginator;
  @ViewChild('sortSimulacionTableSort') sortSimulacion: MatSort;

  constructor(private fb: FormBuilder,public areaService: AreaService, public filialService: FilialService,
    public especialidadService: EspecialidadService, public semestreService: SemestreService, public sedeService: SedeService,
    public simulacionReservaService: SimulacionReservaService,private excelService: ExcelService,private snackBar: MatSnackBar) { 
    this.initForm();
    
    this.listaAreas();
    this.listaFiliales();
    this.listaSemestres();
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
    });
    /*this.fb.group({
      tipo: ['', [Validators.required]],
      sede: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });*/
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
        }
      );
    }
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

    let request: any = {
      area: this.form.controls.area.value
      , filial: valorFilial
      , sede: valorSede
      , especialidad: valorEspecialidad
      , semestre: this.form.controls.semestre.value
      , annoProceso: this.form.controls.annoProceso.value
      , mesProceso: this.form.controls.mesProceso.value
      , listaValidacionTurno:this.progAcademicaLista
    };
    this.requestFilter=request;
    return request;
  }
  filtrar(){
    this.dataSourceSimulacion = new MatTableDataSource<ValidacionTurno>(null);
    this.progAcademicaLista=null;
    this.isTblLoadingSimulacion = true;
    this.procesando = true;
    let request: any = this.formData();
    console.log(request);
    this.simulacionReservaService.validacionTurnos(request).subscribe(
      (response) => {
        console.log(response);
        this.procesando = false;
        this.progAcademicaLista = response.data;
          this.dataSourceSimulacion = new MatTableDataSource<ValidacionTurno>(response.data);
          this.dataSourceSimulacion.paginator = this.paginatorSimulacion;
          this.dataSourceSimulacion.sort = this.sortSimulacion;
          this.isTblLoadingSimulacion = false;
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
    this.simulacionReservaService.validacionTurnos_donwload(request).subscribe(
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

  
  applyFilterSimulacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSimulacion.filter = filterValue.trim().toLowerCase();
  }
  
  
  generateExcel() {
    //let request: any = this.formData();
    this.requestFilter.listaValidacionTurno=this.progAcademicaLista;
    this.excelService.generateExcelValidacionTurno(this.requestFilter);
    
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
