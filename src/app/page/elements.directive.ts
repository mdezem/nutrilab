import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'page-header, page-body, page-aside, page-footer'
})
export class PageElementsDirective {

  constructor() { }

}
