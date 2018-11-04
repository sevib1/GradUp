import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile-accessrights',
  templateUrl: 'profile-accessrights.html',
})
export class ProfileAccessrightsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileAccessrightsPage');
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
