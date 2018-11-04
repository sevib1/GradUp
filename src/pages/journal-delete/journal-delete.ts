import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JournalPage } from '../journal/journal';

@IonicPage()
@Component({
  selector: 'page-journal-delete',
  templateUrl: 'journal-delete.html',
})
export class JournalDeletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalDeletePage');
  }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});
  }

}
