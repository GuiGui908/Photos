import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-title',
  template: `
    <div class="title">
      <h1>
        <i class="material-icons back" (click)="back()">arrow_back</i>
        {{title}}
        <span class="badge badge-secondary">{{subTitle}}</span>
      </h1>
    </div>
  `,
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() backRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('--------- Create TitleComponent');
  }

  ngOnInit() {
    console.log('----- Init TitleComponent');
  }

  back() {
    this.router.navigate([this.backRoute], { relativeTo: this.route });
  }

}
