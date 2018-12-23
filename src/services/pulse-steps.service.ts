import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { MidataPulseService, Pulse } from './midata-pulse.service';
import { MidataStepsService, Step } from './midata-steps.service';

@Injectable()
export class PulseStepsService {

  

  steps: any;
  heartrate: any;
  userName: any;

  constructor(
    private notificationService: NotificationService,
    private pulseService: MidataPulseService,
    private stepsService: MidataStepsService
  ) { }

  public schedule() {
    console.log("PulseStepsService.schedule() : entering...");

    setInterval(() => {
      console.log("PulseStepsService.schedule() : triggered...");
      this.calculate();
    }, 30000);
  }

  public calculate() {
    const fiveMinutes = 5 * 60;
    const threeMinutes = 3 * 60;

    var loaders = [
      this.pulseService.getPulse(fiveMinutes), 
      this.stepsService.getSteps(fiveMinutes)
    ];

    // test scenarios...
    // TODO: set to null/empty to load actual data from midata.
    let scenario: string = "";
    switch (scenario) {
      case "Positive":
        loaders = [this.getElevatedPulse(), this.getPositiveSteps()]
        break;
      case "Negative":
        loaders = [this.getElevatedPulse(), this.getNegativeSteps()]
        break;
      case "Idle":
        loaders = [this.getNormalPulse(), this.getNegativeSteps()]
        break;
    }    

    Promise.all(loaders).then(([pulseItems, stepItems]) => {

      const averagePulse5 = this.getAveragePulse(pulseItems, fiveMinutes);
      const averageSteps5 = this.getAverageSteps(stepItems, fiveMinutes);
      console.log(`PulseStepsService.calculate() : 5 minutes avg. pulse:=${averagePulse5}, steps:=${averageSteps5}`);

      const averagePulse3 = this.getAveragePulse(pulseItems, threeMinutes);
      const averageSteps3 = this.getAverageSteps(stepItems, threeMinutes);
      console.log(`PulseStepsService.calculate() : 3 minutes avg. pulse:=${averagePulse3}, steps:=${averageSteps3}`);

      if (averagePulse5 >= 70 && averageSteps5 >= 60) {
        this.notificationService.showNegativeHeartRate();

      } else if (averagePulse3 >= 70 && averageSteps3 <= 20) {
        this.notificationService.showPositiveHeartRate();

      } else {
        // do nothing...
      }
    });
  }

  public getAverageSteps(items: Step[], maxSeconds: number): number {
    if (!items || items.length == 0) {
      return 0;
    }

    let count = 0;
    let sum = 0;
    items.forEach(item => {
      if (item.secondsAgo <= maxSeconds) {
        sum += item.value;
        count++;
      }
    });

    let average = sum / count;
    average = average === NaN ? 0 : average

    return average;
  }

  public getAveragePulse(items: Pulse[], maxSeconds: number): number {
    if (!items || items.length == 0) {
      return 0;
    }

    let count = 0; 
    let sum = 0;
    items.forEach(item => {
      if (item.secondsAgo <= maxSeconds) {
        sum += item.value;
        count++;
      }
    });

    let average = sum / count;
    average = average === NaN ? 0 : average

    return average;
  }

  private getNegativeSteps() {
    return new Promise<Array<Step>>((resolve, reject) => {
      const items = [
        { value: 80, secondsAgo: 0 },
        { value: 81, secondsAgo: 1 },
        { value: 82, secondsAgo: 2 },
        { value: 80, secondsAgo: 3 },
        { value: 78, secondsAgo: 4 },
        { value: 80, secondsAgo: 5 },
        { value: 80, secondsAgo: 6 },
        { value: 83, secondsAgo: 7 },
        { value: 80, secondsAgo: 8 },
        { value: 85, secondsAgo: 9 },
        { value: 80, secondsAgo: 10 }
      ];

      resolve(items);
    });
  }

  private getPositiveSteps() {
    return new Promise<Array<Step>>((resolve, reject) => {
      const items = [
        { value: 10, secondsAgo: 0 },
        { value: 10, secondsAgo: 1 },
        { value: 10, secondsAgo: 2 },
        { value: 11, secondsAgo: 3 },
        { value: 10, secondsAgo: 4 },
        { value: 11, secondsAgo: 5 },
        { value: 12, secondsAgo: 6 },
        { value: 10, secondsAgo: 7 },
        { value: 11, secondsAgo: 8 },
        { value: 11, secondsAgo: 9 },
        { value: 11, secondsAgo: 10 }
      ];

      resolve(items);
    });
  }

  private getElevatedPulse() {
    return new Promise<Array<Pulse>>((resolve, reject) => {
      const items = [
        { value: 80, secondsAgo: 0 },
        { value: 81, secondsAgo: 1 },
        { value: 81, secondsAgo: 2 },
        { value: 80, secondsAgo: 3 },
        { value: 84, secondsAgo: 4 },
        { value: 80, secondsAgo: 5 },
        { value: 85, secondsAgo: 6 },
        { value: 80, secondsAgo: 7 },
        { value: 78, secondsAgo: 8 },
        { value: 78, secondsAgo: 9 },
        { value: 80, secondsAgo: 10 }
      ];

      resolve(items);
    });
  }

  private getNormalPulse() {
    return new Promise<Array<Pulse>>((resolve, reject) => {
      const items = [
        { value: 60, secondsAgo: 0 },
        { value: 61, secondsAgo: 1 },
        { value: 61, secondsAgo: 2 },
        { value: 60, secondsAgo: 3 },
        { value: 64, secondsAgo: 4 },
        { value: 60, secondsAgo: 5 },
        { value: 65, secondsAgo: 6 },
        { value: 60, secondsAgo: 7 },
        { value: 68, secondsAgo: 8 },
        { value: 68, secondsAgo: 9 },
        { value: 60, secondsAgo: 10 }
      ];

      resolve(items);
    });
  }

  
}
