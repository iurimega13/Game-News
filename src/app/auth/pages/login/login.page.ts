import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  // Validador dosformulariosdapágina de login
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  onSubmit(): void {
    console.log(this.authForm.value);
    
  }

}
