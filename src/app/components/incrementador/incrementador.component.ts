import { Component, EventEmitter, Input,  OnInit,  Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  @Input('valor') progreso: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') cambioValor: EventEmitter<number> = new EventEmitter();
  
  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`
  }

  // @Input('valor') progreso: number = 0;

 
  
  changePorcentaje( value: number ): void {
    
    this.progreso = this.progreso + value;

    
    if ( this.progreso >= 100 && value >= 0 ) { 
      
      this.progreso = 100;  
      this.cambioValor.emit(100)
    }

    if ( this.progreso <= 0 && value < 0 ) {  
      this.progreso = 0; 
      this.cambioValor.emit(0) 
    }


    this.cambioValor.emit(this.progreso) 
  }


  onChange( value: number ) {

    if ( value > 100 ) {
      this.progreso = 100;
    } else if ( value < 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = value;
    }
    
    this.cambioValor.emit( this.progreso )

  }

}
