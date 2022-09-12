import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent {
  public progreso: number = 50;


  //*El get es como tener una propiedad
  public get getPorcentaje(){
    return `${this.progreso}%`
  }

  cambiarValor(valor: number){
    if(this.progreso >=100 && valor >= 0){
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0){
      return this.progreso = 0;
    }

    return this.progreso = this.progreso + valor;
  }

}
