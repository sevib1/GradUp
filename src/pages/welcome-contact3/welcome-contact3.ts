import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnectPage } from '../welcome-connect/welcome-connect';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';

import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the WelcomeContact3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-contact3',
  templateUrl: 'welcome-contact3.html',
})
export class WelcomeContact3Page {

    //Key Value Storage
    fachperson_inputtext:string;
    key:string="fachperson_inputtext";
  
    fachperson_telefonnummer:any;
    key1:any="fachperson_telefonnummer";

    fachperson_smstext:string;
    key2:string="fachperson_smstext";
  
    fachperson_email:string;
    key3:string="fachperson_email";
  
    fachperson_emailtext:string;
    key4:string="fachperson_emailtext";
  
    //For Validation of Fields
    formgroup:FormGroup;
    inputtext:AbstractControl;
    telefonnummer:AbstractControl;
    smstext:AbstractControl;
    email:AbstractControl;
    emailtext:AbstractControl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private formBuilder: FormBuilder) {

      //Validation of Inputfields
      this.formgroup = formBuilder.group({
      inputtext:['', Validators.required],
      telefonnummer:['', Validators.required],
      smstext:['', Validators.required],
      email:['', Validators.required],
      emailtext:['', Validators.required]
      });

      this.inputtext = this.formgroup.contains['inputtext'];
      this.telefonnummer = this.formgroup.contains['telefonnummer'];
      this.smstext = this.formgroup.contains['smstext'];
      this.email = this.formgroup.contains['email'];
      this.emailtext = this.formgroup.contains['emailtext'];
  }

    //Lokal Storage  
    saveData() {
      this.storage.set(this.key, this.fachperson_inputtext);
      this.storage.set(this.key1, this.fachperson_telefonnummer);
      this.storage.set(this.key2, this.fachperson_smstext);
      this.storage.set(this.key3, this.fachperson_email);
      this.storage.set(this.key4, this.fachperson_emailtext);
      /**For testing 
      this.storage.get(this.key), this.storage.get(this.key1).then((values) => {
        console.log('Your username is', values);
      }); */
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeContact3Page');
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }

  public gotoWelcomeConnectPage() {
    this.navCtrl.push(WelcomeConnectPage, {});
  }

}
