import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerUsuarios(){
    let params = new HttpParams().append('page','1')
    params.append('nombre','Diego');

    // const headers = new HttpHeaders({
    //   'toke-usuario': 'ASDASD33AS5D1A3S5D1AS365D'
    // })

    return this.http.get(`https://reqres123.in/api/user`, {
      params
    }).pipe(
      //@ts-ignore
      map( resp=> resp['data'] ),
    );

   }
  }
