import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { JournalPage } from '../journal/journal';

//import Providers
import { DatabaseProvider } from '../../providers/database/database';

//import journalEntry utility class
import { JournalEntry } from '../../classes/journalEntry';

//import journalDeletePage
import { JournalDeletePage } from '../journal-delete/journal-delete'; //not sure if needed...


@IonicPage()
@Component({
  selector: 'page-journal-entry',
  templateUrl: 'journal-entry.html',
})
export class JournalEntryPage {

  /**
   *  journal Entry
   * 
   */
  journalEntry: JournalEntry;

  /**
   * collection of journal entries.
   */
  journalEntryCollection: JournalEntry[] = [];

  journalDeletePage : JournalDeletePage;

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dbp: DatabaseProvider,
    public events: Events) {
    this.journalEntry = new JournalEntry(); //without this, the page will throw a "Uncaught (in promise): TypeError"
  
  }

  /**
   * 
   * Runs when the page is about to enter and become the active page.
   */
  ionViewWillEnter(){
    console.log("willEnter journalEntryPage");
    
    //this.journalEntryId = this.navParams.data; //-> fetches data from "journal-deletePage" --> do not delete!, otherwise delete won't work properly
   
    this.journalEntry = this.navParams.data;
    
  }

  //Runs when the page has loaded.
  /*ionViewDidLoad() {

    
    console.log('ionViewDidLoad JournalEntryPage');
    this.dbp.getJournalEntryCollection().then((val) => {
     if(val == null ) {
        //no entry there
     } else {
       this.journalEntryCollection = val;
     }
    });

    //this.journalEntry = this.navParams.data; //-> fetches data from "journal-deletePage"
    
    
  }*/

    //kochd1: This codeline below is necessary to display the today's date.
    myDate: any = new Date().toISOString();

    /**
     * save journal entry to database.
     */
    saveEntry():void{
      console.log("saveJournalEntry button was clicked");
      if(this.journalEntry.entryId==0 || this.journalEntry.entryId==null){
        console.log("saveEntry() -> entryId:" + this.journalEntry.entryId);
        this.journalEntry.entryId = Number(new Date()); //.getTime);
      }
      
      this.dbp.saveJournalEntry(this.journalEntry).then(val => {
        if(val)
          this.dbp.getJournalEntryCollection().then((val) =>{
            this.navCtrl.pop();
          });
      });
    }
      //this.events.publish('journalEntryCollection:updated', this.journalEntryCollection);
      

      /*this.dbp.saveJournalEntry(this.journalEntry).then(val => {
        if(val) {
          // work around, damit später gepoppet wird
          this.dbp.getJournalEntryCollection().then(val => {
            this.navCtrl.pop();
          })
          
        }
      });*/

      /*
      
      this.dbp.getJournalEntryCollection()
      .then((val) => {
        if(val == null) {
          console.log("getJournalEntryCollection -> null")
          this.journalEntryCollection.push(this.journalEntry);
          this.dbp.saveJournalEntry(this.journalEntryCollection);

          console.log("JEntryId: this.journalEntry.entryId");
          console.log(this.journalEntryCollection)

        } else {
          console.log("get-->" + val);
          this.journalEntryCollection = val;
          this.journalEntryCollection.push(this.journalEntry);
          this.dbp.saveJournalEntry(this.journalEntryCollection);
          
          console.log(this.journalEntry.entryId)
          console.log(this.journalEntryCollection)

        }
      })
      
      this.navCtrl.pop();*/
    


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
