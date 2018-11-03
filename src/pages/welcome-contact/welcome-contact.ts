import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnectPage } from '../welcome-connect/welcome-connect';
import { WelcomeContact2Page } from '../welcome-contact2/welcome-contact2';

@IonicPage()
@Component({
  selector: 'page-welcome-contact',
  templateUrl: 'welcome-contact.html',
})
export class WelcomeContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeContactPage');
  }

  public gotoWelcomeConnectPage() {
    this.navCtrl.push(WelcomeConnectPage, {});
  }

  public gotoWelcomeContact2Page() {
    this.navCtrl.push(WelcomeContact2Page, {});
  }

}
