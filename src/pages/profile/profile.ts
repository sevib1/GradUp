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

  constructor(
    public app: App,
    private midataService: MidataService,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {}

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

  public isLoggedIn(): boolean {
    const user = this.midataService.getUser();
    const result = user && (parseInt(user.id) > 0);
    return result;
  }

  // Logout
  public logout() {
    this.midataService.logout()
      .then(() => {
        this.menuCtrl.close();
        this.navCtrl.push(JournalPage, {});
      })
      .catch(() => {
        this.navCtrl.push(JournalPage, {});
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
        return this.navCtrl.setRoot(JournalPage);
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