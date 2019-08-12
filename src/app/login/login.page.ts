import { OverlayService } from './../core/services/overlay.service';
import { AuthProvider } from './../core/services/auth.types';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSingIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private OverlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void {
    this.configs.isSingIn = !this.configs.isSingIn;
    const { isSingIn } = this.configs;
    this.configs.action = isSingIn ? 'Login' : 'Criar conta';
    this.configs.actionChange = isSingIn ? 'Criar conta' : 'Conta Existente';
    !isSingIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.OverlayService.loading();
    try {
      const credentials = await this.authService.autheticate({
        isSignIn: this.configs.isSingIn,
        user: this.authForm.value,
        provider
      });
      this.navCtrl.navigateBack('');
    } catch (e) {
      console.log('Auth error', e);
      await this.OverlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
