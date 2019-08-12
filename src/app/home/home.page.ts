import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  // ir a noticia relacionada
  irnoticia() {
    this.navCtrl.navigateForward('noticias');
  }
  // ir a pagina de login
  irlogin() {
    this.navCtrl.navigateForward('login');
  }
}
