import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InformationAnorexiaPage } from '../information-anorexia/information-anorexia';
import { InformationConsequencesPage } from '../information-consequences/information-consequences';
import { InformationPsychePage } from '../information-psyche/information-psyche';
import { InformationAnatomyPage } from '../information-anatomy/information-anatomy';
/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

  constructor(
    public navCtrl: NavController,    
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationPage');
  }

  public gotoInformationAnorexiaPage() {
    this.navCtrl.push(InformationAnorexiaPage, {});
  }

  public gotoInformationConsequencesPage() {
    this.navCtrl.push(InformationConsequencesPage, {});
  }

  public gotoInformationAnatomyPage() {
    this.navCtrl.push(InformationAnatomyPage, {});
  }

}
