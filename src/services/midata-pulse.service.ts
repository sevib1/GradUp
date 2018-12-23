import { Injectable } from '@angular/core';
import { MidataService } from './MidataService';
import { Observation } from 'Midata';
import * as Globals from '../../typings/globals';

export class Pulse {
  value: number;
  secondsAgo: number;
}

@Injectable()
export class MidataPulseService {

  constructor(
    private midataService: MidataService,
  ) { }

  public getPulse(max: number = 10): Promise<Array<Pulse>> {
    return new Promise<Array<Pulse>>((resolve, reject) => {
      console.log(`MidataPulseService.getPulse() : loading ${max} items`);

      this.midataService.search(
        'Observation/$lastn', {
          max: max,
          _sort: '-date',
          code: Globals.HEARTRATE.toString,
          patient: this.midataService.getUser().id
        })
        .then(response => {
          var items = [];

          if (response.length > 0) {
            response.forEach((measure: Observation) => {

              // resource: {resourceType: "Observation", id: "5c03c2eabcbc8713949a6f28", meta: {,…}, status: "preliminary",…}
              // category: [{,…}]
              // code: {coding: [{system: "http://loinc.org", code: "8867-4", display: "Heart rate"}], text: "Heart rate"}
              // effectiveDateTime: "2018-12-02T11:32:57.907Z"
              // id: "5c03c2eabcbc8713949a6f28"
              // meta: {,…}
              // resourceType: "Observation"
              // status: "preliminary"
              // subject: {reference: "Patient/5be2ed89bcbc87220728f494", display: "Sandra Burri"}
              // valueQuantity: {value: 66, unit: "bpm", system: "https://www.hl7.org/fhir/valueset-ucum-common.html",…}
              // code: "{beats}/min"
              // system: "https://www.hl7.org/fhir/valueset-ucum-common.html"
              // unit: "bpm"
              // value: 66

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

          console.log(`MidataPulseService.getPulse() : loaded ${items.length} items`);
          resolve(items);

        }).catch(() => {
          reject();
        });
    });
  }

}
