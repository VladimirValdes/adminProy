import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/user.model';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient,
               private usuarioServices: UsuarioService) { }


  buscar( tipo: 'usuarios' | 'medicos' | 'hospitales',
          termino: string ) {
    return this.http.get(`${ base_url }/search/${ tipo }/${ termino }`, this.usuarioServices.headers )
                    .pipe(
                      map( ( resp: any ) => {
                        switch ( tipo ) {
                          case 'usuarios':
                            return this.transformarUsuarios( resp.results );
                        
                          default:
                            return [];
                        }
                      })
                    )
  }


  private transformarUsuarios( results: any[]): Usuario[] {

    return results.map( user => new Usuario( user.nombre, user.correo, user.estado,
                                              '', user.uid, '', user.google, user.img,
                                              user.rol));
  }
}
