import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile-customizecontacts',
  templateUrl: 'profile-customizecontacts.html',
})


export class ProfileCustomizecontactsPage {

  contacts = [];
  contact_nummer = [];
  contact_email = [];
  contact_emailtext = [];

  bezug = [];
  bezug_nummer = [];
  bezug_sms = [];
  bezug_email = [];
  bezug_emailtext = [];

  fachperson: string;
  key:string="fachperson";
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,) {
    
      this.getData();
  }

  getData() {
    let that = this;

    this.storage.get('bezugsperson_inputtext').then((value) => {
      if(value !== null){
        console.log(value);
        that.bezug.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('bezugsperson_telefonnummer').then((value) => {
      if(value !== null){
        console.log(value);
        that.bezug_nummer.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('bezugsperson_smstext').then((value) => {
      if(value !== null){
        console.log(value);
        that.bezug_sms.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('bezugperson_email').then((value) => {
      if(value !== null){
        console.log(value);
        that.bezug_email.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('bezugsperson_emailtext').then((value) => {
      if(value !== null){
        console.log(value);
        that.bezug_emailtext.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('fachperson_inputtext').then((value) => {
      if(value !== null){
        console.log(value);
        that.contacts.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('fachperson_telefonnummer').then((value) => {
      if(value !== null){
        console.log(value);
        that.contact_nummer.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('fachperson_email').then((value) => {
      if(value !== null){
        console.log(value);
        that.contact_email.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });

    this.storage.get('fachperson_emailtext').then((value) => {
      if(value !== null){
        console.log(value);
        that.contact_emailtext.push(value);
      } else {
        that.contacts.push('Kein Eintrag vorhanden');
      }
  });
  }

  saveData() {
    //this.contacts.push('fachperson');
    //this.storage.set('fachperson', this.contacts);
    //this.storage.get('fachperson');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileCustomizecontactsPage');
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
