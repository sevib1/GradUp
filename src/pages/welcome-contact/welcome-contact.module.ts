import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeContactPage } from './welcome-contact';

@NgModule({
  declarations: [
    WelcomeContactPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeContactPage),
  ],
})
export class WelcomeContactPageModule {}
