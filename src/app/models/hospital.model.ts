interface _HospitalUser {
    _id: string;
    nombre: string;
}


export  class Hospitales {

    constructor(
        public nombre: string,  
        public estado: string, 
        public _id?: string,
        public usuario?: _HospitalUser,
        public img?: string,
    ) {};
}