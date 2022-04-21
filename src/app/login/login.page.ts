import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
 
  constructor(
    private fb:                 FormBuilder,
    private loginService:       LoginService,
    private alertController:    AlertController,
    private router:             Router,
    private loadingController:  LoadingController
  ) {}
 
  ngOnInit() {
    this.credentials = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.loginService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        localStorage.setItem('industrial.token', res.token);        
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Falha no Login',
          message: res.error,
          buttons: ['OK'],
        });
 
        await alert.present();
      }
    );
  }
 
  get email() {
    return this.credentials.get('userName');
  }
  
  get password() {
    return this.credentials.get('password');
  }
}