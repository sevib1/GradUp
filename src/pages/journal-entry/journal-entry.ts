import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JournalPage } from '../journal/journal';

@IonicPage()
@Component({
  selector: 'page-journal-entry',
  templateUrl: 'journal-entry.html',
})
export class JournalEntryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalEntryPage');
  }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});
  }

  //kochd1: This codeline below is necessary to display the today's date.
  myDate: any = new Date().toISOString();

  clickMainFAB(){
    console.log("Clicked open menu")
  }

  openCamera(){ //this method will be written later

  }

  openGallery(){ //this method will be written later

  }

  saveEntry(){ //this method will be written later

  }

}
