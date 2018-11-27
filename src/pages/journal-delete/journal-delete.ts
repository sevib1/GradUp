import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { JournalPage } from '../journal/journal';

import { JournalEntry } from '../../classes/journalEntry';
import { JournalEntryPage } from '../journal-entry/journal-entry';
//import Providers
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-journal-delete',
  templateUrl: 'journal-delete.html',
})
export class JournalDeletePage {

   journalEntry: JournalEntry;
   journalEntryId: number;
  
   journalEntryCollection: JournalEntry[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dbp: DatabaseProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalDeletePage');
  }

  ionViewWillEnter(){
    console.log("ionHomeViewWillEnter");
    //this.journalEntryId = this.navParams.data; nötig?! Auflistung passiert auch auf dieser Seite

    
    this.dbp.getJournalEntryCollection().then((val) => {
      if(val == null) {
        // There's no journalEntry

      } else {
        this.journalEntryCollection = val;

        this.dbp.getJournalEntryById(this.journalEntryId).then((val) => {
          this.journalEntry = val;
        });
      }
    });
  }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});
  }

  showJournalEntry(jEntryId: number){
   this.navCtrl.push(JournalEntryPage, this.journalEntryId);
  
  }

  deleteJournalEntry(jEntryId: number): void{

    this.journalEntryId = jEntryId;

    console.log("journalDelete -> journalEntryId: " + this.journalEntryId);

    let alert = this.alertCtrl.create({
      title: "Achtung!",
      subTitle: "Wollen Sie diesen Eintrag wirklich löschen?",
      buttons: [
        {
          text: 'Ja',
          role: 'ja',
          handler: () => {this.dbp.deleteJournalEntryById(jEntryId).then(val => {
            if(val){
              this.dbp.getJournalEntryCollection().then(valArray => {
                this.journalEntryCollection = valArray;
              })
            }
          })
          }
        },

        {
          text: 'Abbrechen',
          role: 'abbrechen',
          handler: () => {console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  
    console.log("journalDelete -> journalEntryId: " + this.journalEntryId);
  }

}
