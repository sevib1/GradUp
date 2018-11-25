import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeAppexplanationPage } from '../welcome-appexplanation/welcome-appexplanation';
import { WelcomeCapturePage } from '../welcome-capture/welcome-capture';
import { TabsPage } from '../tabs/tabs';
import { NotificationService } from '../../services/notification.service';
import { WeightReminderNotificationPage } from '../weight-reminder-notification/weight-reminder-notification';

@IonicPage()
@Component({
   selector: 'page-welcome',
   templateUrl: 'welcome.html',
})
export class WelcomePage {

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private notificationService: NotificationService
   ) { }

   ionViewDidLoad() {
      console.log('ionViewDidLoad WelcomePage');
   }

   public gotoWelcomeAppexplanationPage() {
      this.navCtrl.push(WelcomeAppexplanationPage, {});
   }

   public gotoProfilePage() {
      this.navCtrl.push(WelcomeCapturePage, {});
   }

   public gotoTabsPage() {
      this.navCtrl.push(TabsPage, {});
   }

   public gotoWeightPage() {
      this.navCtrl.push(WeightReminderNotificationPage, {});
   }

   public scheduleNotification() {
      this.notificationService.schedule({
         title: 'Titel',
         text: 'Text',
         trigger: {
            at: new Date(new Date().getTime() + 1000)
         },
         data: 'TEST'
      });      
   }

}
