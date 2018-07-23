import { Component, Output, EventEmitter } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  @Output() newEvent: any = new EventEmitter<any>();

  newBreakpoint = '(min-width: 1440px) and (max-width: 1600px)';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(this.newBreakpoint)
    .pipe(
      map(result => {
        return result.matches;
      })
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log(this.breakpointObserver);
    console.log(Breakpoints);
  }

  onClickNewEvent() {
    this.newEvent.emit(true);
  }
}
