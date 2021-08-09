import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { Usuario } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {

  public perfilForm!: FormGroup;
  usuario: Usuario;
  imagenSubir!: File;
  imgTem: any;

  constructor( private fb: FormBuilder,
               private usuarioServices: UsuarioService,
               private fileUploadService: FileUploadService ) { 
        this.usuario = usuarioServices.user;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
       nombre: [ this.usuario.nombre, Validators.required ],
       correo: [ this.usuario.correo, [ Validators.required, Validators.email ]]
    });
  }

  actulizarPerfil() {
    console.log( this.perfilForm.value);

    // TODO: Interfaz for update

    this.usuarioServices.actualizarUser( this.perfilForm.value).subscribe( ( resp: any ) => {

      const { nombre, correo } = resp.usuario;

      // global Updating  response user 
      this.usuario.nombre = nombre;
      this.usuario.correo = correo;

      Swal.fire({
        icon: 'success',
        title: 'Profile Update',
        showConfirmButton: false,
        timer: 1500   
      })
    
    });

  }

  cambiarImagen( file: any ): any {


    if ( file?.target?.files[0] ) {
      
      this.imagenSubir = file?.target?.files[0] ;

      if ( !file?.target?.files[0] ) { 
        console.log('enteeeeeeeeeee')  
         return this.imgTem = null; 
       }
    
      const reader = new FileReader();
      reader.readAsDataURL( this.imagenSubir );

      reader.onloadend = () => {
        this.imgTem = reader.result;
      }
    }
  }
  

  subirImagen() {
    console.log(`Usuario : ${ this.usuario.uid }`);
    this.fileUploadService.actulizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
                          .then( resp => {
                            this.usuario.img = resp;
                            Swal.fire({
                              icon: 'success',
                              title: 'Image Profile Update',
                              showConfirmButton: false,
                              timer: 1500   
                            });
                          }, ( err ) => {
                            console.log( err );
                          })
                          .catch( err => {
                            console.warn( err )
                          
                          })
  }

}
