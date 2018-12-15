import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HelpPointsofcontactPage } from '../help-pointsofcontact/help-pointsofcontact';
import { HelpCopingPage } from '../help-coping/help-coping';
import { HelpRelaxationPage } from '../help-relaxation/help-relaxation';
import { ProfileCustomizecontactsPage } from '../profile-customizecontacts/profile-customizecontacts';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { EmailComposer } from '@ionic-native/email-composer';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  bezugsperson_telefonnummer: any;
  bezugsperson_smstext: string;
  bezugsperson_email: string;
  bezugsperson_emailtext: string;
  fachperson_telefonnummer: any;
  fachgperson_email: string;
  fachperson_emailtext: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber: CallNumber,
    private sms: SMS,
    private emailComposer: EmailComposer,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  callBezugsperson(): void {
    this.storage.get("bezugsperson_telefonnummer").then(value => {
      console.log('callBezugsperson() : value:=', value);

      if (!value) {
        this.showNotPhonnumber();
        return;
      }

      this.callNumber.callNumber(value, true);
    });
  }

  showNotPhonnumber() {
    let alert = this.alertCtrl.create({
      title: "Sie haben im Onboarding-Prozess keine Telefonnummer erfasst",
      subTitle: "Sie können nun diese Nummer im Profil erfassen oder direkt dem Notfall (144) anrufen.",
      buttons: [
        {
          text: 'Profil',
          handler: () => {
            this.navCtrl.push(ProfileCustomizecontactsPage);
          }
        },
        {
          text: '144',
          handler: () => {
            this.callNumber.callNumber("000", true);
          }
        },
        {
          text: 'Abbrechen',
          role: 'abbrechen',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  writeSMS(): void {
    this.storage.get("bezugsperson_smstext").then(text => {
      this.storage.get("bezugsperson_telefonnummer").then(telNr => {
        console.log('writeSMS() : text:=', text, ', telNr:=', telNr);

        if (!text) {
          this.showNotSMSText();
          return;
        }

        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            // send SMS with the native android SMS messaging
            // * intent: 'INTENT' => send SMS without open any other app
            // intent: '' => send directly, needs SEND_SMS permissions.
            intent: ''
          }
        };

        this.sms.send(telNr, text, options)
          .then(() => {
            console.log('sms sent successfully');
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  }

  showNotSMSText() {
    let alert = this.alertCtrl.create({
      title: "Sie haben im Onboarding-Prozess keinen SMS-Text erfasst",
      subTitle: "Sie können nun diesen Text im Profil erfassen oder direkt dem Notfall (144) anrufen.",
      buttons: [
        {
          text: 'Profil',
          handler: () => {
            this.navCtrl.push(ProfileCustomizecontactsPage);
          }
        },
        {
          text: '144',
          handler: () => {
            this.callNumber.callNumber("000", true);
          }
        },
        {
          text: 'Abbrechen',
          role: 'abbrechen',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  eMailBezugsperson(): void {
    this.storage.get("bezugsperson_email").then(mail => {
      this.storage.get("bezugsperson_emailtext").then(text => {
        console.log('eMailBezugsperson() : mail:=', mail, ',  text:=', text);

        if (!mail) {
          this.showNotMailAddress();
          return;
        }

        if (!text) {
          this.showNotMailText();
          return;
        }

        this.emailComposer.isAvailable().then((available: boolean) => {
          if (available) {
            //Now we know we can send
          }
        });

        let email = {
          to: mail,
          subject: 'Ich brauche Deine Hilfe',
          body: text,
          isHtml: true
        };

        // Send a text message using default options
        this.emailComposer.open(email);

      });
    });
  }

  showNotMailAddress() {
    let alert = this.alertCtrl.create({
      title: "Sie haben im Onboarding-Prozess keine E-Mail-Adresse erfasst",
      subTitle: "Sie können nun diese Adresse im Profil erfassen oder direkt dem Notfall (144) anrufen.",
      buttons: [
        {
          text: 'Profil',
          handler: () => {
            this.navCtrl.push(ProfileCustomizecontactsPage);
          }
        },
        {
          text: '144',
          handler: () => {
            this.callNumber.callNumber("000", true);
          }
        },
        {
          text: 'Abbrechen',
          role: 'abbrechen',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showNotMailText() {
    let alert = this.alertCtrl.create({
      title: "Sie haben im Onboarding-Prozess keinen Mail-Text erfasst",
      subTitle: "Sie können nun diesen Text im Profil erfassen oder direkt dem Notfall (144) anrufen.",
      buttons: [
        {
          text: 'Profil',
          handler: () => {
            this.navCtrl.push(ProfileCustomizecontactsPage);
          }
        },
        {
          text: '144',
          handler: () => {
            this.callNumber.callNumber("000", true);
          }
        },
        {
          text: 'Abbrechen',
          role: 'abbrechen',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  callFachperson(): void {
    this.storage.get("fachperson_telefonnummer").then(value => {
      console.log('callFachperson() : value:=', value);
      if (!value) {
        this.showNotPhonnumber();
        return;
      }

      this.callNumber.callNumber(value, true);
    });
  }

  eMailFachperson(): void {
    this.storage.get("fachperson_email").then(mail => {
      this.storage.get("fachperson_emailtext").then(text => {
        console.log('eMailFachperson() : mail:=', mail, ',  text:=', text);

        if (!mail) {
          this.showNotMailAddress();
          return;
        }

        if (!text) {
          this.showNotMailText();
          return;
        }

        this.emailComposer.isAvailable().then((available: boolean) => {
          if (available) {
            //Now we know we can send
          }
        });

        let email = {
          to: mail,
          subject: 'Ich brauche Ihre Hilfe',
          body: text,
          isHtml: true
        };

        // Send a text message using default options
        this.emailComposer.open(email);

      });
    });
  }

  public gotoHelpPointsofcontactPage() {
    this.navCtrl.push(HelpPointsofcontactPage, {});
  }

  public gotoHelpCopingPage() {
    this.navCtrl.push(HelpCopingPage, {});
  }

  public gotoHelpRelaxationPage() {
    this.navCtrl.push(HelpRelaxationPage, {});
  }
}