import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  private admin:boolean = false;
  constructor( private usuarioService: UsuarioService,
              private router: Router ) {
    
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

      console.log('adminGuard');

      if ( this.usuarioService.rol === 'ADMIN_ROLE') {
          this.admin = true;
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    return this.admin;
  }
  
}
