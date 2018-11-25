import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeightReminderNotificationPage } from './weight-reminder-notification';

@NgModule({
  declarations: [
    WeightReminderNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(WeightReminderNotificationPage),
  ],
})
export class WeightReminderNotificationPageModule {}
