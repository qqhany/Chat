import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../../pages/signin/signin';
import { User } from '../../models/user';
import { PracteraAuthService } from '../../services/auth';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  currentUser: User;
  profilePicture: any;

  constructor(private navCtrl: NavController,
              private authServeice: PracteraAuthService) {
                this.currentUser = this.authServeice.getActiveUser();
                this.profilePicture = this.currentUser.imgurl;
              }

  onLogout(){
    localStorage.clear();
    this.navCtrl.setRoot(SigninPage);
  }

  updateFile(){
    
  }
 


}
