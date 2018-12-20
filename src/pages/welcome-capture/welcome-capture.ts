import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';
import { Storage } from '@ionic/storage';

import { NotificationService } from '../../services/notification.service';

//Form Validation
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

//#MIDATA imports
import { BodyWeight, Observation } from 'Midata';
import { Goal } from '../../resources/goal';
import { MidataService } from '../../services/MidataService';
import * as Globals from '../../../typings/globals';

//Accordion
import { Http } from '@angular/http';

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

  //Storage
  inputtext:string;
  key:string="username";

  /**
   * #MIDATA -> array for the weight data 
     store the raw data in this array.
   */
  weightData: Array<{date: Date, value: number }>;
  
  //Global variable for currentWeight
  currentWeight;

  //Global variable for Goal weight 
  weightGain: number;

  //Global variable for work Occupation
  userType:string;
  key1:string="userType";

  //Form Validation 
  formgroup:FormGroup;
  username:AbstractControl;
  occupation:AbstractControl;
  bodyweight:AbstractControl;
  weightGains:AbstractControl;


  constructor(
    public navCtrl: NavController, 
    private http: Http,
    public navParams: NavParams,
    private storage: Storage,
    private midataService: MidataService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {

    //Form Validation
    this.formgroup = formBuilder.group({
      username:['', Validators.required],
      occupation:['', Validators.required],
      bodyweight:['', Validators.required],
      weightGain:['', Validators.required]
    });

    this.username = this.formgroup.controls['username'];
    this.occupation = this.formgroup.controls['occupation'];
    this.bodyweight = this.formgroup.controls['bodyweight'];
    this.weightGains = this.formgroup.controls['weightGains'];

    //#MIDATA
    //this.dailyData = this.navParams.get('data');
    this.weightData = new Array<{ date: Date, value: number }>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');

  +  //#MIDATA -> load the elements
    this.loadData();
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }
  
  //saves the data locally and also on MIDATA
  saveData() {
    let MessageDate = new Date();
    this.storage.set(this.key, this.inputtext);
    this.storage.set(this.key1, this.userType);
    this.storage.get(this.key1).then((data) => {
      console.log('Your username is', data);
    });

    //#MIDATA persistance
    this.midataService.save(new BodyWeight(+this.currentWeight, MessageDate.toISOString()));

    let goal = new Goal(this.weightGain);
    //goal.addGoal(this.weightGain);
    this.midataService.save(goal)
    .then((response) => {
      // we can now access the midata response
      console.log("juhu wir speichern auf midata!!!:D");
      this.notificationService.createWeeklyWeightNotification();

    }).catch((error) => {
        console.error("Error in save request:", error);
    });
}
    //this.addGoal();

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
  addGoal(measure1: number, measure2: string): void {
    let goal = new Goal(this.weightGain);
    //goal.addGoal(this.weightGain);
    console.log(goal);
    this.midataService.save(goal);
  }*/
 

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

      this.midataService.search('Goal/$lastn', { max: 1000, _sort: '-date', code: Goal.toString, patient: this.midataService.getUser().id })
      .then(response => {
        if( response.length > 0) {

          console.log(response);
          response.forEach((measure: Goal) => {
            console.log(measure);
            //console.log(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
            //this.addGoal(measure.getProperty('detailQuantity')['value'], measure.getProperty('detailQuantity')['unit']);
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
