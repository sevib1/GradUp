import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { Storage } from '@ionic/storage';

//import Providers
import { DatabaseProvider } from '../../providers/database/database';

//import utility class
import { JournalEntry } from '../../UtilityClasses/journalEntry';


@IonicPage()
@Component({
  selector: 'page-journal-entry',
  templateUrl: 'journal-entry.html',
})
export class JournalEntryPage {

  //journal Entry
  journalEntry: JournalEntry;
  journalEntryCollection: JournalEntry[] = []; //[] notwendig?!

  //without db provider
  //entryDate:Date;
  //key:string="date";

  //journalEntry:string;
  //key2:string="JE1" //just for now, there can only be one entry


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public dbp: DatabaseProvider) {
    this.journalEntry = new JournalEntry();

      
     
      
  }


  ionViewWillEnter(){
  
  }

  ionViewDidLoad() {
    console.log("ionHomeViewWillEnter");
    this.dbp.getJournalEntryCollection().then((val) => {
     if(val == null ) {
 
     } else {
       this.journalEntryCollection = val;
     }
    });
    
    
    console.log('ionViewDidLoad JournalEntryPage');

    this.journalEntry = this.navParams.data; //was macht diese funktion?

    this.dbp.getJournalEntryCollection().then((val) => {
      if(val == null){
        //no entry there
      } else{
        this.journalEntryCollection = val;
      }
    });
  }

    // save journal Entry to database
    saveEntry(){
      //this.storage.set(this.key, this.journalEntry);
  
      //this.storage.get(this.key).then((val) => {
        //console.log('Your entry: ', val);
      //});

      console.log(this.journalEntry);
    
      console.log("saveJournalEntry button was clicked")
      this.dbp.getJournalEntryCollection()
      .then((val) => {
        if(val == null) {
          console.log("getJournalEntryCollection -> null")
          this.journalEntryCollection.push(this.journalEntry);
          this.dbp.saveJournalEntry(this.journalEntryCollection);
        } else {
          console.log("get-->" + val);
          this.journalEntryCollection = val;
          this.journalEntryCollection.push(this.journalEntry);
          this.dbp.saveJournalEntry(this.journalEntryCollection);
  
        }
      })
      

      

  
      this.navCtrl.pop();
    }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});
  }

  //kochd1: This codeline below is necessary to display the today's date.
  myDate: any = new Date().toISOString();

  clickMainFAB(){
    console.log("Clicked open menu")
  }

  openCamera(){ //this method will be written in sprint 2

  }

  openGallery(){ //this method will be written in sprint 2

  }

}
