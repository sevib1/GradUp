import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile-customize',
  templateUrl: 'profile-customize.html',
})
export class ProfileCustomizePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileCustomizePage');
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
