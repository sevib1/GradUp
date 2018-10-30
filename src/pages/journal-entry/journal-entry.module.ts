import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEntryPage } from './journal-entry';

@NgModule({
  declarations: [
    JournalEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryPage),
  ],
})
export class JournalEntryPageModule {}
