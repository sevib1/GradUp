import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePrivacyPage } from './welcome-privacy';

@NgModule({
  declarations: [
    WelcomePrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePrivacyPage),
  ],
})
export class WelcomePrivacyPageModule {}
