
export class Usuario {

  
    constructor( 
        public nombre: string,  
        public correo: string, 
        public estado: string, 
        public token: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public rol?: string, 
        public uid?: string,
    ) {}
    
}