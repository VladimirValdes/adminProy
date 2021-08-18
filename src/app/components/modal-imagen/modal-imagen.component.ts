import { Component, EventEmitter, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  imagenSubir!: File;
  imgTem: any;


  constructor( public modalImagenService: ModalImagenService,
               private fileUploadService: FileUploadService) { }

  ngOnInit(): void {}

  ocultarModal() {
    this.imgTem = null;
    this.modalImagenService.cerrarModal();
  }

  
  cambiarImagen( file: any ): any {


    if ( file?.target?.files[0] ) {
      
      this.imagenSubir = file?.target?.files[0] ;

      if ( !file?.target?.files[0] ) { 
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actulizarFoto(this.imagenSubir, tipo , id )
                      .then( img => {
                        
                        Swal.fire({
                          icon: 'success',
                          title: 'Image Profile Update',
                          showConfirmButton: false,
                          timer: 1500   
                        });

                        this.modalImagenService.nuevaImagen.emit(img);

                        this.ocultarModal();
                      }, ( err ) => {
                        console.log( err );
                      })
                      .catch( err => {
                        console.warn( err )
                      
                      })
}
  

}
