import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileCustomizePage } from './profile-customize';

@NgModule({
  declarations: [
    ProfileCustomizePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileCustomizePage),
  ],
})
export class ProfileCustomizePageModule {}
