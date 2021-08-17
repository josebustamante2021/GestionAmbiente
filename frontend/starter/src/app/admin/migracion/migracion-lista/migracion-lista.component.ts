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
import { Ciclo } from 'src/app/interfaces/reserva/ciclos';
import { TipoAmbiente } from 'src/app/interfaces/reserva/tipoAmbiente';
import { SimulacionReserva } from 'src/app/interfaces/reserva/simulacionReserva';
import { Annos } from 'src/app/interfaces/reserva/annos';
import { Meses } from 'src/app/interfaces/reserva/meses';
import { AreaService } from 'src/app/services/reserva/area.service';
import { FilialService } from 'src/app/services/reserva/filial.service';
import { EspecialidadService } from 'src/app/services/reserva/especialidad.service';
import { SedeService } from 'src/app/services/reserva/sede.service';
import { SemestreService } from 'src/app/services/reserva/semestre.service';
import { MigrarService } from 'src/app/services/reserva/migrar.service';
import { TipoAmbienteService } from 'src/app/services/reserva/tipoAmbiente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/service/auth.service';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';
import { ExcelService } from 'src/app/core/service/excel.service';
import {
  AbstractControl,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-migracion-lista',
  templateUrl: './migracion-lista.component.html',
  styleUrls: ['./migracion-lista.component.sass']
})
export class MigracionListaComponent implements OnInit {
  procesando: boolean = false;
  isTblLoading: boolean;
  isTblLoadingReplica: boolean;
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
  ciclos: Ciclo[];
  annos: Annos[];
  meses: Meses[];
  displayedColumns: string[] = ['simulacionID', 'fecha_convert', 'codigoArea', 'nombreFilial','codigoSede', 'codigoEspecialidad','codigoTipoAmbiente','ciclo', 'semestre', 'annoProceso', 'mesProceso','estado'];
  dataSource: MatTableDataSource<SimulacionReserva> | null;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTableSort') sort: MatSort;

  displayedColumnsReplica: string[] = ['simulacionID', 'fecha_convert', 'codigoArea', 'nombreFilial','codigoSede', 'codigoEspecialidad','codigoTipoAmbiente','ciclo', 'semestre', 'annoProceso', 'mesProceso','estado'];
  dataSourceReplica: MatTableDataSource<SimulacionReserva> | null;
  @ViewChild('paginatorReplica', { static: true }) paginatorReplica: MatPaginator;
  @ViewChild('sortTableSortReplica') sortReplica: MatSort;
  idLogin:number;
  constructor(private snackBar: MatSnackBar, public areaService: AreaService, public filialService: FilialService,
    public especialidadService: EspecialidadService, public semestreService: SemestreService, public sedeService: SedeService,
    public migrarService: MigrarService, public dialog: MatDialog, private fb: FormBuilder, public tipoAmbienteService: TipoAmbienteService,
    private authService: AuthService,public asignacionManualService:AsignacionManualService,private excelService: ExcelService) {
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
      ciclo: [0]
    });
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ngOnInit(): void {
    this.listaAreas();
    this.listaFiliales();
    this.listaSemestres();
    this.loadData();
    this.loadDataReplica();
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
    let valortipoAmbiente=this.form.controls.tipoAmbiente.value;
    if(this.form.controls.tipoAmbiente.value==0){
      valortipoAmbiente=null;
    }
    let valorCiclo=this.form.controls.ciclo.value;
    if(this.form.controls.ciclo.value==0){
      valorCiclo=null;
    }
    let valorArea= this.form.controls.area.value;
    let valorSemestre= this.form.controls.semestre.value;
    let valorAnnoProceso= this.form.controls.annoProceso.value;
    let valorMesProceso= this.form.controls.mesProceso.value;
    if(valorArea.codigoArea=="04" || valorArea.codigoArea=="05"){
      valorSemestre=null;
    }else{
      valorAnnoProceso=null;
      valorMesProceso=null;
    }

    let request: any = {
      area: valorArea
      , filial: valorFilial
      , sede: valorSede
      , especialidad: valorEspecialidad
      , semestre: valorSemestre
      , annoProceso: valorAnnoProceso
      , mesProceso: valorMesProceso
      , tipoAmbiente: valortipoAmbiente
      , ciclo: valorCiclo
      , id_login: this.idLogin
    };
    return request;
  }
  listaCiclos() {
    this.form.controls.ciclo.setValue(0);
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
  
  loadData() {
    this.isTblLoading = true;
    this.data = null;
    this.dataSource = new MatTableDataSource<SimulacionReserva>(this.data);
    this.migrarService.getAll().subscribe(
      (data) => {
        console.log(data.data);
        this.data = data.data;
        this.dataSource = new MatTableDataSource<SimulacionReserva>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isTblLoading = false;
        //this.consultarProceso();
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
  loadDataReplica() {
    this.isTblLoadingReplica = true;
    this.data = null;
    this.dataSourceReplica = new MatTableDataSource<SimulacionReserva>(this.data);
    this.migrarService.replicaGetAll().subscribe(
      (data) => {
        this.data = data.data;
        this.dataSourceReplica = new MatTableDataSource<SimulacionReserva>(this.data);
        this.dataSourceReplica.paginator = this.paginatorReplica;
        this.dataSourceReplica.sort = this.sortReplica;
        this.isTblLoadingReplica = false;
        //this.consultarProceso();
      },
      (error: HttpErrorResponse) => {
        this.isTblLoadingReplica = false;
        this.data = null;
        this.dataSourceReplica = new MatTableDataSource<SimulacionReserva>(this.data);
        this.dataSourceReplica.paginator = this.paginatorReplica;
        this.dataSourceReplica.sort = this.sortReplica;
      }
    );
  }
  refresh() {
    this.loadData();
  }
  refreshReplica() {
    this.loadDataReplica();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterReplica(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReplica.filter = filterValue.trim().toLowerCase();
  }
  procesarMigrar() {
    this.procesando = true;
    this.RegistrosProcesados="Procesando...";
   
    let request=this.formData();
    request.tipo=2;
    this.migrarService.Inconsistencias(request).subscribe(
      (data) => {
        this.procesando = false;        

        if (data.status == 200) {
          console.log(data.data);
          if(data.data.length>0){
            request.inconsistencias=data.data;
            this.RegistrosProcesados="Inconsistencias.";
            Swal.fire({
              //position: 'top-end',
              icon: 'error',
              title: 'Se encontro Inconsistencias',
              showConfirmButton: false,
              timer: 2500
            });
              this.excelService.generateExcelInconsistencias(request);
          }else{
            this.procesarMigracion(request);
          }
          
        }
      }, (error: HttpErrorResponse) => {
        this.RegistrosProcesados="Error interno.";
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
  procesarSincronizar(){
    this.procesando = true;
    this.RegistrosProcesados="Procesando...";
    
    let request=this.formData();
    request.tipo=1;
    console.log(request);
    this.migrarService.migrar(request).subscribe(
      (data) => {
        this.procesando = false;        
        
        if (data.status == 200) {
          console.log(data.data);
          if(data.data.status==1){
            this.RegistrosProcesados="Proceso de sincronizar registrado. Este proceso puede tardar 30 min.";
              Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Proceso de sincronizar registrado',
                showConfirmButton: false,
                timer: 2500
              });
          }else{
              this.RegistrosProcesados="Error al registrar la informacion.";
              Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Ocurrio un error al registrar la informacion',
                showConfirmButton: false,
                timer: 2500
              });
            
          }
        }
        this.refreshReplica();
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
  procesarMigracion(request){
    this.procesando = true;
    this.RegistrosProcesados="Procesando...";
   
    console.log(request);
    this.migrarService.migrar(request).subscribe(
      (data) => {
        this.procesando = false;        
        
        if (data.status == 200) {
          console.log(data.data);
          if(data.data.status==1){
            this.RegistrosProcesados="Proceso de migración registrado. Este proceso puede tardar 30 min.";
              Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Proceso de migración registrado',
                showConfirmButton: false,
                timer: 2500
              });
          }else{
              this.RegistrosProcesados="Error al registrar la informacion.";
              Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Ocurrio un error al registrar la informacion',
                showConfirmButton: false,
                timer: 2500
              });
            
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
  
  validarExiste(ejecutarTipo){
    this.procesando = true;
    this.RegistrosProcesados="Procesando...";
   
    
    let request=this.formData();
    request.tipo=ejecutarTipo;
    console.log(request);
    this.migrarService.existe(request).subscribe(
      (data) => {
        this.procesando = false;        
        
        if (data.status == 200) {
          console.log(data.data);
          if(data.data.status==1){
            if(data.data.out_id==0){
              //procesar
              if(ejecutarTipo==1){
                //sincronizar
                this.procesarSincronizar();
              }else if(ejecutarTipo==2){
                //migrar
                this.procesarMigrar();
              }
            }else{
              //esperar mientras termina el proceso
              this.RegistrosProcesados="Proceso ejecutado, por favor esperar.";
              Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Proceso ejecutado, por favor esperar',
                showConfirmButton: false,
                timer: 2500
              });
            }
            
          }else{
              this.RegistrosProcesados="Error interno.";
              Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Ocurrio un error interno',
                showConfirmButton: false,
                timer: 2500
              });
            
          }
        }
        this.refresh();
      }, (error: HttpErrorResponse) => {
        this.procesando = false;
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un Error interno',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }
}
