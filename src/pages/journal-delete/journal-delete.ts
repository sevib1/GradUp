import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { JournalPage } from '../journal/journal';

import { JournalEntry } from '../../UtilityClasses/journalEntry';

//import Providers
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-journal-delete',
  templateUrl: 'journal-delete.html',
})
export class JournalDeletePage {

 
   journalEntry: JournalEntry;
  
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
    this.journalEntry = this.navParams.data; //was macht diese funktion?
    
    this.dbp.getJournalEntryCollection().then((val) => {
      if(val == null) {
        // no isbarNote exist

      } else {
        this.journalEntryCollection = val;
      }
    });
  }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});
  }

  showJournalEntry(){

  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "Achtung!",
      subTitle: "Wollen Sie diesen Eintrag wirklich löschen?",
      buttons: [
        {
          text: 'Ja',
          role: 'ja',
          handler: () => {this.deleteJournalEntry();
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
  }

  deleteJournalEntry(){ //in bearbeitung
  
  
   //this.journalEntryCollection.delete(this.journalEntry.getJournalEntryID());
   this.dbp.getJournalEntryCollection;
  }

}
