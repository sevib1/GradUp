import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BodyWeight } from 'Midata';
import { MidataService } from '../../services/MidataService';

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

  constructor(
    public navCtrl: NavController,    
    public navParams: NavParams,
    private midataService: MidataService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeightReminderNotificationPage');
  }

  saveData() {
    let MessageDate = new Date();
    this.midataService
      .save(new BodyWeight(this.currentWeight, MessageDate.toISOString()))
      .then(response => {
        this.message = 'Gewicht gespeichert. TODO Berechnung';
        this.state = 'DONE';
      })
      .catch(error => {
        this.message = 'Gewicht konnte nicht gespeichert werden. Bitte versuche es nochmals';
        this.state = 'FORM';
      });
  }
  
  public gotoTabsPage() {
    this.navCtrl.push(TabsPage, {});
  }

}