import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';

import { Hospitales } from 'src/app/models/hospital.model';
import { Medicos } from 'src/app/models/medicos.moderl';
import { Usuario } from 'src/app/models/user.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public hospitales: Hospitales[] = [];
  public medicos: Medicos[] = [];

  constructor( private actvRouter: ActivatedRoute,
               private busquedasService: BusquedasService ) { }

  ngOnInit(): void {

    this.actvRouter.params.subscribe( ({ termino }) => this.busquedasResults( termino ));
  }

  busquedasResults( termino: string ) {
    this.busquedasService.busquedaGlobal( termino ).subscribe( (results: any ) => {

      const { hospitales, medicos, usuarios } = results;
      
      this.hospitales = hospitales;
      this.usuarios = usuarios;
      this.medicos = medicos;

    })
  }

}
