import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BiovotionConnector, BiovotionSensor, BatteryInformation, SensorDataType, SensorDataEntry, SENSORDATATYPE } from '@ionic-native/biovotion-connector';
import { MidataService } from '../../services/MidataService';
import { HeartRate, StepsCount } from 'Midata';

/**
 * Generated class for the WelcomeConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-connect',
  templateUrl: 'welcome-connect.html',
})
export class WelcomeConnectPage {

  sensor1: BiovotionSensor;
  isConnectedToSensor: boolean = false;

  isToggled: boolean;

  /**
   * not in use at the moment
   * Stores the current heart rate.
   */
  currentHeartRate: number;

  /**
   * not in use at the moment
   * amount of steps during 10 seconds
   */
  amountOfSteps: number ;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private biovotion: BiovotionConnector,
    private midataService: MidataService) {

    // set toggle to isConnectedToSensor
    //this.biovotion.isConnected().then((connectionState: boolean) => {
      
    //}) ;
    
    this.currentHeartRate = -1;
    this.amountOfSteps = -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeConnectPage');
  }

  /**
   * Handles the sensor connection
   * calls connectSensor(), if isConnectedToSensor == false
   * otherwise calls disconnectSensor()
   */
  handleSensorConnection() {
    if(this.isConnectedToSensor) {
      console.log("about to disconnect from sensor...");
      this.disconnectSensor();

    } else {
      console.log("about to connect to sensor...");
      this.connectSensor(); //false -> connect
    }
  }

  /**
   * Connects to sensor after toggle change and then navigates to tabsPage.
   */
  connectSensor() {

    this.biovotion.scan().subscribe((sensor: BiovotionSensor) => {
      this.sensor1 = sensor;
       // for now we only want to connect with this specific sensor
       if (this.sensor1.address == "FE:10:32:95:6C:08") {
        this.biovotion.connect(this.sensor1).then(() => {
          this.isConnectedToSensor = true;
          console.log("sensor connected: " + this.isConnectedToSensor);
          this.isToggled = true;

          let dataToRequest: SENSORDATATYPE[] = [];
          dataToRequest.push(SENSORDATATYPE.heartRate);
          dataToRequest.push(SENSORDATATYPE.steps);

          this.biovotion.readLiveData(dataToRequest)
          .subscribe((liveData: SensorDataEntry) => {
            console.log(liveData.heartRate.value);
            var heartRate = Number(liveData.heartRate.value); //Midata -> only for first test


            console.log(liveData.steps.value);
            var amountOfSteps = Number(liveData.steps.value); //Midata -> only for first test

            this.saveHeartRateValueToMidata(heartRate);
           this.saveStepAmountToMidata(amountOfSteps);
            

          });

          

          this.navCtrl.push(TabsPage, {});
        }).catch(error => {
          console.log("Error: " + error);
        });

          //this.measureData();

      }

 
    },(error) => { console.log(error) });
      
     
    
   //this.navCtrl.push(TabsPage, {});
  }

  measureData(){
    console.log("about to measure data...")

    

  }

  /**
   * Disconnects the Sensor after toggle change.
   */
  disconnectSensor(){

    this.biovotion.disconnect().then(() => {
      this.isConnectedToSensor = false;
      console.log('sensor disconnected' + this.isConnectedToSensor);
       }).catch(error => {
      console.log("Error: " + error);
       });

  }

  /**
   * save a new heart rate value to Midata.
   * 
   * @param heartRate 
   */
  saveHeartRateValueToMidata(heartRate: number){ //any -> provisoric
    let MessageDate = new Date();
    
     //#MIDATA persistance
     this.midataService.save(new HeartRate(heartRate, MessageDate.toISOString()));
  }

  /**
   * save a new amount of steps to Midata.
   * 
   * @param amountOfSteps 
   */
  saveStepAmountToMidata(amountOfSteps: number){
    let MessageDate = new Date();
    
    //#MIDATA persistance
    this.midataService.save(new StepsCount(amountOfSteps, MessageDate.toISOString()));
  }


  public gotoTabsPage() {
    this.navCtrl.push(TabsPage, {});
  }

}
