import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';

//Form Validation
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the WelcomeCapturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-customize',
  templateUrl: 'profile-customize.html',
})
export class ProfileCustomizePage {

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
    //private midataService: MidataService,
    formBuilder: FormBuilder
  ) {

    //Form Validation
    this.formGroup = formBuilder.group({
      username: ['', Validators.required],
      occupationM: ['', Validators.required]
    });

    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');
  }

  getData() {
    let that = this;

    // TODO: move to separate service...

    this.storage.get('username').then((value) => {
      that.inputtext = value;
    });

    this.storage.get('userType').then((value) => {
      that.userType = value;
    });

    this.storage.get('relationship_status').then((value) => {
      that.relationship_status = value;
    });

    this.storage.get('residential_status').then((value) => {
      that.residential_status = value;
    });

    this.storage.get('pet_status').then((value) => {
      that.pet_status = value;
    });

    this.storage.get('hobbies_status').then((value) => {
      that.hobbies_status = value;
    });
  }

  saveData() {

    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      return
    }

    // TODO: move to separate service...
    let saveAll = [
      this.storage.set('username', this.inputtext),
      this.storage.set('userType', this.userType),
      this.storage.set('relationship_status', this.relationship_status),
      this.storage.set('residential_status', this.residential_status),
      this.storage.set('pet_status', this.pet_status),
      this.storage.set('hobbies_status', this.hobbies_status)
    ]

    Promise.all(saveAll).then(() => {
      this.gotoProfilePage();
    });
  }


  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}