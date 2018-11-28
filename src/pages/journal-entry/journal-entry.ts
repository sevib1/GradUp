import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { Storage } from '@ionic/storage';

//import Providers
import { DatabaseProvider } from '../../providers/database/database';

//import utility class
import { JournalEntry } from '../../classes/journalEntry';

//import journalDeletePage
import { JournalDeletePage } from '../journal-delete/journal-delete'; //not shure if needed...


@IonicPage()
@Component({
  selector: 'page-journal-entry',
  templateUrl: 'journal-entry.html',
})
export class JournalEntryPage {

  //journal Entry
  journalEntry: JournalEntry;
  journalEntryId: number;

  journalEntryExistend : JournalDeletePage;

  journalEntryCollection: JournalEntry[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public dbp: DatabaseProvider) {
    this.journalEntry = new JournalEntry();
  
  }

  //Runs when the page is about to enter and become the active page.
  ionViewWillEnter(){
    console.log("ionHomeViewWillEnter");
    
    
  }

  //Runs when the page has loaded.
  ionViewDidLoad() {

    
    console.log('ionViewDidLoad JournalEntryPage');
    this.dbp.getJournalEntryCollection().then((val) => {
     if(val == null ) {
        //no entry there
     } else {
       this.journalEntryCollection = val;
     }
    });

    //this.journalEntry = this.navParams.data; //-> fetches data from "journal-deletePage"
    this.journalEntryId = this.navParams.data; //-> fetches data from "journal-deletePage" --> do not delete!, otherwise delete won't work properly
    
  }

    //kochd1: This codeline below is necessary to display the today's date.
    myDate: any = new Date().toISOString();


    // save journal Entry to database
    saveEntry(){

      console.log(this.journalEntry);
    
      // deprecated -> this.journalEntry.entryId = this.myDate;
      console.log("saveJournalEntry button was clicked")
      this.dbp.getJournalEntryCollection()
      .then((val) => {
        if(val == null) {
          console.log("getJournalEntryCollection -> null")
          this.journalEntryCollection.push(this.journalEntry);
          this.dbp.saveJournalEntry(this.journalEntryCollection);

          console.log(this.journalEntry.entryId)
          console.log(this.journalEntryCollection)

          this.journalEntry = this.navParams.data;

        } else {
          console.log("get-->" + val);
          this.journalEntryCollection = val;
          this.journalEntryCollection.push(this.journalEntry);
          this.dbp.saveJournalEntry(this.journalEntryCollection);
          
          console.log(this.journalEntry.entryId)
          console.log(this.journalEntryCollection)

          this.journalEntry = this.navParams.data;
        }
      })
      
      this.navCtrl.pop();
    }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});
  }



  clickMainFAB(){
    console.log("Clicked open menu")
  }

  openCamera(){ //this method will be written in sprint 2

  }

  openGallery(){ //this method will be written in sprint 2

  }

}
