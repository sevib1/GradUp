import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile-biovotion',
  templateUrl: 'profile-biovotion.html',
})
export class ProfileBiovotionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileBiovotionPage');
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
