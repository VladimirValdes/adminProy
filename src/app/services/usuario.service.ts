import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map, tap, catchError, delay } from 'rxjs/operators';

import { loginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/user.model';
import { cargaUsuarios } from '../interfaces/cargar-usuarios.interface';
import { stringify } from '@angular/compiler/src/util';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userToken = '';
  auth2: any;
  // public user: Usuario = new Usuario(" "," ", " ", " ");
  public user: Usuario;
  public menu: any[] = [];


  constructor( private http: HttpClient, 
               private router: Router,
               private ngZone: NgZone ) { 
    this.user = new Usuario('', '', '', '', '');
    this.readToken();
    this.googleInit();
  }



  get token() {
    return this.readToken();
  }

  get uid() {
    return this.user.uid || '';
  }

  get rol(): 'ADMIN_ROLE' | 'USER_ROLE' {
      return this.user.rol!;
  }

  get headers() {
    
    return {
       headers: {
      'x-token': this.token
      }
    };
  }

  googleInit() {

    return new Promise<void>( resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '508845271765-ko80lhodgja5tb7jvpum09mlrut9s0a7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
  
        resolve();
        
      });
    });

  
  }


  validarToken(): Observable<boolean> {

  //  let token = this.readToken();

   return this.http.get(`${ base_url }/auth/renew`, { 
     headers: {
       'x-token': this.token
     }}).pipe(
        map( ( resp: any ) => {

            const { nombre,
                    correo,
                    estado,
                    google,
                    img = '',
                    rol,
                    uid } = resp.user;


            this.user = new Usuario( nombre, correo, estado, "", uid, " ", google, img, rol);
            console.log( this.user );
            this.saveToken( resp.token, resp.menu );
            return true;
        }),
        catchError( error => of(false))
     );



  }


  createUser( formData: RegisterForm ): Observable< Usuario > {
    return this.http.post< Usuario >(`${ base_url}/usuarios`, formData)
                    .pipe(
                      map( ( resp: Usuario ) => {
                        this.saveToken( resp.token, resp.menu );
                        return resp;
                      })
                    );
  }

  actualizarUser( data: { email: string, nombre: string, rol: string | undefined }) {

    data = {
      ...data,
      rol: this.user.rol
    }

    return this.http.put(`${ base_url}/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }


  actulizarRol( data: Usuario ) {
    return this.http.put(`${ base_url}/usuarios/${ data.uid }`, data, this.headers);
  }

  cargarUsers( page: number = 1 ): Observable<cargaUsuarios> {
    return this.http.get< cargaUsuarios >(`${ base_url }/usuarios?page=${ page }`, this.headers )
                    .pipe(
                      map( resp => {
                        const usuarios = resp.usuarios.map( 
                          user => new Usuario( user.nombre, user.correo, user.estado,
                                                        '', user.uid, '', user.google, user.img,
                                                        user.rol));
                        return {
                          total: resp.total,
                          usuarios,
                          desde: resp.desde
                        }
                      }),
                    )
  }

  eleminarUser( uid: string ) {
    return this.http.delete(`${ base_url }/usuarios/${ uid }`, this.headers);
  }

  login( formData: loginForm ): Observable< Usuario > {
    return this.http.post< Usuario >(`${ base_url}/auth/login`, formData)
                    .pipe(
                      map( ( resp: Usuario ) => {
                        this.saveToken( resp.token, resp.menu );
                        return resp;
                      })
                    );
  }

  logout():void {
    localStorage.removeItem('x-token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  googleSingIn( id_token: string ): Observable< Usuario > {
    return this.http.post< Usuario >(`${ base_url}/auth/google`, { id_token })
                    .pipe(
                      map( ( resp: Usuario ) => {
                        this.saveToken( resp.token, resp.menu );
                        return resp;
                      })
                    );
  }

  private readToken(): string {
    if ( localStorage.getItem('x-token') ) {
      this.userToken = localStorage.getItem('x-token') || '';
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  private saveToken( token: string, menu: any ) {
    this.userToken = token;

    localStorage.setItem('x-token', this.userToken );
    localStorage.setItem('menu', JSON.stringify(menu) );

  }
}
