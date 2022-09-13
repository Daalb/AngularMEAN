import { Component, OnDestroy } from '@angular/core';
import { interval, map, Observable, retry, take, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() { 
    // let i = -1;
    // //*Observer es quien emite los valores. Es el subscriber
    // const obs$ = new Observable<number>(observer => {
    //   const interval = setInterval(() => {
    //     i++;
    //     observer.next(i); //*Esto permitirá emitir un valor
    //     if(i === 4){
    //       clearInterval(interval);
    //       observer.complete(); //*Para anunciar que se finalizó el obsevable
    //     }

    //     if(i === 2){
    //       i = 0;
    //       observer.error('i llegó al valor de 2');
    //     }

    //     // console.log("Tick")
    //   },1000)
    // }); 

    //*Una vez subscrito el observable comienza a trabajar
    // this.retornaObservable().pipe(
    //   retry()//* Se puede limitar la cantidad de intentos
    //   // retry(1) Lo intenta una vez más. Si no pude en el intento lanza error
    // ).subscribe(
    //   {
    //     next:  valor => console.log('Subs:',valor),//*Siguiente valor,
    //     error: err => console.warn('Hubo error',err),
    //     complete: () => console.info('Obs terminado') 
    //   }
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(500)
      .pipe(
        map(valor => valor +1), //*Para definir cuantas veces se ejecutará el observable
        filter(valor => (valor % 2 === 0 ? true : false)),
        // take(10),
      )

  }


  retornaObservable(): Observable<number>{
    let i = -1;
    //*Observer es quien emite los valores. Es el subscriber
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i); //*Esto permitirá emitir un valor
        if(i === 4){
          clearInterval(interval);
          observer.complete(); //*Para anunciar que se finalizó el obsevable
        }

        if(i === 2){
          i = 0;
          observer.error('i llegó al valor de 2');
        }

        // console.log("Tick")
      },1000)
    }); 

    // return obs$;
  }

}
