import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  signinForm;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
  }

  get username() {
    return this.signinForm.controls.username;
  }

  get password() {
    return this.signinForm.controls.password;
  }

  signin() {
    if (this.signinForm.valid) {
      console.log("Llamar al servicio de signin")
      this.router.navigateByUrl('/home');
      this.signinForm.reset();
    } else {
      this.signinForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }

  showHidePassword(id: string) {
    const passwordInput = document.getElementById(id) as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

}
