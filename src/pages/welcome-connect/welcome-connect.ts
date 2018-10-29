import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnect2Page } from '../welcome-connect2/welcome-connect2';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the WelcomeConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-connect',
  templateUrl: 'welcome-connect.html',
})
export class WelcomeConnectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeConnectPage');
  }

  public gotoWelcomeConnect2Page() {
    this.navCtrl.push(WelcomeConnect2Page, {});
  }

  public gotoTabsPage() {
    this.navCtrl.push(TabsPage, {});
  }

}
