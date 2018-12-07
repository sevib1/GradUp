import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, App } from 'ionic-angular';
import { ProfileImpressumPage } from '../profile-impressum/profile-impressum';
import { ProfilePrivacyPage } from '../profile-privacy/profile-privacy';
import { ProfileTermsPage } from '../profile-terms/profile-terms';
import { ProfileCustomizePage } from '../profile-customize/profile-customize';
import { ProfileCustomizecontactsPage } from '../profile-customizecontacts/profile-customizecontacts';
import { ProfileBiovotionPage } from '../profile-biovotion/profile-biovotion';
import { ProfileAccessrightsPage } from '../profile-accessrights/profile-accessrights';
import { WelcomeCapturePage } from '../welcome-capture/welcome-capture';
import { WelcomePage } from '../welcome/welcome';

import { MidataService } from '../../services/MidataService';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public app: App, private midataService: MidataService, public navCtrl: NavController, private menuCtrl: MenuController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  public gotoProfileCustomizePage() {
    this.navCtrl.push(WelcomeCapturePage, {});
  }

  public gotoProfileCustomizecontactsPage() {
    this.navCtrl.push(ProfileCustomizecontactsPage, {});
  }

  public gotoProfileBiovotionPage() {
    this.navCtrl.push(ProfileBiovotionPage, {});
  }

  public gotoProfileAccessrightsPage() {
    this.navCtrl.push(ProfileAccessrightsPage, {});
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

  // Logout
  logout() {
    this.midataService.logout()
      .then(() => {
        this.menuCtrl.close();
        this.app.getRootNav().setRoot(WelcomePage);

      })
      .catch(() => {
        this.app.getRootNav().setRoot(WelcomePage);
      })
  }

}
