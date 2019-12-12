import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { PracteraAuthService } from '../../services/auth';
import { TabsPage } from '../../pages/tabs/tabs';
import { User } from '../../models/user';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  user: User;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private authService: PracteraAuthService,
              private alertCtrl: AlertController,
              private menuCtrl: MenuController,
              private loadingCtrl: LoadingController) {}

  onLogin(f: NgForm){
    const loader = this.loadingCtrl.create({
     content: 'Logging you in...'
   });

   loader.present();

    this.authService.userAuth(f.value.email, f.value.password)
    .map(res => res.json())
    .subscribe(data => {
      this.authService.processLogIn(data)
    },
    err => {
      loader.dismiss();
      this.authService.logError(err)
    },
    () => {
      console.log('Authentication succeeded ..');
      loader.dismiss();
      this.user = new User('Anonymous', f.value.email, "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg");
      this.authService.setActiveUser(this.user);
      this.navCtrl.setRoot(TabsPage);
    });
    
  }


   ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }



  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

}
