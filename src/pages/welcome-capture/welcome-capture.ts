import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomeContactPage } from '../welcome-contact/welcome-contact';
import { Storage } from '@ionic/storage';
import { BodyWeight, Observation } from 'Midata';
import { MidataService } from '../../services/MidataService';
import { NotificationService } from '../../services/notificationService';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import * as Globals from '../../../typings/globals';

/**
 * Generated class for the WelcomeCapturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-capture',
  templateUrl: 'welcome-capture.html',
})
export class WelcomeCapturePage {

  inputtext:string;
  key:string="username";

  information: any[];

  //#MIDATA -> array for the wete, value: number }>; 
  //store the raw data in this array.
  weightData: Array<{date: Date, value: number }>;

  currentWeight;

  constructor(
    public navCtrl: NavController, 
    private http: Http,
    public navParams: NavParams,
    private storage: Storage,
    private midataService: MidataService,
    private notificationService: NotificationService
  ) {
    let localData = http.get('assets/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })

    //#MIDATA
    //this.dailyData = this.navParams.get('data');
    this.weightData = new Array<{ date: Date, value: number }>();
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeCapturePage');

    //#MIDATA -> load the elements
    this.loadData();
  }

  public gotoWelcomeContactPage() {
    this.navCtrl.push(WelcomeContactPage, {});
  }
  
  //saves the data locally and also on MIDATA
  saveData() {
    let MessageDate = new Date();
    this.storage.set(this.key, this.inputtext);
    this.storage.get(this.key).then((val) => {
      console.log('Your username is', val);
    });

    //#MIDATA persistance
    this.midataService.save(new BodyWeight(+this.currentWeight, MessageDate.toISOString()));

    const inSevenDays = new Date(new Date().getTime() + (7 * 24 * 3600 * 1000));
    this.notificationService.schedule({ 
        text: 'Sieben Tage vergangen. Bitte die neuen Daten eingeben <link Eingabemaske>', 
        trigger: {
          at: inSevenDays
        },
        data: 'ENTER_WEIGHT'
    });
  }

  //#MIDATA
  addWeightMeasure(measure: number, date: Date): void {
    /*if (moment().diff(date) >= 0){

    }*/

    //push the data to the array
    this.weightData.push({ date: date, value: measure });
  }

  //#MIDATA: loads the data (FHIR Observations with code "body weight") from the MIDATA server
  private loadData(): void {
    this.midataService.search('Observation/$lastn', { max: 1000, _sort: '-date', code: Globals.BODYWEIGHT.toString, patient: this.midataService.getUser().id })
      .then(response => {
        if( response.length > 0) {


          response.forEach((measure: Observation) => {
            //console.log(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
            this.addWeightMeasure(measure.getProperty('valueQuantity')['value'], measure.getProperty('effectiveDateTime'));
          });
          /* TODO:  to test */
          /* TODO: catch error */
        }
      }
      );
  }

  /*formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }*/ // -> what is "moment"?!

}
