import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

import { Storage } from '@ionic/storage';
import { Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { validatePhoneIfNotEmpty, validateEmailIfNotEmpty } from '../../services/validators';

@IonicPage()
@Component({
  selector: 'page-profile-customizecontacts',
  templateUrl: 'profile-customizecontacts.html',
})
export class ProfileCustomizecontactsPage {

  fachperson_inputtext = '';
  fachperson_telefonnummer = '';
  fachperson_email = '';
  fachperson_emailtext = '';

  bezugsperson_inputtext = '';
  bezugsperson_telefonnummer = '';
  bezugsperson_smstext = '';
  bezugsperson_email = '';
  bezugsperson_emailtext = '';

  fachperson: string;
  key: string = "fachperson";

  isSubmitted: boolean = false;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    formBuilder: FormBuilder
  ) {

    this.formGroup = formBuilder.group({
      bezugsperson_inputtext: [''],
      bezugsperson_telefonnummer: ['', validatePhoneIfNotEmpty],
      bezugsperson_email: ['', validateEmailIfNotEmpty],
      bezugsperson_emailtext: [''],
      bezugsperson_smstext: [''],

      fachperson_inputtext: [''],
      fachperson_telefonnummer: ['', validatePhoneIfNotEmpty],
      fachperson_email: ['', validateEmailIfNotEmpty],
      fachperson_emailtext: ['']
    });

    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileCustomizecontactsPage');
  }

  getData() {
    let that = this;

    // TODO: move to separate service...
    this.storage.get('bezugsperson_inputtext').then((value) => {
      that.bezugsperson_inputtext = value;
    });

    this.storage.get('bezugsperson_telefonnummer').then((value) => {
      that.bezugsperson_telefonnummer = value;
    });

    this.storage.get('bezugsperson_smstext').then((value) => {
      that.bezugsperson_smstext = value;
    });

    this.storage.get('bezugsperson_email').then((value) => {
      that.bezugsperson_email = value;
    });

    this.storage.get('bezugsperson_emailtext').then((value) => {
      that.bezugsperson_emailtext = value;
    });

    this.storage.get('fachperson_inputtext').then((value) => {
      that.fachperson_inputtext = value;
    });

    this.storage.get('fachperson_telefonnummer').then((value) => {
      that.fachperson_telefonnummer = value;
    });

    this.storage.get('fachperson_email').then((value) => {
      that.fachperson_email = value;
    });

    this.storage.get('fachperson_emailtext').then((value) => {
      that.fachperson_emailtext = value;
    });
  }

  saveData() {

    this.isSubmitted = true;
 
    if (!this.formGroup.valid) {
      return
    }

    // TODO: move to separate service...
    let saveAll = [
      this.storage.set('bezugsperson_inputtext', this.cleanValue(this.bezugsperson_inputtext)),
      this.storage.set('bezugsperson_telefonnummer', this.cleanValue(this.bezugsperson_telefonnummer)),
      this.storage.set('bezugsperson_smstext', this.cleanValue(this.bezugsperson_smstext)),
      this.storage.set('bezugsperson_email', this.cleanValue(this.bezugsperson_email)),
      this.storage.set('bezugsperson_emailtext', this.cleanValue(this.bezugsperson_emailtext)),
      this.storage.set('fachperson_inputtext', this.cleanValue(this.fachperson_inputtext)),
      this.storage.set('fachperson_telefonnummer', this.cleanValue(this.fachperson_telefonnummer)),
      this.storage.set('fachperson_email', this.cleanValue(this.fachperson_email)),
      this.storage.set('fachperson_emailtext', this.cleanValue(this.fachperson_emailtext))
    ]

    Promise.all(saveAll).then(() => {
      this.gotoProfilePage();
    });
  }

  private cleanValue(s: string): string {
    s = (s || "").trim()
    s = s === 'Kein Eintrag vorhanden' ? '' : s;
    return s;
  }

  public gotoProfilePage() {
    this.navCtrl.push(ProfilePage, {});
  }

}
