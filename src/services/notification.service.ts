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
    // For the time being, this only works if the application is already open.
    // Should be corrected after the prototype phase.
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
    console.log('schedule() : options:=', options);

    this.localNotifications.requestPermission().then((permission) => {
      this.storage.get("username").then(userName => {
        var s = options.text as string
        if (s) {
          options.text = s.replace('{{UserName}}', userName);  
        }

        this.localNotifications.schedule(options);
      });

    }).catch(error => {
      alert('no permission' + error);
    });
  }

  public createWeeklyWeightNotification() {
    // First notification in 7 days, repeating each week
    let trigger: ILocalNotificationTrigger = {
      every: ELocalNotificationTriggerUnit.WEEK
    };

    // for testing reduced Interval to 1 minute
    trigger = {
      every: ELocalNotificationTriggerUnit.MINUTE,
      count: 1
    };

    this.schedule({
      text: `Hallo {{UserName}}, es sind schon wieder 7 Tage vergangen. Klicke auf diese Nachricht um die neuen Werte aktuelles Gewicht und Wochenfortschritt einzugeben.`,
      trigger: trigger,
      data: 'ENTER_WEIGHT'
    });
  }

  showNegativeHeartRate() {
    let at = new Date(new Date().getTime() + 1000);
    console.log("showNegativeHeartRate() : at:=", at);

    this.schedule({
      text: `Hallo {{UserName}}, achte bitte besser auf Dich und Deine Gesundheit. Verzichte bitte auf körperliche Anstrengungen.`,
      trigger: {
        at: at
      }
    });
  }

  showPositiveHeartRate(): any {
    let at = new Date(new Date().getTime() + 1000);
    console.log("showPositiveHeartRate() : at:=", at);

    this.schedule({
      text: `Hallo {{UserName}}, Du befindest Dich aktuell vermutlich in einer Stresssituation. Versuche ganz ruhig zu atmen.`,
      trigger: {
        at: at
      }
    });
  }
}
