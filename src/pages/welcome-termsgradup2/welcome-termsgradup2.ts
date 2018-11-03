import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeCapturePage } from '../welcome-capture/welcome-capture';

/**
 * Generated class for the WelcomeTermsgradup2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-termsgradup2',
  templateUrl: 'welcome-termsgradup2.html',
})
export class WelcomeTermsgradup2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeTermsgradup2Page');
  }

  public gotoWelcomeCapturePage() {
    this.navCtrl.push(WelcomeCapturePage, {});
  }

}
