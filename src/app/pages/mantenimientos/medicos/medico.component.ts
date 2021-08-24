import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospitales } from 'src/app/models/hospital.model';
import { Medicos } from 'src/app/models/medicos.moderl';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospitales[] = [];
  public medicoSeleccionado!: Medicos;
  public hospitalSeleccionado!: Hospitales | any;
  // public id: string = '';

  constructor( private fb: FormBuilder,
               private hospitalesService: HospitalesService,
               private medicoService: MedicoService,
               private router: Router,
               private activeRouter: ActivatedRoute ) {
                    
                }

  ngOnInit(): void {


    this.activeRouter.params.subscribe( ({ id }) => {

        this.cargarMedico( id );
   });


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required ]
    })

    this.cargarHospitales();



    this.medicoForm.get('hospital')?.valueChanges
                   .subscribe( hospitalid => {

                    if ( hospitalid ) {

                      this.hospitalSeleccionado = this.hospitales.find( hp => hp._id === hospitalid );
                      
                    }


                   })
  }




  cargarMedico( id: string ) {

    if (  id === 'nuevo') {
      return;
    }

    this.medicoService.cargarMedicoById( id )
    .pipe(
      delay(100)
    )
    .subscribe( ( resp: any ) => {

      // if ( !resp.medico ) {
      //   return this.router.navigateByUrl(`/dashboard/medicos`);
      // } 
        this.medicoSeleccionado = resp.medico;

        const { nombre, hospital: { _id }} = resp.medico;
  
        console.log(resp.medico)
     
        this.medicoForm.setValue({ nombre, hospital: _id })
        
      
    }, ( err ) => {
      if ( err ) {
        this.router.navigateByUrl(`/dashboard/medicos`);
      }
    })
  }

  cargarHospitales() {
    this.hospitalesService.cargarHospitales(1).subscribe( ({ hopitales })  => {
      this.hospitales = hopitales;
    })
  }

  guardarMedico(){



    if ( this.medicoSeleccionado ) {

      const data = {
        ... this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedicos( data ).subscribe( ( medicoUpdated: any ) => {

        Swal.fire({
          icon: 'success',
          title: `Medico ${ medicoUpdated.medico.nombre } actualizado`,
          showConfirmButton: false,
          timer: 1500   
        });

        console.log( medicoUpdated );

      }, ( err ) => {

        Swal.fire({
          icon: 'error',
          title: `${ err }`,
          showConfirmButton: false,
          timer: 1500   
        });

      });


    } else {
      this.medicoService.crearMedicos( this.medicoForm.value ).subscribe( ( resp: any ) => {
        Swal.fire({
          icon: 'success',
          title: `Medico ${ resp.medico.nombre } creado`,
          showConfirmButton: false,
          timer: 1500   
        });
  
        this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`);
      }, ( err => {
  
        console.log( err );
        Swal.fire({
          icon: 'error',
          title: `No se pudo crear el medico`,
          showConfirmButton: false,
          timer: 1500   
        });
      }))
    }
   
  }

}
