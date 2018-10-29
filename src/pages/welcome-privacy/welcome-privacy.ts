import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePrivacy2Page } from '../welcome-privacy2/welcome-privacy2';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the WelcomePrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-privacy',
  templateUrl: 'welcome-privacy.html',
})
export class WelcomePrivacyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePrivacyPage');
  }

  public gotoWelcomePrivacy2Page() {
    this.navCtrl.push(WelcomePrivacy2Page, {});
  }

  public gotoWelcomePage() {
    this.navCtrl.push(WelcomePage, {});
  }

}
