import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() display: string;
  @Input() themeClass = 'default-light-theme';

  constructor() {}

  ngOnInit() {}
}
