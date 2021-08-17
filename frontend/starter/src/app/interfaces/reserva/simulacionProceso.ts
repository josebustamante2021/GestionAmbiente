export class SimulacionProceso {
    id: number;
    ProcesoAsignacion: number;
    numTotal: number;
    numProcesado: number;
    fecha: Date;
    fechaFinalizado: Date;
    constructor(obj)
    {
        this.id = obj.id ;
        this.ProcesoAsignacion = obj.ProcesoAsignacion;
        this.numTotal = obj.numTotal;
        this.numProcesado = obj.numProcesado;
        this.fecha = obj.fecha;
        this.fechaFinalizado = obj.fechaFinalizado;

    }
}