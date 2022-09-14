import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log('Pasa por interceptor');
    

    const headers = new HttpHeaders({
      'toke-usuario': 'ASDASD33AS5D1A3S5D1AS365D'
    })

    const reqClone = req.clone({//*Se tiene que clonar la request porque la request original no permite mutaciones, por lo tanto se trabaja con una copia, un clon
      headers
    });

    //*Dejar pasar todo
    return next.handle(reqClone).pipe(
      catchError(this.manejarError) 
    );

  }

  manejarError(error: HttpErrorResponse){
    console.log('Sucedio un error');
    console.log('Se registró en el log file');
    console.warn(error);
    return throwError(() => new Error('Error personalizado'));
  }


}
