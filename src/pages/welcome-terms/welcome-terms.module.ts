import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeTermsPage } from './welcome-terms';

@NgModule({
  declarations: [
    WelcomeTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeTermsPage),
  ],
})
export class WelcomeTermsPageModule {}
