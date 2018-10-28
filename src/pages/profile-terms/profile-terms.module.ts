import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileTermsPage } from './profile-terms';

@NgModule({
  declarations: [
    ProfileTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileTermsPage),
  ],
})
export class ProfileTermsPageModule {}
