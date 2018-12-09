import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { Storage } from '@ionic/storage';

import { NotificationService } from '../../services/notification.service';

//#MIDATA imports
import { BodyWeight, Observation } from 'Midata';
import { MidataService } from '../../services/MidataService';
import * as Globals from '../../../typings/globals';

@IonicPage()
@Component({
  selector: 'page-profile-customize',
  templateUrl: 'profile-customize.html',
})
export class ProfileCustomizePage {

  inputtext:string;
  key:string="username";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private midataService: MidataService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');

    //#MIDATA -> load the elements
   // this.loadData();
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }
  
  //saves the data locally and also on MIDATA
  saveData() {
    this.storage.set(this.key, this.inputtext);
    this.storage.get(this.key).then((val) => {
      console.log('Your username is', val);
    });
  }

  /*formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }*/ // -> what is "moment"?!
}
