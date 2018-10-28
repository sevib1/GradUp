import { Component } from '@angular/core';

/**
 * Generated class for the TitleLogoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'title-logo',
  templateUrl: 'title-logo.html'
})
export class TitleLogoComponent {

  text: string;

  constructor() {
    console.log('Hello TitleLogoComponent Component');
    this.text = 'Hello World';
  }

}
