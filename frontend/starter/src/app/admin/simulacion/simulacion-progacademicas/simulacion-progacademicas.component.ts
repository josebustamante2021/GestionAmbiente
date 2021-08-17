import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProgramacionAcademica } from 'src/app/interfaces/reserva/programacionAcademica';
import { SimulacionReservaService } from 'src/app/services/reserva/simulacion.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProgramacionHoraria } from 'src/app/interfaces/reserva/programacionHoraria';
import { AsignacionManualService } from 'src/app/services/reserva/asignacionmanual.service';

@Component({
  selector: 'app-simulacion-progacademicas',
  templateUrl: './simulacion-progacademicas.component.html',
  styleUrls: ['./simulacion-progacademicas.component.sass','./style.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SimulacionProgacademicasComponent implements OnInit {
  id: number;
  progAcademicaLista: ProgramacionAcademica[];
  isTblLoadingSimulacion: boolean;
  isTblLoadingHorario: boolean;
  expandedElement: ProgramacionAcademica | null;
  horarios:ProgramacionHoraria[];
  displayedColumnsSimulacion: string[] = ['codigoAca','nombreArea','semestre','annoProceso','mesProceso','nombreSede','nombrePrograma','nombreEspecialidad','ciclo','curso','turno','capacidad','capacidadDocente','matriculados','fechaInicio','fechaFin','sinAmbiente'];
  dataSourceSimulacion: MatTableDataSource<ProgramacionAcademica> | null;
  @ViewChild('paginatorSimulacion', { static: true }) paginatorSimulacion: MatPaginator;
  @ViewChild('sortSimulacionTableSort') sortSimulacion: MatSort;

  constructor(private fb: FormBuilder,private router: Router,private route: ActivatedRoute,public simulacionReservaService:SimulacionReservaService,
    public asignacionManualService:AsignacionManualService) { 
  }
  ngOnInit(): void {    
    const Id = this.route.snapshot.paramMap.get('id');
    //const Id = this.route.parent.snapshot.paramMap.get('id');
    this.id=Number(Id);
    console.log(this.id);
    this.loadDataSimulacion();
  }
  applyFilterSimulacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSimulacion.filter = filterValue.trim().toLowerCase();
  }
  refreshSimulacion() {
    this.loadDataSimulacion();
  }
  public loadDataSimulacion() {
    this.progAcademicaLista = null;
    this.dataSourceSimulacion = new MatTableDataSource<ProgramacionAcademica>(null);
    this.isTblLoadingSimulacion = true;
    this.simulacionReservaService.getAll_ProgramacionAcademica(this.id)
      .subscribe(
        result => {console.log(result.data);
          this.progAcademicaLista = result.data;
          this.dataSourceSimulacion = new MatTableDataSource<ProgramacionAcademica>(result.data);
          this.dataSourceSimulacion.paginator = this.paginatorSimulacion;
          this.dataSourceSimulacion.sort = this.sortSimulacion;
          this.isTblLoadingSimulacion = false;
        }
        , (error: HttpErrorResponse) => {
          this.isTblLoadingSimulacion = false;
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
  
  progHoraria(codigoAca:number){    
    this.isTblLoadingHorario = true;
    this.horarios=null;
    this.asignacionManualService.getProgHorario(codigoAca).subscribe(
      (response) => {         
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

  expanded(expandedElement,codigoAca){
    if(expandedElement!=null){
      this.progHoraria(codigoAca);
    }
  }
}
