import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo!: 'usuarios' | 'hospitales' | 'medicos';
  public id: string = '';
  public img: string = '';

  private _ocultarModal: boolean = true;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();


  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    id: string,
    img: string = 'no-img'
  ) {
    this.tipo = tipo;
    this.id = id;

    if ( img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ base_url}/uploads/${ tipo }/${ img }`
    }

    // {{ _.url }}/uploads/usuarios/6281977d-922f-48e9-ae43-717c8e3dcb36.png
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
