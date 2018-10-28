import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileImpressumPage } from '../profile-impressum/profile-impressum';
import { ProfilePrivacyPage } from '../profile-privacy/profile-privacy';
import { ProfileTermsPage } from '../profile-terms/profile-terms';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  public gotoProfileImpressumPage() {
    this.navCtrl.push(ProfileImpressumPage, {});
  }

  public gotoProfilePrivacyPage() {
    this.navCtrl.push(ProfilePrivacyPage, {});
  }

  public gotoProfileTermsPage() {
    this.navCtrl.push(ProfileTermsPage, {});
  }

}
