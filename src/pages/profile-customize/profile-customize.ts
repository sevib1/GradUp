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

  /**
   * #MIDATA -> array for the weight data 
     store the raw data in this array.
   */
  weightData: Array<{date: Date, value: number }>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private midataService: MidataService
  ) {

    //#MIDATA
    //this.dailyData = this.navParams.get('data');
    this.weightData = new Array<{ date: Date, value: number }>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');

    //#MIDATA -> load the elements
    this.loadData();
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

  /**
   * #MIDATA: add the weight values to the weightData array.
   * 
   * @param measure 
   * @param date 
   */
  addWeightMeasure(measure: number, date: Date): void {
    /*if (moment().diff(date) >= 0){

    }*/

    //push the data to the array
    this.weightData.push({ date: date, value: measure });
  }

  

  /**
   * #MIDATA: loads the data (FHIR Observations with code "body weight") from the MIDATA server
   */
  private loadData(): void {
    this.midataService.search('Observation/$lastn', { max: 1000, _sort: '-date', code: Globals.BODYWEIGHT.toString, patient: this.midataService.getUser().id })
      .then(response => {
        if( response.length > 0) {


          response.forEach((measure: Observation) => {
            //console.log(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
            this.addWeightMeasure(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
          });
          /* TODO:  to test */
          /* TODO: catch error */
        }
      }
      );
  }

  /*formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }*/ // -> what is "moment"?!
}
