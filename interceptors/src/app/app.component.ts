import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private usuariosService: UsuariosService
  ){
    this.usuariosService.obtenerUsuarios()
    .subscribe({
      //@ts-ignore
      next: resp => console.log( resp ),
      error: (err) => console.log('Error en el appComponent',err)
    })

  }
}
