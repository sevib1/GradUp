import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, App } from 'ionic-angular';
import { ProfileImpressumPage } from '../profile-impressum/profile-impressum';
import { ProfilePrivacyPage } from '../profile-privacy/profile-privacy';
import { ProfileTermsPage } from '../profile-terms/profile-terms';
import { ProfileCustomizePage } from '../profile-customize/profile-customize';
import { ProfileCustomizecontactsPage } from '../profile-customizecontacts/profile-customizecontacts';
import { ProfileBiovotionPage } from '../profile-biovotion/profile-biovotion';
import { JournalPage } from '../journal/journal';
import { Storage } from '@ionic/storage';
import { MidataService } from '../../services/MidataService';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

   /**
   * Indicates, if the Biovotion Everion Sensor is connected to GradUp.
   * Default -> false
   */
  isConnectedToSensor: boolean = false;

    /**
   * key for local storage of isConnectedToSensor value
   */
  key_sensor:string="isConnectedToSensor";

  constructor(
    public app: App,
    private midataService: MidataService,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private storage: Storage
  ) {}

  ionViewWillEnter(){

    this.storage.get(this.key_sensor).then((value) => {
      this.isConnectedToSensor = value;
      console.log('profile.ts ionViewWillEnter() -> isConnectedToSensor?:', value);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  public gotoProfileCustomizePage() {
    this.navCtrl.push(ProfileCustomizePage, {});
  }

  public gotoProfileCustomizecontactsPage() {
    this.navCtrl.push(ProfileCustomizecontactsPage, {});
  }

  public gotoProfileBiovotionPage() {
    this.navCtrl.push(ProfileBiovotionPage, {});
  }

  public gotoProfileImpressumPage() {
    this.navCtrl.push(ProfileImpressumPage, {});
  }

  public gotoProfilePrivacyPage() {
    this.navCtrl.push(ProfilePrivacyPage, {});
  }

  public gotoProfileTermsPage() {
    this.navCtrl.push(ProfileTermsPage, {});
  }

  public isLoggedIn(): boolean {
    const user = this.midataService.getUser();
    const result = user && (parseInt(user.id) > 0);
    return result;
  }

  public checkSensorConnection(): boolean {

    return this.isConnectedToSensor; //true, if connected
  }

  // Logout
  public logout() {
    this.midataService.logout()
      .then(() => {
        this.menuCtrl.close();
        this.selectJournalPage();
      })
      .catch(() => {
        this.selectJournalPage();
      })
  }

  // Login
  public login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().catch();

    this.midataService.authenticate()
      .then((success: boolean) => {
        this.selectJournalPage();
      })
      .then(() => {
        loading.dismiss().catch();
      })
      .catch((error) => {
        console.log(error);
        console.log(this.midataService.getNetworkState());
        loading.dismiss().catch();
      })
  }

  public selectJournalPage() {
    // select JournalPage (tab 0 of tab page)
    //return this.navCtrl.setRoot(JournalPage);
    return this.navCtrl.parent.select(0);
  }

}