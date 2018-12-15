import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { LocalNotifications, ILocalNotification, ELocalNotificationTriggerUnit, ILocalNotificationTrigger } from '@ionic-native/local-notifications';
import { WeightReminderNotificationPage } from '../pages/weight-reminder-notification/weight-reminder-notification';
import { Storage } from '@ionic/storage';

@Injectable()
export class NotificationService {

  constructor(
    private app: App,
    private localNotifications: LocalNotifications,
    private storage: Storage,
  ) {

    // Register click event listener for each local notification
    var observable = this.localNotifications.on('click');
    observable.subscribe(
      notification => {
        if (notification.data == 'TEST') {
          //alert('Is test notification.');
          this.app.getActiveNav().setRoot(WeightReminderNotificationPage);
        }
        if (notification.data == 'ENTER_WEIGHT') {
          //alert('Todo redirect to enter weight page.');
          this.app.getActiveNav().setRoot(WeightReminderNotificationPage)
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        //complete
      }
    );
  }

  public schedule(options: ILocalNotification): any {
    this.localNotifications.requestPermission().then((permission) => {
      //alert('permission' + permission);
      this.localNotifications.schedule(options);
    }).catch(error => {
      alert('no permission' + error);
    });
  }

  public createWeeklyWeightNotification() {
    this.storage.get("username").then(userName => {
      console.log('createWeeklyWeightNotification() : userName:=', userName);

      // First notification in 7 days, repeating each week
      let trigger: ILocalNotificationTrigger = {
        every: ELocalNotificationTriggerUnit.WEEK
      };

      // for testing reduced Interval to 1 minute
      trigger = {
        every: ELocalNotificationTriggerUnit.MINUTE,
        count: 5
      };

      this.schedule({
        text: `Hallo ${userName}, es sind schon wieder 7 Tage vergangen. Klicke auf diese Nachricht um die neuen Werte aktuelles Gewicht und Wochenfortschritt einzugeben.`,
        trigger: trigger,
        data: 'ENTER_WEIGHT'
      });
    });
  }

}
