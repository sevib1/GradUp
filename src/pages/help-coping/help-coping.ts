import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpPage } from '../help/help';

@IonicPage()
@Component({
  selector: 'page-help-coping',
  templateUrl: 'help-coping.html',
})
export class HelpCopingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpCopingPage');
  }

  public gotoHelpPage() {
    this.navCtrl.push(HelpPage, {});
  }

}
