import { Observation, OBSERVATIONSTATUS, CAT_SOCIALHISTORY, registerResource } from '.../../../node_modules/Midata';

@registerResource('code', '85658-3')
export class MyResource extends Observation {

  // you can set here what you want!
  constructor(workOccupation: number) {
      //now you have to create your own coding, which has to be registered on midata
      let code = {
          coding: [
              {
                  system: "http://loinc.org",
                  code: "85658-3",
                  display: "Occupation Type"
              }
          ]
      };

      let valueCodeableConcept = {
        "valueCodeableConcept": {
          "value": workOccupation
        }
      };

      super({effectiveDateTime: new Date().toISOString()},
              OBSERVATIONSTATUS.preliminary,
              CAT_SOCIALHISTORY,
              code);
  }
}