import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BodyWeight, Observation, Resource } from 'Midata';
import { MidataService } from '../../services/MidataService';
import { Goal } from '../../resources/goal';
import * as Globals from '../../../typings/globals';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { validateWeight, validateWeightGains } from '../../services/validators';

/**
 * Generated class for the WeightReminderNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-weight-reminder-notification',
  templateUrl: 'weight-reminder-notification.html'
})
export class WeightReminderNotificationPage {

  state = 'FORM';
  message: string;
  currentWeight: any;
  //currentGoal: any;
  weightGains: any;
  previousWeight: any;
  previousGoal: any;
  userName: any;

  formGroup: any;
  isSubmitted: boolean;


  constructor(
    private zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    private midataService: MidataService,
    private storage: Storage,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      currentWeight: ['', validateWeight],
      weightGains: ['', validateWeightGains]
    });
  }

  ionViewDidLoad() {
    console.log('WeightReminderNotificationPage.ionViewDidLoad()');

    let userId = this.midataService.getUser().id;
    console.log('ionViewDidLoad() : userId:=', userId);

    this.midataService
      .search('Observation/$lastn', {
        max: 1,
        _sort: '-date',
        code: Globals.BODYWEIGHT.toString,
        patient: userId
      })
      .then(response => {
        (response || []).forEach((measure: Observation) => {
          let value = measure.getProperty('valueQuantity');
          this.previousWeight = value['value'];
          console.log('ionViewDidLoad() : previousWeight:=', this.previousWeight);
        });
      })
      .catch((error) => {
        console.error('ionViewDidLoad() : failed to load previousWeight', error);
        this.previousWeight = 0;
      });

    // TODO: how to we get it from the resources/goal.ts object?
    // new Goal().getDescription().coding.system?
    const code = 'http://snomed.info/sct|8943002';
    //const code = 'http://loinc.org|3141-9';
    
    this.midataService
      .search('Goal', { category: 'dietary' })
      .then(response => {
        let val = response[0].getProperty('target').detailQuantity.value;
        let unit = response[0].getProperty('target').detailQuantity.unit;
        //this.currentGoal = `${val}`+ unit;
        console.log(response);
        console.log('newest goal', val, unit); 
        // (response || []).forEach((measure: Goal) => {
        //   let value = measure.getProperty('detailQuantity');
        //   this.previousGoal = value['value'];
        //   console.log('ionViewDidLoad() : previousGoal:=', this.previousGoal);
        // });
      })
      .catch((error) => {
        console.error('ionViewDidLoad() : failed to load previousGoal', error);
        this.previousGoal = 500;
      });

    this.storage.get("username").then(username => {
      this.userName = username;
      console.log('ionViewDidLoad() : userName:=', this.userName);
    });
  }

  saveData() {
    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      this.zone.run(() => {
        // force ui repaint
      });
      return
    }

    let a = parseFloat(this.currentWeight);
    let b = parseFloat(this.previousWeight);
    if (a === NaN || b === NaN) {
      this.zone.run(() => {
        this.message = "Ungültige Eingabe";
      });
      return;
    }

    let weightChange = (a - b) * 1000;

    let message = '';
    if (weightChange == this.previousGoal) {
      message = `Super ${this.userName} Du hast Dein Ziel erreicht, mach weiter so!`;
    } else if (weightChange > this.previousGoal) {
      message = `Super ${this.userName} Du hast Dein Ziel übertroffen, mach weiter so!`;
    } else {
      message = `Schade ${this.userName} leider hast Du Dein Ziel nicht erreicht. Bitte schau nächtste Woche besser zu Dir und Deinem Körper.`;
    }

    console.log("saveData() : ", weightChange, "gr.", message);

    this.zone.run(() => {
      this.message = "Speichere Daten...";
    });

    let saveWeight = this.midataService.save(new BodyWeight(this.currentWeight, new Date().toISOString()))

    let goal = new Goal(this.weightGains);
    let saveGoal = this.midataService.save(goal);

    // let saveWeight = new Promise<Resource>((resolve) => {
    //   resolve(null);
    // });

    // let saveGoal = new Promise<Resource>((resolve) => {
    //   resolve(null);
    // });

    Promise.all([saveWeight, saveGoal])
      .then(() => {
        this.zone.run(() => {
          this.state = 'DONE';
          this.message = message;
          console.log("saveData() : DONE", this.message);
        });
      })
      .catch((error) => {
        this.zone.run(() => {
          this.message = 'Gewicht konnte nicht gespeichert werden. Bitte versuche es nochmals';
          this.state = 'FORM';
        });
      })
  }

  public gotoTabsPage() {
    this.navCtrl.push(TabsPage, {});
  }

}