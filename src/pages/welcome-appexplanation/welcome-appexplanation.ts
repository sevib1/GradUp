import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MidataService } from '../../services/MidataService';
import { WelcomeCapturePage } from '../welcome-capture/welcome-capture';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

@IonicPage()
@Component({
    selector: 'page-welcome-appexplanation',
    templateUrl: 'welcome-appexplanation.html',
})
export class WelcomeAppexplanationPage {
    
    nextPage: Page;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private midataService: MidataService
    ) {
        this.nextPage = WelcomeCapturePage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomeAppexplanationPage');
    }

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
