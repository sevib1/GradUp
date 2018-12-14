import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, App } from 'ionic-angular';
import { ProfileImpressumPage } from '../profile-impressum/profile-impressum';
import { ProfilePrivacyPage } from '../profile-privacy/profile-privacy';
import { ProfileTermsPage } from '../profile-terms/profile-terms';
import { ProfileCustomizePage } from '../profile-customize/profile-customize';
import { ProfileCustomizecontactsPage } from '../profile-customizecontacts/profile-customizecontacts';
import { ProfileBiovotionPage } from '../profile-biovotion/profile-biovotion';
import { ProfileAccessrightsPage } from '../profile-accessrights/profile-accessrights';
import { JournalPage } from '../journal/journal';
import { MidataService } from '../../services/MidataService';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  nextPage: Page;

  constructor(
    public app: App,
    private midataService: MidataService,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.nextPage = JournalPage;
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

  public gotoProfileAccessrightsPage() {
    this.navCtrl.push(ProfileAccessrightsPage, {});
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

  // Logout
  logout() {
    this.midataService.logout()
      .then(() => {
        this.menuCtrl.close();
        this.app.getRootNav().setRoot(JournalPage);

      })
      .catch(() => {
        this.app.getRootNav().setRoot(JournalPage);
      })
  }

  // Login
  public goNext() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().catch();

    this.midataService.authenticate()
      .then((success: boolean) => {
        return this.navCtrl.setRoot(this.nextPage)
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

}