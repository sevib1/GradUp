import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnectPage } from '../welcome-connect/welcome-connect';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';

/**
 * Generated class for the WelcomeContact3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-contact3',
  templateUrl: 'welcome-contact3.html',
})
export class WelcomeContact3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeContact3Page');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }

  public gotoWelcomeConnectPage() {
    this.navCtrl.push(WelcomeConnectPage, {});
  }

}
