import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    const theme = localStorage.getItem('theme') || `./assets/css/colors/default-dark.css`;
    this.linkTheme?.setAttribute('href', theme);
  }

  changeTheme( value: string ) {

    const url = `./assets/css/colors/${value}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

 }

 checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');
    links.forEach( ( elem: Element ) => {
        elem.classList.remove('working');

        const btnTheme = elem.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const themeLocal = localStorage.getItem('theme');

        if ( btnThemeUrl === themeLocal ) {
          elem.classList.add('working');
        }
    });
 }

}
