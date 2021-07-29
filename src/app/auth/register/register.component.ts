import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3)] ],
    correo: [ '', [ Validators.required, Validators.email ] ],
    password: ['', [ Validators.required, Validators.minLength(4)]],
    password2: ['', [ Validators.required, Validators.minLength(4)]],
    terms: [ false,  Validators.requiredTrue ],

  }, {
    validators: this.passwordIguales('password', 'password2')
  });


  constructor( private fb: FormBuilder, 
               private usuarioService: UsuarioService,
               private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );


    if ( this.registerForm.invalid ) {
      return 

    } 

    this.usuarioService.createUser( this.registerForm.value )
    .subscribe( resp => {
      this.router.navigateByUrl('/');
    }, ( err ) => {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: `${err.error.errors[0].msg }`,   
      })
    });
  }

 
  ngOnInit(): void {
  }


  campoNoValido( campo: string ): boolean {
    if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      
      return true;
   
    }
    return false;

  }

  aceptaTerminos() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;


    if ( ( pass1 !== pass2 ) && this.formSubmitted) {
      return true;
    }
    
    return false;
  }

  passwordIguales( pass1: string, pass2: string) {
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }

    }
  }

}
