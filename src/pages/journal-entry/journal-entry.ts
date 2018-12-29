import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { Camera, CameraOptions } from '@ionic-native/camera';

//import Providers
import { DatabaseProvider } from '../../providers/database/database';
//import { PhotoProvider } from '../../providers/photo/photo';

//MIDATA imports
import { MidataService } from '../../services/MidataService';
import { Observation } from 'Midata';
import { ObsMentalCondition } from '../../resources/subjectiveCondition';


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
   */
  journalEntry: JournalEntry;

  /**
   * collection of journal entries
   */
  journalEntryCollection: JournalEntry[] = [];

  journalDeletePage : JournalDeletePage;

  /**
   * variable which stores the user input concerning the subj. condition.
   */
  subjectiveCondition: number;

  /**
   * #MIDATA -> array for the weight data 
     store the raw data in this array.
   */
  subjectiveConditionData: Array<{date: Date, value: number }>;

  /**
   * variable to store the image data
   */
  myPhoto:any;


  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private midataService: MidataService,
    public dbp: DatabaseProvider,
    private camera: Camera,
    public events: Events) {
    this.journalEntry = new JournalEntry(); //without this, the page will throw a "Uncaught (in promise): TypeError"

    //#MIDATA
    this.subjectiveConditionData = new Array<{ date: Date, value: number }>();
  
  }

  /**
   * 
   * Runs when the page is about to enter and become the active page.
   */
  ionViewWillEnter(){
    console.log("willEnter journalEntryPage");
    
    //this.journalEntryId = this.navParams.data; //-> fetches data from "journal-deletePage" --> do not delete!, otherwise delete won't work properly
   
    this.journalEntry = this.navParams.data;

    //#MIDATA -> load the elements
    this.loadData();
    
  }

  /**
   * Adds subjective condition from user input to the resp. global variable.
   * @param value 
   */
  addSubjConditionInput(value: number){
    this.subjectiveCondition = value;
  }

  //Runs when the page has loaded.
  ionViewDidLoad() {

    this.loadData();
    /*console.log('ionViewDidLoad JournalEntryPage');
    this.dbp.getJournalEntryCollection().then((val) => {
     if(val == null ) {
        //no entry there
     } else {
       this.journalEntryCollection = val;
     }
    });*/

    //this.journalEntry = this.navParams.data; //-> fetches data from "journal-deletePage"
    
    
  }

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
            this.navCtrl.push(JournalPage);
          });
      });
    
      let mentalCondition = new ObsMentalCondition(this.subjectiveCondition);
      this.midataService.save(mentalCondition)
      .then((response) => {
        // we can now access the midata response
        console.log("ObsMentalCondition fired on MIDATA");
      
  
      }).catch((error) => {
          console.error("Error in save request:", error);
      });

      console.log("mental condition: " + mentalCondition);

    //this.addMentalCondition();
    //console.log("addMentalCondition is called");
      
    }

    /**
   * #MIDATA: loads the data (FHIR Observations with code "subjective-condition") from the MIDATA server
   */
  private loadData(): void {
    this.midataService.search('Observation/$lastn', { max: 1000, _sort: '-date', code: "subjective-condition", patient: this.midataService.getUser().id })
      .then(response => {
        if( response.length > 0) {
          response.forEach((measure: Observation) => {
            //console.log(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
            this.addSubjectiveCondition(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
          });
          /* TODO:  to test */
          /* TODO: catch error */
        }
      }
      );

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
    
    }

 /**
   * #MIDATA: add the weight values to the weightData array.
   * 
   * @param measure 
   * @param date 
   */
  addSubjectiveCondition(measure: number, date: Date): void {
    /*if (moment().diff(date) >= 0){ 
    }*/

    //push the data to the array
    this.subjectiveConditionData.push({ date: date, value: measure });
  }

  public gotoJournalPage() {
    this.navCtrl.push(JournalPage, {});

    for (let entry of this.subjectiveConditionData){
      console.log(entry);
    }
  }


  clickMainFAB(){
    console.log("Clicked open menu")
  }

  getImage(){

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,//this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpg;base64,' + imageData; // 'data:image/jpeg;base64,'
    }, (err) => {
     // Handle error
    });

  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,//this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpg;base64,' + imageData; // 'data:image/jpeg;base64,'
    }, (err) => {
     // Handle error
    });
  }

}
