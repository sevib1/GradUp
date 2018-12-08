import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';
import { CardContent } from 'ionic-angular';

/**
 * Generated class for the AccordionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion-list',
  templateUrl: 'accordion-list.html'
})
export class AccordionListComponent implements OnInit {

  accordionExpanded = false;
  @ViewChild("cc") cardContent: any;
  @Input('title') title: string;

  icon: string = "ios-arrow-down";

  constructor(public renderer: Renderer) {
  }

  ngOnInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }

  toggleAccordion() {
    if(this.accordionExpanded){
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
  }

}
