import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpPointsofcontactPage } from '../help-pointsofcontact/help-pointsofcontact';
import { HelpCopingPage } from '../help-coping/help-coping';
import { HelpRelaxationPage } from '../help-relaxation/help-relaxation';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  public gotoHelpPointsofcontactPage() {
    this.navCtrl.push(HelpPointsofcontactPage, {});
  }

  public gotoHelpCopingPage() {
    this.navCtrl.push(HelpCopingPage, {});
  }

  public gotoHelpRelaxationPage() {
    this.navCtrl.push(HelpRelaxationPage, {});
  }

}
