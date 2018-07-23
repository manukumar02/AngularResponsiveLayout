import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() outputExampleEmit: any = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onClickEvent() {
    this.outputExampleEmit.emit(true);
  }
}
