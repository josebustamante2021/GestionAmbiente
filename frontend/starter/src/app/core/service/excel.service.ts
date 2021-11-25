import { Especialidad } from './../../interfaces/reserva/especialidad';
import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '../../../../node_modules/@angular/common';
import {formatDate} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private datePipe: DatePipe) {

  }

  generateExcel(request:any) {
    
    //Excel Title, Header, Data
    const title = 'Car Sell Report';
    const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
    const data = [
      [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
      [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
      [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
      [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
      [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
      [2007, 1, "Peugeot ", "Peugeot 307", 481, 3.8],
      [2008, 1, "Toyota ", "Toyota Prius", 217, 2.2],
      [2008, 1, "Skoda ", "Skoda Octavia", 216, 2.2],
      [2008, 1, "Peugeot ", "Peugeot 308", 135, 1.4],
      [2008, 2, "Ford ", "Ford Mondeo", 624, 5.9],
      [2008, 2, "Volkswagen ", "Volkswagen Passat", 551, 5.2],
      [2008, 2, "Volkswagen ", "Volkswagen Golf", 488, 4.6],
      [2008, 2, "Volvo ", "Volvo V70", 392, 3.7],
      [2008, 2, "Toyota ", "Toyota Auris", 342, 3.2],
      [2008, 2, "Volkswagen ", "Volkswagen Tiguan", 340, 3.2],
      [2008, 2, "Toyota ", "Toyota Avensis", 315, 3],
      [2008, 2, "Nissan ", "Nissan Qashqai", 272, 2.6],
      [2008, 2, "Nissan ", "Nissan X-Trail", 271, 2.6],
      [2008, 2, "Mitsubishi ", "Mitsubishi Outlander", 257, 2.4],
      [2008, 2, "Toyota ", "Toyota Rav4", 250, 2.4],
      [2008, 2, "Ford ", "Ford Focus", 235, 2.2],
      [2008, 2, "Skoda ", "Skoda Octavia", 225, 2.1],
      [2008, 2, "Toyota ", "Toyota Yaris", 222, 2.1],
      [2008, 2, "Honda ", "Honda CR-V", 219, 2.1],
      [2008, 2, "Audi ", "Audi A4", 200, 1.9],
      [2008, 2, "BMW ", "BMW 3-serie", 184, 1.7],
      [2008, 2, "Toyota ", "Toyota Prius", 165, 1.6],
      [2008, 2, "Peugeot ", "Peugeot 207", 144, 1.4]
    ];

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Car Data');


    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])


    //Add Image
    /*let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });*/

    //worksheet.addImage(logo, 'E1:F3');
    worksheet.mergeCells('A1:D2');


    //Blank Row 
    worksheet.addRow([]);

    //Add Header Row
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      let qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999'
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
    }

    );

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);


    //Footer Row
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CarData.xlsx');
    })

  }

  generateExcelOcupabilidadAmbienteB(request:any) {
    
    //Excel Title, Header, Data
    const title = 'Car Sell Report';
    const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
    const data = [
      [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
      [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
      [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
      [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
      [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
      [2007, 1, "Peugeot ", "Peugeot 307", 481, 3.8],
      [2008, 1, "Toyota ", "Toyota Prius", 217, 2.2],
      [2008, 1, "Skoda ", "Skoda Octavia", 216, 2.2],
      [2008, 1, "Peugeot ", "Peugeot 308", 135, 1.4],
      [2008, 2, "Ford ", "Ford Mondeo", 624, 5.9],
      [2008, 2, "Volkswagen ", "Volkswagen Passat", 551, 5.2],
      [2008, 2, "Volkswagen ", "Volkswagen Golf", 488, 4.6],
      [2008, 2, "Volvo ", "Volvo V70", 392, 3.7],
      [2008, 2, "Toyota ", "Toyota Auris", 342, 3.2],
      [2008, 2, "Volkswagen ", "Volkswagen Tiguan", 340, 3.2],
      [2008, 2, "Toyota ", "Toyota Avensis", 315, 3],
      [2008, 2, "Nissan ", "Nissan Qashqai", 272, 2.6],
      [2008, 2, "Nissan ", "Nissan X-Trail", 271, 2.6],
      [2008, 2, "Mitsubishi ", "Mitsubishi Outlander", 257, 2.4],
      [2008, 2, "Toyota ", "Toyota Rav4", 250, 2.4],
      [2008, 2, "Ford ", "Ford Focus", 235, 2.2],
      [2008, 2, "Skoda ", "Skoda Octavia", 225, 2.1],
      [2008, 2, "Toyota ", "Toyota Yaris", 222, 2.1],
      [2008, 2, "Honda ", "Honda CR-V", 219, 2.1],
      [2008, 2, "Audi ", "Audi A4", 200, 1.9],
      [2008, 2, "BMW ", "BMW 3-serie", 184, 1.7],
      [2008, 2, "Toyota ", "Toyota Prius", 165, 1.6],
      [2008, 2, "Peugeot ", "Peugeot 207", 144, 1.4]
    ];

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Car Data');


    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])


    //Add Image
    /*let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });*/

    //worksheet.addImage(logo, 'E1:F3');
    worksheet.mergeCells('A1:D2');


    //Blank Row 
    worksheet.addRow([]);

    //Add Header Row
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      let qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999'
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
    }

    );

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);


    //Footer Row
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CarData.xlsx');
    })

  }
  

  generateExcelDistribucionTurno(request:any) {
    console.log(request);
    const header = ["Area", "Semestre", "Año", "Mes", "Filial", "Sede","Codigo Local SUNEDU", "Programa", "Escuela", "Ciclo", "Asignatura", "Turno", "F.Inicio", "F. Fin", "Ambiente", "Grupo", "Mañana", "Tarde", "Noche"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Distribucion Turno');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.area.descripcion;
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    row = worksheet.getRow(5);
    row.getCell(1).value ="PROGRAMA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.especialidad?.descripcion;
    row = worksheet.getRow(6);
    row.getCell(1).value ="SEMESTRE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.semestre;

    let numRow=10;
    for(let i = 0; i < request.listaDistribucionTurno.length; i++){
      let rowData=request.listaDistribucionTurno[i]
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreArea;
      row.getCell(2).value = rowData.semestre;
      row.getCell(3).value = rowData.annoProceso;
      row.getCell(4).value = rowData.mesProceso;
      row.getCell(5).value = rowData.nombreFilial;
      row.getCell(6).value = rowData.nombreSede;
      row.getCell(7).value = rowData.codigoLocalSUNEDU;
      row.getCell(8).value = rowData.nombrePrograma;
      row.getCell(9).value = rowData.nombreEspecialidad;
      row.getCell(10).value = rowData.ciclo;
      row.getCell(11).value = rowData.curso;
      row.getCell(12).value = rowData.turno;
      row.getCell(13).value = rowData.fechaInicio_convert;
      row.getCell(14).value = rowData.fechaFin_convert;
      row.getCell(15).value = rowData.nombreTipoAmbiente;
      row.getCell(16).value = rowData.grupo;
      row.getCell(17).value = rowData.manana;
      row.getCell(18).value = rowData.tarde;
      row.getCell(19).value = rowData.noche;
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(11).width = 20;
    worksheet.getColumn(15).width = 20;
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'S9',
    }

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteDistribucionTurno'+new Date().getTime()+'.xlsx');
    })

  }

  
  

  generateExcelDistribucionTurnoFlag(request:any) {
    console.log(request);
       
    //let url = "/assets/upsjb/plantillas/ReporteDistribucionTurnosFlagPlantilla.xlsx";
    const header = ["Area", "Filial", "Sede", "Codigo Local SUNEDU", "Programa", "Escuela","Mañana", "Tarde", "Noche"]
    
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Distribucion Turno');
    
    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    //row.getCell(2).value = this.datePipe.transform(new Date(), 'medium');
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.area.descripcion;
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    row = worksheet.getRow(5);
    row.getCell(1).value ="PROGRAMA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.especialidad?.descripcion;
    row = worksheet.getRow(6);
    row.getCell(1).value ="SEMESTRE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.semestre;

    let numRow=10;
    for(let i = 0; i < request.listaDistribucionTurno.length; i++){
      let rowData=request.listaDistribucionTurno[i]
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreArea;
      row.getCell(2).value = rowData.nombreFilial;
      row.getCell(3).value = rowData.nombreSede;
      row.getCell(4).value = rowData.codigoLocalSUNEDU;
      row.getCell(5).value = rowData.nombrePrograma;
      row.getCell(6).value = rowData.nombreEspecialidad;
     // row.getCell(7).value = rowData.curso;
      row.getCell(7).value = rowData.manana;
      row.getCell(8).value = rowData.tarde;
      row.getCell(9).value = rowData.noche;
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(6).width = 20;
    //worksheet.getColumn(7).width = 30;
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'I9',
    }
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteDistribucionTurnoFlag'+new Date().getTime()+'.xlsx');
    })

  }

  generateExcelValidacionTurno(request:any) {
    console.log(request);
    const header = ["Area", "Semestre", "Año", "Mes", "Filial", "Sede", "Codigo Local SUNEDU", "Programa", "Escuela", "Ciclo", "Asignatura", "Turno", "F.Inicio", "F. Fin", "Ambiente", "Grupo","N° de Rotacion", "Lunes", "Martes", "Miercoles","Jueves","Viernes","Sabado","Domingo","Cumple Turno"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Validacion Turno');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.area.descripcion;
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    row = worksheet.getRow(5);
    row.getCell(1).value ="PROGRAMA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.especialidad?.descripcion;
    row = worksheet.getRow(6);
    row.getCell(1).value ="SEMESTRE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.semestre;

    let numRow=10;
    for(let i = 0; i < request.listaValidacionTurno.length; i++){
      let rowData=request.listaValidacionTurno[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreArea;
      row.getCell(2).value = rowData.semestre;
      row.getCell(3).value = rowData.annoProceso;
      row.getCell(4).value = rowData.mesProceso;
      row.getCell(5).value = rowData.nombreFilial;
      row.getCell(6).value = rowData.nombreSede;
      row.getCell(7).value = rowData.codigoLocalSUNEDU;
      row.getCell(8).value = rowData.nombrePrograma;
      row.getCell(9).value = rowData.nombreEspecialidad;
      row.getCell(10).value = rowData.ciclo;
      row.getCell(11).value = rowData.curso;
      row.getCell(12).value = rowData.turno;
      row.getCell(13).value = rowData.fechaInicio_convert;
      row.getCell(14).value = rowData.fechaFin_convert;
      row.getCell(15).value = rowData.nombreTipoAmbiente;
      row.getCell(16).value = rowData.grupo;
      row.getCell(17).value = rowData.flagAmbienteComun;
      row.getCell(18).value = rowData.lunes;
      row.getCell(18).alignment = { wrapText: true };

      row.getCell(19).value = rowData.martes;
      row.getCell(19).alignment = { wrapText: true };
      row.getCell(20).value = rowData.miercoles;
      row.getCell(20).alignment = { wrapText: true };
      row.getCell(21).value = rowData.jueves;
      row.getCell(21).alignment = { wrapText: true };
      row.getCell(22).value = rowData.viernes;
      row.getCell(22).alignment = { wrapText: true };
      row.getCell(23).value = rowData.sabado;
      row.getCell(23).alignment = { wrapText: true };
      row.getCell(24).value = rowData.domingo;
      row.getCell(24).alignment = { wrapText: true };
      if(rowData.cumple==1){
        row.getCell(25).value = "CUMPLE";
      }else if(rowData.cumple==2){
        row.getCell(25).value = "NO CUMPLE";
      }
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(11).width = 20;
    worksheet.getColumn(17).width = 20;
    worksheet.getColumn(18).width = 20;
    worksheet.getColumn(19).width = 20;
    worksheet.getColumn(20).width = 20;
    worksheet.getColumn(21).width = 20;
    worksheet.getColumn(22).width = 20;
    worksheet.getColumn(23).width = 20;
    worksheet.getColumn(24).width = 20;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'Y9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteValidacionTurno'+new Date().getTime()+'.xlsx');
    })

  }

  generateExcelAsignacionHorario(request:any) {
    console.log(request);
    let header =[];
    if(request.tipo==1){
      header = ["Filial", "Sede","Codigo Local SUNEDU", "Programa", "Espacialidad", "Turno", "Asignatura", "Ciclo", "Tipo Ambiente", "Tipo Hora", "Tipo Enseñanza", "Capacidad","Matriculados", "No Asignado"]
    }else if(request.tipo==2){
      header = ["Filial", "Sede","Codigo Local SUNEDU", "Programa", "Espacialidad", "Turno", "Asignatura", "Ciclo", "Tipo Ambiente", "Tipo Hora", "Tipo Enseñanza", "Capacidad","Matriculados", "Asignado"]
    }else{
      header = ["Filial", "Sede","Codigo Local SUNEDU", "Programa", "Espacialidad", "Turno", "Asignatura", "Ciclo", "Tipo Ambiente", "Tipo Hora", "Tipo Enseñanza", "Capacidad","Matriculados", "Asignado", "No Asignado"]
    }
    
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Asignacion Horario');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row.getCell(5).value ="TIPO DE AMBIENTE";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.tipoAmbiente?.descripcion;
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.area.descripcion;
    row.getCell(5).value ="AFORO";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value ="INFERIOR";
    row.getCell(6).font = { bold: true };
    row.getCell(7).value = request.aforoInferior;
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    
    row.getCell(6).value ="SUPERIOR";
    row.getCell(6).font = { bold: true };
    row.getCell(7).value = request.aforoSuperior;
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    row.getCell(5).value ="FECHA INICIO";
    row.getCell(5).font = { bold: true };
    row.getCell(7).value ="FECHA FIN";
    row.getCell(7).font = { bold: true };
    row.getCell(6).value = request.fechaInicio_convert;
    row.getCell(8).value = request.fechaFin_convert;
    row = worksheet.getRow(5);
    row.getCell(1).value ="PROGRAMA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.especialidad?.descripcion;
    row.getCell(5).value ="HORA INICIO";
    row.getCell(5).font = { bold: true };
    row.getCell(7).value ="HORA FIN";
    row.getCell(7).font = { bold: true };
    row.getCell(6).value = request.horaInicio;
    row.getCell(8).value = request.horaFin;
    row = worksheet.getRow(6);
    row.getCell(1).value ="TURNO";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.turno?.turno;
    row.getCell(5).value ="SEMESTRE";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.semestre;

    let numRow=10;
    for(let i = 0; i < request.listaAsignacionHorario.length; i++){
      let rowData=request.listaAsignacionHorario[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreFilial;
      row.getCell(2).value = rowData.nombreSede;
      row.getCell(3).value = rowData.codigoLocalSUNEDU;
      row.getCell(4).value = rowData.nombrePrograma;
      row.getCell(5).value = rowData.nombreEspecialidad;
      row.getCell(6).value = rowData.turno;
      row.getCell(7).value = rowData.curso;
      row.getCell(8).value = rowData.ciclo;
      row.getCell(9).value = rowData.nombreTipoAmbiente;
      row.getCell(10).value = rowData.nombreTipoHora;
      row.getCell(11).value = rowData.nombreTipoEnsenanza;
      row.getCell(12).value = rowData.capacidad;
      row.getCell(13).value = rowData.matriculados;
      if(request.tipo==1){
        row.getCell(14).value = rowData.noAsignado;
      }else if(request.tipo==2){
        row.getCell(14).value = rowData.asignado;
      }else{
        row.getCell(14).value = rowData.asignado;
        row.getCell(15).value = rowData.noAsignado;
      }
      
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 15;
    worksheet.getColumn(14).width = 80;
    worksheet.getColumn(15).width = 80;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'O9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteAsignacionHorario'+new Date().getTime()+'.xlsx');
    })

  }
  

  generateExcelDisponibilidadHorarios(request:any) {
    console.log(request);
    const header = ["Filial", "Sede", "Codigo Local SUNEDU", "Tipo Ambiente", "Ambiente", "Aforo", "Dia", "Turno","Horario Disponible","Horario Ocupado"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Disponibilidad Horarios');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row.getCell(4).value ="FECHA INICIO";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.fechaInicio_convert;
    row.getCell(6).value ="HORA INICIO";
    row.getCell(6).font = { bold: true };
    row.getCell(7).value = request.horaInicio;
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.area.descripcion;
    row.getCell(4).value ="FECHA FIN";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.fechaFin_convert;
    row.getCell(6).value ="HORA FIN";
    row.getCell(6).font = { bold: true };
    row.getCell(7).value = request.horaFin;
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row.getCell(4).value ="DIA";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.dia?.nombre;
    
    
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    
    row.getCell(4).value ="TURNO";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.turno?.turno;

    
    row = worksheet.getRow(5);
    row.getCell(1).value ="TIPO DE AMBIENTE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.tipoAmbiente?.descripcion;
    row.getCell(4).value ="SEMESTRE";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.semestre;
    row = worksheet.getRow(6);
    row.getCell(1).value ="AFORO";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value ="INFERIOR";
    row.getCell(2).font = { bold: true };
    row.getCell(3).value = request.aforoInferior;
    row = worksheet.getRow(7);
    row.getCell(2).value ="SUPERIOR";
    row.getCell(2).font = { bold: true };
    row.getCell(3).value = request.aforoSuperior;

    let numRow=10;
    for(let i = 0; i < request.listaDisponibilidadHorarios.length; i++){
      let rowData=request.listaDisponibilidadHorarios[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreFilial;
      row.getCell(2).value = rowData.nombreSede;
      row.getCell(3).value = rowData.codigoLocalSUNEDU;
      row.getCell(4).value = rowData.nombreTipoAmbiente;
      row.getCell(5).value = rowData.codigo;
      row.getCell(6).value = rowData.aforo;
      row.getCell(7).value = rowData.diaID;
      row.getCell(8).value = rowData.turno;
      row.getCell(9).value = rowData.disponible;
      row.getCell(10).value = rowData.ocupado;
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(9).width = 100;
    worksheet.getColumn(10).width = 100;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'J9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteDisponibilidadHorarios'+new Date().getTime()+'.xlsx');
    })

  }

  generateExcelOcupabilidadAmbiente(request:any) {
    console.log(request);
    const header = ["Area","Filial", "Sede", "Codigo Local SUNEDU", "Programa","Especialidad","Asignatura","Turno","F. Inicio","F. Fin","Grupo","N° de Rotacion","Tipo Ambiente","Sede", "Ambiente", "Aforo", "Lunes", "Martes", "Miercoles","Jueves","Viernes","Sabado","Domingo"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Ocupabilidad Ambiente');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row.getCell(4).value ="FECHA INICIO";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.fechaInicio_convert;
    row.getCell(6).value ="HORA INICIO";
    row.getCell(6).font = { bold: true };
    row.getCell(7).value = request.horaInicio;
    row = worksheet.getRow(2);
    row.getCell(4).value ="FECHA FIN";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.fechaFin_convert;
    row.getCell(6).value ="HORA FIN";
    row.getCell(6).font = { bold: true };
    row.getCell(7).value = request.horaFin;
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row.getCell(4).value ="DIA";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.dia?.nombre;
    
    
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    
    row.getCell(4).value ="TURNO";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value = request.turno?.turno;

    
    row = worksheet.getRow(5);
    row.getCell(1).value ="TIPO DE AMBIENTE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.tipoAmbiente?.descripcion;
    
    row = worksheet.getRow(6);
    row.getCell(1).value ="AMBIENTE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.ambiente?.codigo;

    let numRow=10;
    for(let i = 0; i < request.listaOcupabilidadAmbiente.length; i++){
      let rowData=request.listaOcupabilidadAmbiente[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreArea;
      row.getCell(2).value = rowData.nombreFilial;
      row.getCell(3).value = rowData.nombreSedeAca;
      row.getCell(4).value = rowData.codigoLocalSUNEDU;
      row.getCell(5).value = rowData.nombrePrograma;
      row.getCell(6).value = rowData.nombreEspecialidad;
      row.getCell(7).value = rowData.curso;
      row.getCell(8).value = rowData.turno;//
      row.getCell(9).value = rowData.fechaInicio;
      row.getCell(10).value = rowData.fechaFinal;
      row.getCell(11).value = rowData.grupo;
      row.getCell(12).value = rowData.flagAmbienteComun;
      row.getCell(13).value = rowData.nombreTipoAmbiente;
      row.getCell(14).value = rowData.nombreSede;
      row.getCell(15).value = rowData.codigo;
      row.getCell(16).value = rowData.aforo;
     // row.getCell(17).value = rowData.diaID;
   //row.getCell(14).value = rowData.turno;
      //row.getCell(15).value = rowData.ocupado;

      row.getCell(17).value = rowData.lunes;
      row.getCell(17).alignment = { wrapText: true };

      row.getCell(18).value = rowData.martes;
      row.getCell(18).alignment = { wrapText: true };
      row.getCell(19).value = rowData.miercoles;
      row.getCell(19).alignment = { wrapText: true };
      row.getCell(20).value = rowData.jueves;
      row.getCell(20).alignment = { wrapText: true };
      row.getCell(21).value = rowData.viernes;
      row.getCell(21).alignment = { wrapText: true };
      row.getCell(22).value = rowData.sabado;
      row.getCell(22).alignment = { wrapText: true };
      row.getCell(23).value = rowData.domingo;
      row.getCell(23).alignment = { wrapText: true };

      //row.getCell(22).value = rowData.ocupado;
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(13).width = 20;
    worksheet.getColumn(14).width = 20;
    worksheet.getColumn(17).width = 20;
    worksheet.getColumn(18).width = 20;
    worksheet.getColumn(19).width = 20;
    worksheet.getColumn(20).width = 20;
    worksheet.getColumn(21).width = 20;
    worksheet.getColumn(22).width = 20;
    worksheet.getColumn(23).width = 20;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'O9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteOcupabilidadAmbiente'+new Date().getTime()+'.xlsx');
    })

  }

  generateExcelCapacidadOciosa(request:any) {
    console.log(request);
    const header = ["Filial", "Sede", "Codigo Local SUNEDU", "Tipo Ambiente", "Ambiente", "Aforo","Fecha", "Dia", "Turno","Hora Inicio","Hora Fin","Hora Ociosa","Hora Ocupado"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Capacidad Ociosa');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row.getCell(4).value ="TEMPORIZADOR";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value ="TURNO";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.turno?.turno;
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value =request.area?.descripcion;
    row.getCell(5).value ="HORA INICIO";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.horaInicio;
    
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row.getCell(5).value ="HORA FIN";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.horaFin;
    
    
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    
    row = worksheet.getRow(5);
    row.getCell(1).value ="TIPO DE AMBIENTE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.tipoAmbiente?.descripcion;
    
    row = worksheet.getRow(6);
    row.getCell(1).value ="FECHA INICIO";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.fechaInicio_convert;
    row.getCell(3).value ="FECHA FIN";
    row.getCell(3).font = { bold: true };
    row.getCell(4).value = request.fechaFin_convert;

    let numRow=10;
    for(let i = 0; i < request.listaCapacidadOciosa.length; i++){
      let rowData=request.listaCapacidadOciosa[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreFilial;
      row.getCell(2).value = rowData.nombreSede;
      row.getCell(3).value = rowData.codigoLocalSUNEDU;
      row.getCell(4).value = rowData.nombreTipoAmbiente;
      row.getCell(5).value = rowData.codigo;
      row.getCell(6).value = rowData.aforo;
      row.getCell(7).value = rowData.fecha;
      row.getCell(8).value = rowData.dia;
      row.getCell(9).value = rowData.turno;
      row.getCell(10).value = rowData.horaInicio;
      row.getCell(11).value = rowData.horaFin;
      if(rowData.horasOcioso==1){
        row.getCell(12).value = "SI";
      }else{
        row.getCell(12).value = "NO";
      }
      if(rowData.horasOcupado==1){
        row.getCell(13).value = "SI";
      }else{
        row.getCell(13).value = "NO";
      }
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(12).width = 15;
    worksheet.getColumn(13).width = 15;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'M9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteCapacidadOciosa'+new Date().getTime()+'.xlsx');
    })

  }

  generateExcelCapacidadOciosaFlag(request:any) {
    console.log(request);
    const header = ["Filial", "Sede", "Codigo Local SUNEDU", "Tipo Ambiente", "Ambiente", "Aforo", "Turno","# Horas Ociosa","# Horas Ocupado","% Ocioso","% Ocupado"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Capacidad Ociosa');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row.getCell(4).value ="TEMPORIZADOR";
    row.getCell(4).font = { bold: true };
    row.getCell(5).value ="TURNO";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.turno?.turno;
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value =request.area?.descripcion;
    row.getCell(5).value ="HORA INICIO";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.horaInicio;
    
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;
    row.getCell(5).value ="HORA FIN";
    row.getCell(5).font = { bold: true };
    row.getCell(6).value = request.horaFin;
    
    
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;
    
    row = worksheet.getRow(5);
    row.getCell(1).value ="TIPO DE AMBIENTE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.tipoAmbiente?.descripcion;
    
    row = worksheet.getRow(6);
    row.getCell(1).value ="FECHA INICIO";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.fechaInicio_convert;
    row.getCell(3).value ="FECHA FIN";
    row.getCell(3).font = { bold: true };
    row.getCell(4).value = request.fechaFin_convert;

    let numRow=10;
    for(let i = 0; i < request.listaCapacidadOciosa.length; i++){
      let rowData=request.listaCapacidadOciosa[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreFilial;
      row.getCell(2).value = rowData.nombreSede;
      row.getCell(3).value = rowData.codigoLocalSUNEDU;
      row.getCell(4).value = rowData.nombreTipoAmbiente;
      row.getCell(5).value = rowData.codigo;
      row.getCell(6).value = rowData.aforo;
      row.getCell(7).value = rowData.turno;
      row.getCell(8).value = rowData.horasOcioso;
      row.getCell(9).value = rowData.horasOcupado;
      row.getCell(10).value = rowData.ociosoPorcentaje+" %";
      row.getCell(11).value = rowData.ocupadoPorcentaje+" %";
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(4).width = 15;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'K9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteCapacidadOciosa_Flag'+new Date().getTime()+'.xlsx');
    })

  }

  
  generateExcelInconsistencias(request:any) {
    console.log(request);
    const header = ["Filial", "Sede", "Codigo Local SUNEDU", "Programa","Especialidad", "Curso", "Ciclo", "Turno","Fecha Inicio","Fecha Fin","Tipo Enseñanza","Tipo Hora","Dia","Hora Inicio","Hora Fin","Grupo","N° de rotacion","Sede Ubicacion","Tipo Ambiente","DESCRIPCION"]
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Inconsistencias');
    

    // Add Data and Conditional Formatting
    let row = worksheet.getRow(1);
    row.getCell(1).value ="Generacion de reporte";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = this.datePipe.transform(new Date(), 'dd/MM/yyyy hh:mm:ss');
    row = worksheet.getRow(2);
    row.getCell(1).value ="AREA";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value =request.area?.descripcion;
    
    row = worksheet.getRow(3);
    row.getCell(1).value ="FILIAL";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.filial?.descripcion;    
    
    row = worksheet.getRow(4);
    row.getCell(1).value ="SEDE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.sede?.descripcion;

    row = worksheet.getRow(5);
    row.getCell(1).value ="ESPECIALIDAD";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.especialidad?.descripcion;
    
    row = worksheet.getRow(6);
    row.getCell(1).value ="TIPO DE AMBIENTE";
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = request.tipoAmbiente?.descripcion;
    row.getCell(3).value ="CICLO";
    row.getCell(3).font = { bold: true };
    row.getCell(4).value = request.tipoAmbiente?.descripcion;

    if(request.area.codigoArea=='04' || request.area.codigoArea=='05'){
      row = worksheet.getRow(7);
      row.getCell(1).value ="Año Proceso";
      row.getCell(1).font = { bold: true };
      row.getCell(2).value = request.annoProceso;
      row.getCell(3).value ="Mes Proceso";
      row.getCell(3).font = { bold: true };
      row.getCell(4).value = request.mesProceso;
    }else{
      row = worksheet.getRow(7);
      row.getCell(1).value ="SEMESTRE";
      row.getCell(1).font = { bold: true };
      row.getCell(2).value = request.semestre;
    }
    
    
    
    let numRow=10;
    for(let i = 0; i < request.inconsistencias.length; i++){
      let rowData=request.inconsistencias[i];
      let row = worksheet.getRow(numRow);
      row.getCell(1).value = rowData.nombreFilial;
      row.getCell(2).value = rowData.nombreSede;
      row.getCell(3).value = rowData.codigoLocalSUNEDU;
      row.getCell(4).value = rowData.nombrePrograma;
      row.getCell(5).value = rowData.nombreEspecialidad;
      row.getCell(6).value = rowData.curso;
      row.getCell(7).value = rowData.ciclo;
      row.getCell(8).value = rowData.turno;
      row.getCell(9).value = rowData.fechaInicio;
      row.getCell(10).value = rowData.fechaFin;
      row.getCell(11).value = rowData.nombreTipoEnsenanza;
      row.getCell(12).value = rowData.nombreTipoHora;
      row.getCell(13).value = rowData.nombreDia;
      row.getCell(14).value = rowData.horaInicio;
      row.getCell(15).value = rowData.horaFin;
      row.getCell(16).value = rowData.grupo;
      row.getCell(17).value = rowData.flagAmbienteComun;
      row.getCell(18).value = rowData.nombreSedeUbicacion;
      row.getCell(19).value = rowData.nombreTipoAmbiente;
      row.getCell(20).value = rowData.descripcion;
      row.getCell(20).alignment = { wrapText: true };
      //let qty = row.getCell(1);
      numRow++;
    }


    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 25;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 15;
    worksheet.getColumn(11).width = 15;
    worksheet.getColumn(12).width = 15;
    worksheet.getColumn(13).width = 15;
    worksheet.getColumn(18).width = 15;
    worksheet.getColumn(19).width = 15;
    worksheet.getColumn(20).width = 20;
    
    let headerRow = worksheet.getRow(9);
    headerRow.values = header;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5393ca' },
        bgColor: { argb: 'FF0000FF' }
        
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    })
    headerRow.font = { bold: true,color: {argb: "FFFFFFFF"} }
    worksheet.autoFilter = {
      from: 'A9',
      to: 'T9',
    }
    

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ReporteInconsistencias'+new Date().getTime()+'.xlsx');
    })

  }
}
