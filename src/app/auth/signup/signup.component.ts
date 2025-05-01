import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {SignupService} from '../../services/auth/signup.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm;
  signupError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private signupService: SignupService) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16),
        Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{6,16}$/)]],
      confirm_password: ['', [Validators.required]],
    }, {validators: this.passwordsMatchValidator});
  }

  get username() {
    return this.signupForm.controls.username;
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get confirm_password() {
    return this.signupForm.controls.confirm_password;
  }

   signup() {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe({
        next: () => {
          alert('Signup successful!');
          this.router.navigateByUrl('/sign-in');
          this.signupForm.reset();
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.signupError = 'Signup failed. Please try again.';
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      alert('Please correct the errors in the form.');
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

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    return password === confirmPassword ? null : {passwordsMismatch: true};
  }

}
