import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalDeletePage } from './journal-delete';

@NgModule({
  declarations: [
    JournalDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(JournalDeletePage),
  ],
})
export class JournalDeletePageModule {}
