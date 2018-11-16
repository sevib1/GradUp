import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';
import { Storage } from '@ionic/storage';
import { BodyWeight } from 'Midata';
import { MidataService } from '../../services/MidataService';

/**
 * Generated class for the WelcomeCapturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-capture',
  templateUrl: 'welcome-capture.html',
})
export class WelcomeCapturePage {

  inputtext:string;
  key:string="username";

  currentWeight;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private midataService: MidataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }
  
  //saves the data locally and also on MIDATA
  saveData() {
    this.storage.set(this.key, this.inputtext);
    this.storage.get(this.key).then((val) => {
      console.log('Your username is', val);
    });

    //MIDATA persistance
    this.midataService.save(new BodyWeight(+this.currentWeight, new Date().toISOString()));

  }

}
