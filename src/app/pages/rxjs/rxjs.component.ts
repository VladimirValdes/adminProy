import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public internalSubs: Subscription;

  constructor() {
    
  //  this.retornaObservablo().pipe(
  //     retry(1)

  //  ).subscribe(
  //   valor => console.log('Subs: ', valor ),
  //   error => console.warn('Error', error ),
  //   () => console.info('Obs terminado ')
  //  )
    this.internalSubs = this.retornaIntervalo().subscribe(console.log);
    
   }
 

   retornaIntervalo(): Observable<Number> {
                      return  interval(1000)
                               .pipe(
                                 take(10),
                                 map( valor => valor + 1),
                                 filter( valor => ( valor % 2 === 0 ) ? true : false ),
                               );

   }

   retornaObservablo(): Observable<Number> {
      let i = -1;

       return new Observable<Number>( observer => {


      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if ( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if ( i === 2) {
          console.log('Llego al 2 ... error');
          observer.error("Llego al 2 error!!!");
        }

      }, 1000 )
    });


   }

   ngOnDestroy(): void {
     this.internalSubs.unsubscribe();
  }


}


