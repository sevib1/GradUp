import { Injectable } from '@angular/core';
import { MidataService } from './MidataService';
import { Observation } from 'Midata';
import * as Globals from '../../typings/globals';

export class Step {
  value: number;
  secondsAgo: number;
}

@Injectable()
export class MidataStepsService {

  constructor(
    private midataService: MidataService,
  ) { }

  public getSteps(max: number = 10): Promise<Array<Step>> {
    return new Promise<Array<Step>>((resolve, reject) => {
      console.log(`MidataStepsService.getSteps() : loading ${max} items`);

      this.midataService.search(
        'Observation/$lastn', {
          max: max,
          _sort: '-date',
          code: Globals.STEPS.toString,
          patient: this.midataService.getUser().id
        })
        .then(response => {
          var items = [];

          if (response.length > 0) {
            response.forEach((measure: Observation) => {
              
              let valueQuantity = measure.getProperty('valueQuantity');
              let value = parseInt(valueQuantity['value']);

              let effectiveDateTime = measure.getProperty("effectiveDateTime");
              var difference = new Date().getTime() - new Date(effectiveDateTime).getTime();
              var secondsAgo = difference / 1000;

              items.push({
                value,
                secondsAgo
              });
            });
          }

          console.log(`MidataStepsService.getSteps() : loaded ${items.length} items`);
          resolve(items);

        }).catch(() => {
          reject();
        });
    });
  }

}
