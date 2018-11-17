import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeAppexplanationPage } from '../welcome-appexplanation/welcome-appexplanation';
import { WelcomeCapturePage } from '../welcome-capture/welcome-capture';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  public gotoWelcomeAppexplanationPage() {
    this.navCtrl.push(WelcomeAppexplanationPage, {});
  }


  public gotoProfilePage() {
    this.navCtrl.push(WelcomeCapturePage, {});
  }

  public gotoTabsPage() {
    this.navCtrl.push(TabsPage, {});
  }

}
