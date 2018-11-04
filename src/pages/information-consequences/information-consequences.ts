import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InformationPage } from '../information/information';

@IonicPage()
@Component({
  selector: 'page-information-consequences',
  templateUrl: 'information-consequences.html',
})
export class InformationConsequencesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationConsequencesPage');
  }

  public gotoInformationPage() {
    this.navCtrl.push(InformationPage, {});
  }

}
