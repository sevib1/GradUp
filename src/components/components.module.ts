import { NgModule } from '@angular/core';
import { TestComponent } from './test/test';
import { AccordionListComponent } from './accordion-list/accordion-list';
@NgModule({
	declarations: [TestComponent,
    AccordionListComponent],
	imports: [],
	exports: [TestComponent,
    AccordionListComponent]
})
export class ComponentsModule {}
