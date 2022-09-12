import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');//*Se busca que haya la menor cantidad posible de saltos al DOM 

  constructor() { 
    const url = localStorage.getItem('theme') ||'./assets/css/colors/blue-dark.css';
    this.linkTheme?.setAttribute('href',url);
  }


  public changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`;    
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void{
    const links =  document.querySelectorAll('.selector');

    links.forEach(link => {
      link.classList.remove('working');
      const btnTheme = link.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnThemeUrl === currentTheme){
        link.classList.add('working');
      }

    })
  }

}
