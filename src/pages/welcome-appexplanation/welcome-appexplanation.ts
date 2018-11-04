import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WelcomeConnect2Page } from '../welcome-connect2/welcome-connect2';
import { MidataService } from '../../services/MidataService';
import { TabsPage } from '../tabs/tabs';
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

        // developer@midodoku.ch
        // Test1234

        // var data = this.midataService.getConnection();
        // data.login('developer@midodoku.ch', 'Test1234')
        //     .then((result) => {
        //         console.log(result);
        //         loading.dismiss().catch();
        //         return this.navCtrl.setRoot(this.nextPage);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // return;

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
