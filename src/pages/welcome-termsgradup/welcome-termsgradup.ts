import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnect3Page } from '../welcome-connect3/welcome-connect3';

@IonicPage()
@Component({
  selector: 'page-welcome-termsgradup',
  templateUrl: 'welcome-termsgradup.html',
})
export class WelcomeTermsgradupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeTermsgradupPage');
  }

  public gotoWelcomeConnect3Page() {
    this.navCtrl.push(WelcomeConnect3Page, {});
  }

}
