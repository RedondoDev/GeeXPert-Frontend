import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {SigninService} from '../../../services/auth/signin/signin.service';
import {SigninRequest} from '../../../models/signinRequest';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  signinForm;
  signinError: string = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private signinService: SigninService) {
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
      this.signinService.signin(this.signinForm.value as SigninRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error('Error occurred during sign-in:', errorData);
          this.signinError = errorData;
        },
        complete: () => {
          console.info('Request completed');
          this.router.navigateByUrl('/home');
          this.signinForm.reset();
        }
      });
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
