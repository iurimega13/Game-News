import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  // Validador dosformulariosdapágina de login
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }
  get nome(): FormControl {
    return <FormControl>this.authForm.get("nome");
  }
  get email(): FormControl {
    return <FormControl>this.authForm.get("email");
  }
  get password(): FormControl {
    return <FormControl>this.authForm.get("password");
  }

  chageAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Criar Conta';
    this.configs.actionChange = isSignIn ? 'Criar Conta' : 'Conta Existente';
    !isSignIn
      ? this.authForm.addControl('nome', this.nameControl)
      : this.authForm.removeControl('nome');
  }
  onSubmit(): void {
    console.log(this.authForm.value);
  }
}
