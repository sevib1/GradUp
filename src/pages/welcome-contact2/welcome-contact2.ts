import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContact3Page } from '../welcome-contact3/welcome-contact3';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';

import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 

/**
 * Generated class for the WelcomeContact2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-contact2',
  templateUrl: 'welcome-contact2.html',
})
export class WelcomeContact2Page {

  //Key Value Storage
  bezugsperson_inputtext: string;
  key: string = "bezugsperson_inputtext";

  bezugsperson_telefonnummer: any;
  key1: any = "bezugsperson_telefonnummer";

  bezugsperson_smstext: string;
  key2: string = "bezugsperson_smstext";

  bezugsperson_email: string;
  key3: string = "bezugsperson_email";

  bezugsperson_emailtext: string;
  key4: string = "bezugsperson_emailtext";

  isSubmitted: boolean = false;

  //For Validation of Fields
  formGroup: FormGroup;
  inputtext: AbstractControl;
  telefonnummer: AbstractControl;
  smstext: AbstractControl;
  email: AbstractControl;
  emailtext: AbstractControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    formBuilder: FormBuilder
  ) {
  
    this.formGroup = formBuilder.group({
      inputtext: [
        ''
      ],
      telefonnummer: [
        '',
        (control: AbstractControl) => {
          var result = null;
          if (control.value) {
            // https://regex101.com/r/BBMPv2/2
            result = Validators.pattern(/^(\+41|0)\s?(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/)(control);
          }          
          console.debug('validate telefonnummer', control.value, result);
          return result;
        }
      ],
      smstext: [
        ''
      ],
      email: [
        '',
        (control: AbstractControl) => {
          var result = null;
          if (control.value) {
            result = Validators.email(control);
          }
          console.debug('validate email', control.value, result);
          return result;
        }
      ],
      emailtext: [
        ''
      ]
    });
  }

  //Lokal Storage  
  saveData() {

    this.isSubmitted = true;
 
    this.formGroup.valid
    if (!this.formGroup.valid) {
      return
    }

    Promise.all([
      this.storage.set(this.key, this.bezugsperson_inputtext),
      this.storage.set(this.key1, this.bezugsperson_telefonnummer),
      this.storage.set(this.key2, this.bezugsperson_smstext),
      this.storage.set(this.key3, this.bezugsperson_email),
      this.storage.set(this.key4, this.bezugsperson_emailtext)
    ]).then(() => {
      this.gotoWelcomeContact3Page();
    })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeContact2Page');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }

  public gotoWelcomeContact3Page() {
    this.navCtrl.push(WelcomeContact3Page, {});
  }

}
