import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators'
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {


    movelogg = false;

  constructor( private usuarioService: UsuarioService,
               private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean   {


      if ( !this.usuarioService.token) {
        this.movelogg = true;
      } else {
        this.router.navigateByUrl('/')
      }
        return this.movelogg;
      
    }
  
}
