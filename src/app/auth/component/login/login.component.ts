import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  ngOnInit(): void { }

  onSubmit(): void {
    const payload = this.form.value;
    this.authService.login(payload).subscribe({
      next: (token: string | null) => {
        if (token) {
          this.router.navigateByUrl('backoffice');
        } else {
          alert('username atau password salah');
        }
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  isFormValid(field: string): boolean {
    const control: AbstractControl = this.form.get(field) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }
}
