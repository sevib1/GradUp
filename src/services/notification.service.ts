import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';
import { WeightReminderNotificationPage } from '../pages/weight-reminder-notification/weight-reminder-notification';

@Injectable()
export class NotificationService {

  constructor(
    private app: App,
    private localNotifications: LocalNotifications
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

}
