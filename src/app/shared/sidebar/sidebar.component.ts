import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // menu: any[];
  public usuario: Usuario;




  constructor( public sideBarService: SidebarService,
               private userService: UsuarioService) {
    // this.menu = this.sideBarService.menu;
    this.usuario = userService.user;
   }

  ngOnInit(): void {

  }

}
