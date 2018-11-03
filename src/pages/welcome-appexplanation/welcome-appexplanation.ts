import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnect2Page } from '../welcome-connect2/welcome-connect2';

@IonicPage()
@Component({
  selector: 'page-welcome-appexplanation',
  templateUrl: 'welcome-appexplanation.html',
})
export class WelcomeAppexplanationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeAppexplanationPage');
  }

  public gotoWelcomeConnect2Page() {
    this.navCtrl.push(WelcomeConnect2Page, {});
  }

}
