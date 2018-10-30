import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryPage } from '../journal-entry/journal-entry';
import { JournalDeletePage } from '../journal-delete/journal-delete';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {

  constructor(public navCtrl: NavController) {

  }
  
  public gotoJournalEntryPage() {
    this.navCtrl.push(JournalEntryPage, {});
  }

  public gotoJournalDeletePage() {
    this.navCtrl.push(JournalDeletePage, {});
  }

}
