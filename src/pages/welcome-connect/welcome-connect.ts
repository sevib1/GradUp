import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { BiovotionConnector, BiovotionSensor, BatteryInformation, SensorDataType, SensorDataEntry, SENSORDATATYPE } from '@ionic-native/biovotion-connector';


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
  isConnectedToSensor: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private biovotion: BiovotionConnector) {
    this.isConnectedToSensor = false;
  }

  handleSensorConnection() {
    if (this.isConnectedToSensor) {
      // TODO disconnect()
    } else {
      this.connectToSensor();
    }
  }

  /**
   * Connects to sensor and then navigates to taps page
   */
  connectToSensor() {

    this.biovotion.scan()
    .subscribe((sensor: BiovotionSensor) => {
      this.sensor1 = sensor;
      
      // for now we only want to connect with this specific sensor
      if (this.sensor1.address == "E2:CD:59:08:72:C1") {
        this.biovotion.connect(this.sensor1).then(() => {
          //TODO erst jetzt sollte toggle wirklich den status ändern weil verbindung erfolgreich war
          console.log("juhuu wird sind verbunden");

          let dataToRequest: SENSORDATATYPE[] = [];
          dataToRequest.push(SENSORDATATYPE.heartRate);
          this.biovotion.readLiveData(dataToRequest)
          .subscribe((liveData: SensorDataEntry) => {
            console.log(liveData.heartRate.value);
          });
          this.navCtrl.push(TabsPage, {});
        }).catch(error => {
          console.log("Error: " + error);
        });
      }
    },(error) => { console.log(error) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeConnectPage');
  }

  
  public gotoTabsPage() {
    this.navCtrl.push(TabsPage, {});
  }

}
