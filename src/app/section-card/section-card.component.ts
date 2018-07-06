import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {
  @Input() cardTitle: string;

  constructor() {}

  ngOnInit() {}
}
