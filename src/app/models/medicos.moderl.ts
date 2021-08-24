import { _HospitalUser } from "./hospital.model";

export interface _HospitalMedico {
    _id: string;
    nombre: string;
}

export class Medicos {

    constructor(
        public nombre: string,  
        public estado: string, 
        public _id?: string,
        public hospital?:_HospitalMedico,
        public usuario?: _HospitalUser,
        public img?: string,
    ) {};
}