import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeCapturePage } from '../welcome-capture/welcome-capture';
import { WelcomeTermsPage } from '../welcome-terms/welcome-terms';

/**
 * Generated class for the WelcomeTerms2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-terms2',
  templateUrl: 'welcome-terms2.html',
})
export class WelcomeTerms2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeTerms2Page');
  }

  public gotoWelcomePrivacyPage() {
    this.navCtrl.push(WelcomeTermsPage, {});
  }

  public gotoWelcomeCapturePage() {
    this.navCtrl.push(WelcomeCapturePage, {});
  }

}
