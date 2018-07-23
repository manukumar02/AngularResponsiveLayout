import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  onClickEvent() {}
  outputExampleEmit(event) {
    console.log(event);
  }

  outputExampleNewEmit(event) {
    console.log('New Click', event);
  }
}
