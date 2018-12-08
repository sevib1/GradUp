import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InformationAnorexiaPage } from '../information-anorexia/information-anorexia';
import { InformationConsequencesPage } from '../information-consequences/information-consequences';
import { InformationPsychePage } from '../information-psyche/information-psyche';
import { InformationAnatomyPage } from '../information-anatomy/information-anatomy';

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

  constructor(
    public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  public gotoInformationAnorexiaPage() {
    this.navCtrl.push(InformationAnorexiaPage, {});
  }

  public gotoInformationConsequencesPage() {
    this.navCtrl.push(InformationConsequencesPage, {});
  }

  public gotoInformationPsychePage() {
    this.navCtrl.push(InformationPsychePage, {});
  }

  public gotoInformationAnatomyPage() {
    this.navCtrl.push(InformationAnatomyPage, {});
  }

}
