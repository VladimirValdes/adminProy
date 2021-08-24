import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cargaMedicos } from '../interfaces/cargar-medicos.interface';
import { Medicos } from '../models/medicos.moderl';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService ) { }


  cargarMedicos( page: number = 1 ): Observable<cargaMedicos> {
  return this.http.get<cargaMedicos>(`${base_url}/medicos?page=${ page  }`, this.usuarioService.headers )
  }

  cargarMedicoById( id: string ) {
    return this.http.get(`${ base_url }/medicos/${ id }`, this.usuarioService.headers );
  }

  crearMedicos( medico: { nombre: string, hospital: string } ){
    return this.http.post(`${base_url}/medicos`, medico , this.usuarioService.headers)
  }

  actualizarMedicos( medico: Medicos ){
    return this.http.put(`${base_url}/medicos/${ medico._id }`, medico, this.usuarioService.headers )
  }


  borrarMedicos( _id: string ) {
    return this.http.delete(`${base_url}/medicos/${ _id }`, this.usuarioService.headers);

  }
}
