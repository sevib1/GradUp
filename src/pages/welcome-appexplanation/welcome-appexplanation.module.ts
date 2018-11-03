import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeAppexplanationPage } from './welcome-appexplanation';

@NgModule({
  declarations: [
    WelcomeAppexplanationPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeAppexplanationPage),
  ],
})
export class WelcomeAppexplanationPageModule {}
