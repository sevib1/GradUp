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
import { MyResource } from '../../resources/occupation';
import { validateWeight, validateWeightGains } from '../../services/validators';

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

  //Local storage for username 
  inputtext: string;
  key: string = "username";

  relationship_status: string;
  key1: string = "relationship_status";

  hobbies_status: string;
  key2: string = "hobbies_status";

  pet_input: string;
  key3: string = "pet_input";

  pet_status: string;
  key4: string = "pet_status";

  residential_input: string;
  key5: string = "residential_input";

  residential_status: string;
  key6: string = "residential_status";


  /**
   * #MIDATA -> array for the weight data 
     store the raw data in this array.
   */
  weightData: Array<{ date: Date, value: number }>;

  //Global variable for currentWeight
  currentWeight: any;

  //Global variable for Goal weight 
  weightGains: number;

  //Global variable for work Occupation
  userType: number;

  items: any;

  //Form Validation 
  isSubmitted: boolean = false;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private midataService: MidataService,
    private notificationService: NotificationService,
    formBuilder: FormBuilder
  ) {

    //Form Validation
    this.formGroup = formBuilder.group({
      username: ['', Validators.required],
      occupationM: ['', Validators.required],
      currentWeight: ['', validateWeight],
      weightGains: ['', validateWeightGains]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }

  //saves the data locally and also on MIDATA
  saveData() {
    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      return
    }

    let MessageDate = new Date();
    this.storage.set(this.key, this.inputtext);
    this.storage.set(this.key1, this.relationship_status);
    this.storage.set(this.key2, this.hobbies_status);
    this.storage.set(this.key3, this.pet_input);
    this.storage.set(this.key4, this.pet_status);
    this.storage.set(this.key5, this.residential_input);
    this.storage.set(this.key6, this.residential_status);
    this.storage.get(this.key2).then((value) => {
      console.log('Status Marriage', value);
    });

    //#MIDATA persistance
    this.midataService.save(new BodyWeight(+this.currentWeight, MessageDate.toISOString()));

    //#MIDATA persistance: adds new Goal 
    let goal = new Goal(this.weightGains);
    this.midataService.save(goal)
      .then((response) => {
        // we can now access the midata response
        console.log("juhu wir speichern auf midata!!!:D");
        this.notificationService.createWeeklyWeightNotification();

      }).catch((error) => {
        console.error("Error in save request:", error);
      });

    //#MIDATA persistance: adds new Work Occupation 
    let occupation = new MyResource(this.userType);
    this.midataService.save(occupation)
      .then((response) => {
        // we can now access the midata response
        console.log("juhu wir speichern auf midata!!!:D");
        this.notificationService.createWeeklyWeightNotification();

      }).catch((error) => {
        console.error("Error in save request:", error);
      });

    // TODO: should only redirect after save successful...
    this.gotoWelcomeContactPage();
  }
}
