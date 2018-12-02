import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile-customizecontacts',
  templateUrl: 'profile-customizecontacts.html',
})
export class ProfileCustomizecontactsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,) {
    storage.get(this.key).then((val) => {
      console.log('Your username is', val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileCustomizecontactsPage');
  }

  

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
