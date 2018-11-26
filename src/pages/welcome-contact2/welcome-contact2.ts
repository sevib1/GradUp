import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContact3Page } from '../welcome-contact3/welcome-contact3';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * Generated class for the WelcomeContact2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-contact2',
  templateUrl: 'welcome-contact2.html',
})
export class WelcomeContact2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeContact2Page');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }

  public gotoWelcomeContact3Page() {
    this.navCtrl.push(WelcomeContact3Page, {});
  }

}
