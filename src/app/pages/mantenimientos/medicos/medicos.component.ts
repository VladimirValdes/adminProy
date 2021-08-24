import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medicos } from 'src/app/models/medicos.moderl';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medicos[] = [];
  public loading: boolean = false;
  public total: number = 0;
  public page: number = 1;
  public imgSubs!: Subscription;
  public medicosTemp: Medicos[] = [];

  constructor( private medicosService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService) { }

  ngOnInit(): void {

    this.getMedicos( this.page );

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( 
      delay(100)
    ).subscribe( resp => {
      this.getMedicos( this.page );
    });

  }

   
  search( termino: string ): any  {

    if ( termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }

    this.busquedaService.buscar('medicos', termino).subscribe( results => {
      this.medicos = results;
   });
   

    
  }

  getMedicos( page: number ) {
    this.loading = true;
    this.medicosService.cargarMedicos(page).subscribe( ({ total, medicos })  => {

      if ( medicos.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay mas hospitales para mostrar',
          showConfirmButton: false,
          timer: 1500   
        });

        // this.page -= 1;
        this.nextMedicos( false );
        return;
      }
      this.medicos = medicos;
      this.medicosTemp = medicos;
      this.total = total;
      this.loading = false;

    });
  }

  nextMedicos( follwingH: boolean = false ) {

    if ( follwingH ) {

      this.page = this.page + 1;
       
    } else {

      if (this.page > 1) {

        this.page = this.page - 1;
                
      }
      
    }

    this.getMedicos(this.page);


  }


  borrarMedicos( medico: Medicos ) {

    Swal.fire({
      title: 'Eliminar',
      text: `Deseas eliminar al medico ${ medico.nombre }` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicosService.borrarMedicos( medico._id! ).subscribe( resp => {
         
            this.getMedicos(this.page);

            // Prova eliminar todos los medicos de una pigina
            // Nota: Si elemino el ultimo medico que hay en la paginacion
            // pero en la siguiente todavi hay mas registros eliminar esa alerta
          if ( this.medicos.length === 0 ) {
              this.nextMedicos( false );
          }

          Swal.fire(
            'Eliminado!',
            `El usuario ${ medico.nombre } ha sido eliminado.`,
            'success'
          )
        });
        
      }
    })
  }

   
  abrirModal( medico: Medicos ) {
    // console.log(hospital);
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img );
  }



}
