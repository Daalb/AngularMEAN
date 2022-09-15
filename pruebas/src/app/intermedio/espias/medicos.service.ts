import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
 
@Injectable()
export class MedicosService {
 
  constructor( public http: HttpClient ) { }
 
  getMedicos() {
    return this.http.get('...').pipe(
      //@ts-ignore
      map( resp => resp['medicos'] )
    )
  }
 
  agregarMedico( medico: any ) {
    return this.http.post('...', medico ).pipe(
      map( {
        //@ts-ignore
        next: (resp:any) => resp['medico']
      })
    )
                
  }
 
  borrarMedico( id: string ) {
    return this.http.delete('...' ).pipe(
      //@ts-ignore
      map( resp => resp['medico'] )
    )
                
  }
 
 
}