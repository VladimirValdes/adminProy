import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;
  public correo = localStorage.getItem('email') || '';

  public loginForm = this.fb.group({
    correo: [ this.correo , [ Validators.required, Validators.minLength(3), Validators.email] ],
    password: ['12345678', [ Validators.required, Validators.minLength(4)]],
    remember: [ false ]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  
  login() {
    this.formSubmitted = true;
    // console.log( this.loginForm.value );

    if ( this.loginForm.invalid ) {
      return;
    }

    this.usuarioService.login( this.loginForm.value )
        .subscribe( resp => {
          
          if ( this.loginForm.get('remember')?.value ) {
            localStorage.setItem('email', this.loginForm.get('correo')?.value );

          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl("/");

        }, ( err ) =>{
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: `${ err.error.msg  }`,   
          })
        });

  }

  campoNoValido( campo: string ): boolean {
    if ( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
      
      return true;
   
    }
    return false;

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {
   
      await this.usuarioService.googleInit();
      this.auth2  = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
        ( googleUser: any ) => {

          const id_token = googleUser.getAuthResponse().id_token;

          console.log('Google User logged !!!!!!!')

          this.usuarioService.googleSingIn( id_token ).subscribe( resp => {

            this.ngZone.run( () => {
              
              this.router.navigateByUrl('/');
            })
          }, (err) => {
            console.warn( err )
            
          })

        }, ( error: any )  => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: `${ error}`,   
          })
        });
  }
}
