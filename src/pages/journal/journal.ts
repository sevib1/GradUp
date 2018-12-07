import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { JournalEntryPage } from '../journal-entry/journal-entry';
import { JournalDeletePage } from '../journal-delete/journal-delete';


import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController) {

  }
  
  public gotoJournalEntryPage() {
    this.navCtrl.push(JournalEntryPage, {});
  }

  public gotoJournalDeletePage() {
    this.navCtrl.push(JournalDeletePage, {});
  }

  ionViewDidLeave(){
    
  }
  

}
