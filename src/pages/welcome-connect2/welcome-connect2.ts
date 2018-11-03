import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnect3Page } from '../welcome-connect3/welcome-connect3';
import { WelcomeTermsgradup2Page } from '../welcome-termsgradup2/welcome-termsgradup2';

@IonicPage()
@Component({
  selector: 'page-welcome-connect2',
  templateUrl: 'welcome-connect2.html',
})
export class WelcomeConnect2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeConnect2Page');
  }

  public gotoWelcomeConnect3Page() {
    this.navCtrl.push(WelcomeConnect3Page, {});
  }

  public gotoWelcomeTermsgradup2Page() {
    this.navCtrl.push(WelcomeTermsgradup2Page, {});
  }

}
