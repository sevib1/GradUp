import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile-terms',
  templateUrl: 'profile-terms.html',
})
export class ProfileTermsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileTermsPage');
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
