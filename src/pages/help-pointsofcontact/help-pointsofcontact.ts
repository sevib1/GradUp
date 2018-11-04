import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpPage } from '../help/help';

@IonicPage()
@Component({
  selector: 'page-help-pointsofcontact',
  templateUrl: 'help-pointsofcontact.html',
})
export class HelpPointsofcontactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPointsofcontactPage');
  }

  public gotoHelpPage() {
    this.navCtrl.push(HelpPage, {});
  }

}
