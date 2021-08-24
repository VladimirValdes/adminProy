import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


import { cargaHospitales } from '../interfaces/cargar-hospitales.interface';
import { UsuarioService } from './usuario.service';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService ) { }


  cargarHospitales( page: number = 1 ): Observable<cargaHospitales> {
    return this.http.get<cargaHospitales>(`${base_url}/hospitales?page=${ page  }`, this.usuarioService.headers )
  }

  crearHospitales( nombre: string ){
    return this.http.post(`${base_url}/hospitales`, { nombre }, this.usuarioService.headers)
  }

  actualizarHospitales( _id: string, nombre: string ){
    return this.http.put(`${base_url}/hospitales/${ _id }`, { nombre }, this.usuarioService.headers )
  }


  borrarHospital( _id: string ) {
    return this.http.delete(`${base_url}/hospitales/${ _id }`, this.usuarioService.headers);

  }
}
