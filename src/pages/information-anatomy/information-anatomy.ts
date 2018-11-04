import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InformationPage } from '../information/information';

@IonicPage()
@Component({
  selector: 'page-information-anatomy',
  templateUrl: 'information-anatomy.html',
})
export class InformationAnatomyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationAnatomyPage');
  }

  public gotoInformationPage() {
    this.navCtrl.push(InformationPage, {});
  }

}
