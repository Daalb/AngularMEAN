import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControlOptions } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false; //*Para saber si el formulario fue enviado

  // public registerForm: FormGroup = this.fb.group({
  //   nombre: ['', Validators.required ],
  //   email: ['', [ Validators.required, Validators.email ] ],
  //   password: ['', Validators.required ],
  //   password2: ['', Validators.required ],
  //   terminos: [ false, Validators.required ],
  // }, {
  //   validators: this.passwordsIguales('password', 'password2')
  // });

  public registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required ),
    email: new FormControl('', {validators: [ Validators.required, Validators.email ]} ),
    password: new FormControl('', Validators.required ),
    password2: new  FormControl('', Validators.required),
    terminos: new FormControl( false, Validators.required ),
  },
  {
    validators: this.passwordsIguales("password", "password2"),
  } as AbstractControlOptions)

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => Swal.fire('Error', err.error.msg, 'error')
      })
  }

  campoNoValido( campo: string ): boolean {
    if ( this.registerForm.get(campo)!.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;
    
    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  
  passwordsIguales(pass1Name: string, pass2Name: string ) {
    
    return ( formGroup: FormGroup ) => {
 
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
 
      if ( pass1Control!.value === pass2Control!.value ) {
        pass2Control!.setErrors({})
      } else {
        pass2Control!.setErrors({ noEsIgual: true })
      }
    }
  }

}