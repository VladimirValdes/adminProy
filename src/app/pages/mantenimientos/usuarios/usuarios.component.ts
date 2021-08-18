import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/user.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0 ;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public page: number = 1;
  public loading: boolean = false;
  public imgSubs!: Subscription;


  constructor( private usuarioService: UsuarioService,
               private  busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }
 

  ngOnInit(): void {
    this.getUsers( this.page );
    
     this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( 
      delay(100)
    ).subscribe( resp => {
      this.getUsers( this.page );
    });
    // this.search();
  }


  search( termino: string ): any  {

    if ( termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino).subscribe( results => {
      this.usuarios = results;
   });
   

    
  }

  getUsers( page: number ) {
    this.loading = true;
    this.usuarioService.cargarUsers(page).subscribe( ({ total, usuarios }) => {
     
      if ( usuarios.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay mas usuarios para mostrar',
          showConfirmButton: false,
          timer: 1500   
        });

        // this.page -= 1;
        this.nextUsers( false );
        return;
      }

      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.totalUsuarios = total;
      this.loading = false;


    });
  }

  nextUsers( follwingU: boolean = false ) {

    if ( follwingU ) {

      this.page = this.page + 1;
       
    } else {

      if (this.page > 1) {

        this.page = this.page - 1;
                
      }
      
    }

    this.getUsers(this.page);


  }

  borrarUsuario( usuario: Usuario, index: number ) {

   if ( usuario.uid === this.usuarioService.uid) {
     
      Swal.fire(
        'Aviso!',
        `No puede eliminar su mismo usuario`,
        'info'
      );

      return;
   }

  
    Swal.fire({
      title: 'Eliminar',
      text: `Deseas eliminar al usuario ${ usuario.nombre }` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eleminarUser( usuario.uid ).subscribe( resp => {
          // this.getUsers( this.page );
          this.usuarios.splice( index, 1 );

          if ( this.usuarios.length === 0 ) {
              this.nextUsers( false );
          }

          Swal.fire(
            'Eliminado!',
            `El usuario ${ usuario.nombre } ha sido eliminado.`,
            'success'
          )
        });
        
      }
    })


  }

  cambiarRole( usuario: Usuario ) {

    this.usuarioService.actulizarRol( usuario ).subscribe( resp => {
        console.log( resp );
        console.log( 'usuario actulizado ');
    });

  }

  abrirModal( usuario: Usuario ) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}
