import { registerResource, Resource } from '.../../../node_modules/Midata';
//import { GoalStatus, GOALSTATUS } from 'Midata/dist/src/resources/basicTypes';

@registerResource('resourceType', 'Goal')
export class Goal extends Resource {

// Implement a constructor
// Check the hl7 fhir documentation of the resource
// to find out the required fields of the resource.
// It's recommended that you define these already in the constructor
// so there will be no way to save a resource without the required stuff
constructor(goal: number) {

            // call the super constructor for the definition of the resource type (as string)
            super('Goal');

            let target = this.addGoal(goal);
            console.log(target);

            let description = this.getDescription();
            console.log(description);

            let category = this.getCategory();
            console.log(category);
             // now we can also add the default/requered properties to the resource
            this.addProperty('status', 'planned');  //GOALSTATUS.planned);
            this.addProperty('category', category);
            this.addProperty('description', description);
            this.addProperty('date', new Date().toISOString());
            this.addProperty('target', target);

    }

    //Ein Wert vom Benutzer persistiert wird. Im GUI wird regelt, im welchen Bereich, dass der Benutzer sein Wochenfortschritt eingeben soll.
    //Daher muss man nicht zusätzlich im JSON angeben, mit detailRange -> low and high value
    addGoal(value: number) {
        let measure = {
        "measure": {
            "coding": [
              {
                "system": "http://loinc.org",
                "display": "Body Weight",
                "code": "3141-9"
              }
            ]
          },
          "detailQuantity": {
            "value" : value, 
            "unit" : "g"
          }
          }
        this.addProperty('measure', measure);
        return measure;
    }

    getCategory() {
        return {
            "coding": [
              {
                "system": "http://hl7.org/fhir/goal-category",
                "display": "Dietary",
                "code": "dietary"
              }
            ]
          }
    }

    getDescription() {
        return {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "8943002",
                "display": "Weight gain"
              }
            ]
          }
    }
}