export class Dia {
    id: number;
    nombre: string;
    
    constructor(obj)
    {
        this.id = obj.id ;
        this.nombre = obj.nombre || '';

    }
}