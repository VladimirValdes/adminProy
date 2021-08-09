import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor( private usuarioService: UsuarioService ) { }

  async actulizarFoto (
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {

   

    try {

      const url = `${ baseUrl }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo );
  
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': this.usuarioService.token || ''
        },
        body: formData
      });
  

      
      const data = await resp.json();


      if ( resp.ok ) {
        return data.nombreArchivo;
      } else {
        console.log( data.msg );
        return false;
      }
        
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
