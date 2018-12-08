import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryPage } from '../journal-entry/journal-entry';
import { JournalDeletePage } from '../journal-delete/journal-delete';
import { NotificationService } from '../../services/notification.service';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { WeightReminderNotificationPage } from '../weight-reminder-notification/weight-reminder-notification';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {

  constructor(
    public navCtrl: NavController,
    private notificationService: NotificationService
  ) { }

  public gotoJournalEntryPage() {
    this.navCtrl.push(JournalEntryPage, {});
  }

  public gotoJournalDeletePage() {
    this.navCtrl.push(JournalDeletePage, {});
  }

  ionViewDidLeave() {
    console.log('ionViewDidLoad JournalPage');
  }

  public gotoWeightReminderPage() {
    this.navCtrl.push(WeightReminderNotificationPage, {});
  }

  public scheduleNotification() {
    this.notificationService.schedule({
      text: 'Hallo ???, es sind schon wieder 7 Tage vergangen. Klicke auf diese Nachricht um die neuen Werte aktuelles Gewicht und Wochenfortschritt einzugeben.',
      trigger: {
        every: ELocalNotificationTriggerUnit.MINUTE,
        count: 1,
      },
      data: 'ENTER_WEIGHT'
    });
  }

}
