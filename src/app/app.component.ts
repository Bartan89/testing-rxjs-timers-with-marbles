import { Component } from '@angular/core';
import { EMPTY, NEVER, animationFrameScheduler, asapScheduler, asyncScheduler, concatMap, defer, delay, endWith, expand, filter, from, interval, last, map, of, queueScheduler, range, repeat, startWith, switchMap, take, takeWhile, tap, timer } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // clock$ = timer(0, 1000).pipe(
  //   take(60),
  // )

  // clock$ = interval(1000).pipe(
  //   map(e => e + 1),
  //   startWith(0),
  //   take(60),
  // )

  // clock$ = range(0, 59).pipe(
  //   concatMap((nr) => of(nr).pipe(delay(1000))),
  //   map(c => c + 1),
  //   startWith(0),
  // )

  // clock$ = of(0).pipe(
  //     expand((s) => of(s + 1).pipe(delay(1000))),
  //     take(60),
  // )


  clock$ = defer(() => {
    const dateThen = Date.now()
    return of(null).pipe(
      delay(1000),
      map(() => Math.floor((Date.now() - dateThen) / 1000)),
      repeat(59),
      startWith(0),
    )
  })
}


