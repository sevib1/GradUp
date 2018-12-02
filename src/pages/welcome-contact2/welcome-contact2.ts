import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContact3Page } from '../welcome-contact3/welcome-contact3';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
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
  bezugsperson_inputtext:string;
  key:string="bezugsperson_inputtext";

  bezugsperson_telefonnummer:any;
  key1:any="bezugsperson_telefonnummer";

  bezugsperson_smstext:string;
  key2:string="bezugsperson_smstext";

  bezugsperson_email:string;
  key3:string="bezugperson_email";

  bezugsperson_emailtext:string;
  key4:string="bezugsperson_emailtext";

  //For Validation of Fields
  formgroup:FormGroup;
  inputtext:AbstractControl;
  telefonnummer:AbstractControl;
  smstext:AbstractControl;
  email:AbstractControl;
  emailtext:AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    private contacts: Contacts,
    private formBuilder: FormBuilder ) {

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
    this.storage.set(this.key, this.bezugsperson_inputtext);
    this.storage.set(this.key1, this.bezugsperson_telefonnummer);
    this.storage.set(this.key2, this.bezugsperson_smstext);
    this.storage.set(this.key3, this.bezugsperson_email);
    this.storage.set(this.key4, this.bezugsperson_emailtext);
    /**For testing 
    this.storage.get(this.key), this.storage.get(this.key1).then((values) => {
      console.log('Your username is', values);
    }); */
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
