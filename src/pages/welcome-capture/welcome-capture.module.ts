import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeCapturePage } from './welcome-capture';

@NgModule({
  declarations: [
    WelcomeCapturePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeCapturePage),
  ],
})
export class WelcomeCapturePageModule {}
