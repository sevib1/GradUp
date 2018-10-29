import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeConnectPage } from './welcome-connect';

@NgModule({
  declarations: [
    WelcomeConnectPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeConnectPage),
  ],
})
export class WelcomeConnectPageModule {}
