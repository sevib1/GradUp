import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeConnectPage } from '../welcome-connect/welcome-connect';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';

import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { validatePhoneIfNotEmpty, validateEmailIfNotEmpty } from '../../services/validators';

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

  fachperson_inputtext: string;
  fachperson_telefonnummer: any;
  fachperson_email: string;
  fachperson_emailtext: string;

  isSubmitted: boolean = false;
  formGroup: FormGroup;

  constructor(
    private zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    formBuilder: FormBuilder
  ) {

    this.formGroup = formBuilder.group({
      inputtext: [''],
      telefonnummer: ['', validatePhoneIfNotEmpty],
      email: ['', validateEmailIfNotEmpty],
      emailtext: ['']
    });
  }

  //Lokal Storage  
  saveData() {

    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      this.zone.run(() => {
        // force ui repaint
      });
      return
    }

    // TODO: move to separate service...
    Promise.all([
      this.storage.set('fachperson_inputtext', this.fachperson_inputtext),
      this.storage.set('fachperson_telefonnummer', this.fachperson_telefonnummer),
      this.storage.set('fachperson_email', this.fachperson_email),
      this.storage.set('fachperson_emailtext', this.fachperson_emailtext)
    ]).then(() => {
      this.gotoWelcomeConnectPage();
    })
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
