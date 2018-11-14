import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';
import { Storage } from '@ionic/storage';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }
  
  saveData() {
    this.storage.set(this.key, this.inputtext);
    this.storage.get(this.key).then((val) => {
      console.log('Your username is', val);
    });
  }

}
