import { Component, OnInit } from '@angular/core';
import {interval, Subject, fromEvent, Observable, pipe,} from 'rxjs';
import { bufferTime, debounce, debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { buffer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  date: any = new Date(0);
  currentTimer: any = new Date(0);

  key: boolean = false;

  unsubscribe$: any
  timer$: any

  click$ = new Subject();

  doubleClick$ = this.click$.pipe(
    buffer(
      this.click$.pipe(debounceTime(500))
    ),
    map(list => {
      return list.length;
    }),
    filter((x) =>{ 
      if(x==2){
        this.key = !this.key;
      }
      return  x === 2; 
    })
  )


 

  constructor (){ }

  ngOnInit():void {}




  onStartStop(){
    if(!this.key){
    this.unsubscribe$ = new Subject();
    this.timer$ = interval(1000)
    .pipe(takeUntil(this.unsubscribe$), takeUntil(this.doubleClick$))
    .subscribe(()=>
    {this.currentTimer = this.date.setSeconds(this.date.getSeconds() + 1);});
    this.key = !this.key;
    }
    else{
      this.key = !this.key;
      this.unsubscribe$.next(this.currentTimer = this.date = new Date(0))
      this.unsubscribe$.complete();
    }
    
  }
  

  onWait(){  
    this.click$.next(true);
  }


  onReset(){
    this.currentTimer = this.date = new Date(0);
  }



}
