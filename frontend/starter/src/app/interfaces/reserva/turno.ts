export class Turno {
    id:number;
    turno: string;
    
    constructor(obj)
    {
        this.id = obj.id;
        this.turno = obj.turno || '';

    }
}