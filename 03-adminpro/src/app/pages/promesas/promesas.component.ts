import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    //*Manera 1 y 2
    // this.getUsuarios()

    //*Manera 3
    this.getUsuarios().then((usuarios) => console.log(usuarios))

    //*De esta manera se ejecutará primero lo que está dentro de la promesa, pues es síncrono y luego se ejhecuta lo que le sigue, que sería el console.log('Fin init')
    /*
    const promesa = new Promise( () => {
      console.log('Hola mundo')
    });
    console.log('Fin del init');
    */



    //*Como en este caso estoy resolviendo la promesa (lo que es lo asíncrono realmente) primero se ejecutará el código sincrono que le sigue, que sería el console.log('Fin del init'); y una vez termine la resolución se ejecuta el otro console.log()

    const promesa = new Promise( (resolve,reject) => {
      if(false){
        resolve('Hola mundo')
      }else{
        reject('Algo salio mal')
      }
    });

    //mensaje es lo que retorna la promesa
    promesa.then((mensaje) => {
      console.log(mensaje);
    })
    .catch((error) => {
      console.log('Hubo un error, el error es: ',error)
    })
    console.log('Fin del init');
    
  }


  getUsuarios(){
    /* Manera 1
    fetch('https://reqres.in/api/users')
      .then(resp => {
        resp.json().then( body => console.log(body.data));
      })
    */

    /* Manera 2 
    fetch('https://reqres.in/api/users')
    .then(resp => resp.json())
    .then(body => console.log(body.data))
    */

    /*Manera 3 */
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data))
    })
  }


}
