import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryPage } from '../journal-entry/journal-entry';
import { JournalDeletePage } from '../journal-delete/journal-delete';
import { NotificationService } from '../../services/notification.service';
import { WeightReminderNotificationPage } from '../weight-reminder-notification/weight-reminder-notification';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {

  constructor(
    public navCtrl: NavController,
    private notificationService: NotificationService,
  ) { }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');

    // für DEMO, wenn dev buttons ausgeblendet sind
    // this.notificationService.createWeeklyWeightNotification();
  }
  
  ionViewDidLeave() {
    console.log('ionViewDidLeave JournalPage');
  }

  public gotoJournalEntryPage() {
    this.navCtrl.push(JournalEntryPage, {});
  }

  public gotoJournalDeletePage() {
    this.navCtrl.push(JournalDeletePage, {});
  }


  public gotoWeightReminderPage() {
    this.navCtrl.push(WeightReminderNotificationPage, {});
  }

  public scheduleNotification() {
    this.notificationService.createWeeklyWeightNotification();
  }

}
