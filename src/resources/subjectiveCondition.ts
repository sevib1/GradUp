import { Observation, OBSERVATIONSTATUS, CAT_SURVEY, registerResource} from '.../../../node_modules/Midata';
//import { ObservationEffective, ObservationStatus, Resource, registerResource} from '.../../../node_modules/Midata';

@registerResource('code', 'subjective-condition')
export class ObsMentalCondition extends Observation {

// Implement a constructor
// Check the hl7 fhir documentation of the resource
// to find out the required fields of the resource.
// It's recommended that you define these already in the constructor
// so there will be no way to save a resource without the required stuff

constructor(mentalCondition: number) { 
  
  /*effectiveType: ObservationEffective,
  status: ObservationStatus,
  category: fhir.CodeableConcept
  code: fhir.CodeableConcept*/

            let code = {
              coding: [
                  {
                    "system" : "http://midata.coop",
                    "code" : "subjective-condition",
                    "display" : "subjective condition"
                  }
                ]
              };

            let valueQuantity = {
              "valueQuantity": {
                "value" : mentalCondition
              }
            };

            //super('Observation');

            // call the super constructor for the definition of the resource type (as string)
            super({effectiveDateTime: new Date().toISOString()},
            OBSERVATIONSTATUS.preliminary,
            CAT_SURVEY,
            code, valueQuantity);

            //code  = this.addMentalCondition(mentalCondition); //was originally "let code"
            //console.log(code);

            //let description = this.getDescription();
            //console.log(description);

            //let category = this.getCategory(); //was originally "let category"
            //console.log(category);
             // now we can also add the default/requered properties to the resource
             
             //this.addProperty('effectiveDateTime', effectiveType); //.effectiveDateTime -> generierte Fehler
             //this.addProperty('status', 'preliminary');
             //this.addProperty('category', category);
             //this.addProperty('description', description);
             //this.addProperty('date', new Date().toISOString());
             //this.addProperty('code', code);

    }

    addMentalCondition(value: number) {
        let code = {
        "code": {
            "coding": [
              {
                "system" : "http://midata.coop",
                "code" : "subjective-condition",
                "display" : "subjective condition"
              }
            ]
          },
          "valueQuantity": {
            "value" : value
          }
        }
        //this.addProperty('code', code); //nötig?!
        return code;
    }

    getCategory() {
        return {
            "coding": [
              {
                "system": "http://hl7.org/fhir/observation-category",
                "display": "Survey",
                "code": "survey"
              }
            ]
          }
    }

    getDescription() {
        return {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "405152002",
                "display": "Quality of life satisfaction"
              }
            ]
          }
    }
}