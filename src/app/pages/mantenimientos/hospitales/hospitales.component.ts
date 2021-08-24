import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospitales } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospitales[] = [];
  public loading: boolean = false;
  public total: number = 0;
  public page: number = 1;
  public imgSubs!: Subscription;
  public hospitalesTemp: Hospitales[] = [];

  


  constructor( private hospitalesService: HospitalesService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.getHospitales(this.page);

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( 
      delay(100)
    ).subscribe( resp => {
      this.getHospitales( this.page );
    });
  }


  
  search( termino: string ): any  {

    if ( termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }

    this.busquedaService.buscar('hospitales', termino).subscribe( results => {
      this.hospitales = results;
   });
   

    
  }


    async agregarHospital( ) {

    const { value: nombre } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Hospital',
      inputPlaceholder: 'nombre del hospital',
      showCancelButton: true,
     
    })

    if ( nombre ) {
      
      this.hospitalesService.crearHospitales( nombre ).subscribe( ( hospital:any ) => {

        console.log(hospital);
        this.getHospitales(this.page);
        // this.hospitales.push(hospital);
        Swal.fire({
          icon: 'success',
          title: `Hospital ${ nombre } creado`,
          showConfirmButton: false,
          timer: 1500   
        });
      });
    }

  }

  getHospitales( page: number ) {
    this.loading = true;
    this.hospitalesService.cargarHospitales(page).subscribe( ({ total, hopitales })  => {

      if ( hopitales.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No hay mas hospitales para mostrar',
          showConfirmButton: false,
          timer: 1500   
        });

        // this.page -= 1;
        this.nextHospitales( false );
        return;
      }
      this.hospitales = hopitales;
      this.hospitalesTemp = hopitales;
      this.total = total;
      this.loading = false;

    });
  }

  updateHospitales( _id: string, nombre: string ) {
    this.hospitalesService.actualizarHospitales( _id, nombre ).subscribe( resp => {
      console.log( resp );
      Swal.fire({
        icon: 'success',
        title: `Hospital ${ nombre } actualizado`,
        showConfirmButton: false,
        timer: 1500   
      });
    });
  }

  borrarHospitales( hospital: Hospitales ) {

    Swal.fire({
      title: 'Eliminar',
      text: `Deseas eliminar al usuario ${ hospital.nombre }` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalesService.borrarHospital( hospital._id! ).subscribe( resp => {
         
            this.getHospitales(this.page);
          if ( this.hospitales.length === 0 ) {
              this.nextHospitales( false );
          }

          Swal.fire(
            'Eliminado!',
            `El usuario ${ hospital.nombre } ha sido eliminado.`,
            'success'
          )
        });
        
      }
    })
  }


  
  abrirModal( hospital: Hospitales ) {
    console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img );
  }


  nextHospitales( follwingH: boolean = false ) {

    if ( follwingH ) {

      this.page = this.page + 1;
       
    } else {

      if (this.page > 1) {

        this.page = this.page - 1;
                
      }
      
    }

    this.getHospitales(this.page);


  }

}
