import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  template: '<p></p>'
})
export class BaseComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(){
    this.isAlive = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  protected isAlive: boolean = true;

}
