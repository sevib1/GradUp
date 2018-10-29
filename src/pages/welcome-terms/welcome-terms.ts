import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeTerms2Page } from '../welcome-terms2/welcome-terms2';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the WelcomeTermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-terms',
  templateUrl: 'welcome-terms.html',
})
export class WelcomeTermsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeTermsPage');
  }

  public gotoWelcomeTerms2Page() {
    this.navCtrl.push(WelcomeTerms2Page, {});
  }

  public gotoWelcomePage() {
    this.navCtrl.push(WelcomePage, {});
  }

}
