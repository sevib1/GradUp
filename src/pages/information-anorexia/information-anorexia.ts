import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InformationPage } from '../information/information';

@IonicPage()
@Component({
  selector: 'page-information-anorexia',
  templateUrl: 'information-anorexia.html',
})
export class InformationAnorexiaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationAnorexiaPage');
  }

  public gotoInformationPage() {
    this.navCtrl.push(InformationPage, {});
  }

}
