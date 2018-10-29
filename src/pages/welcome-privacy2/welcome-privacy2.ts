import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeTermsPage } from '../welcome-terms/welcome-terms';
import { WelcomePrivacyPage } from '../welcome-privacy/welcome-privacy';

/**
 * Generated class for the WelcomePrivacy2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-privacy2',
  templateUrl: 'welcome-privacy2.html',
})
export class WelcomePrivacy2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePrivacy2Page');
  }

  public gotoWelcomePrivacyPage() {
    this.navCtrl.push(WelcomePrivacyPage, {});
  }

  public gotoWelcomeTermsPage() {
    this.navCtrl.push(WelcomeTermsPage, {});
  }

}
