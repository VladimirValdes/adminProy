import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario: Usuario;
  
  constructor( private usuarioService: UsuarioService,
               private router: Router) {
    this.usuario = usuarioService.user;
  }

  searchAll( term: string ) {

    if ( term.length === 0 ) {
      this.router.navigateByUrl('/dashboard');
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ term }`);
    
  }

 
  logout() {
    this.usuarioService.logout();
  }

}
