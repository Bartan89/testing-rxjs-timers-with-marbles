import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { first, last, map, tap, toArray } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture : ComponentFixture<AppComponent>
  let app: ComponentFixture<AppComponent>['componentInstance']
  let testScheduler: TestScheduler

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toStrictEqual(expected);
    });
  }));


it('a timer should start at 0', () => {
  testScheduler.run((helpers) => {
    const { expectObservable } = helpers;

    const expected = '(a|)'

    expectObservable(app.clock$.pipe(first())).toBe(expected, { a : 0 });
  });
});

it('a timer should after 60 seconds have emited 60 times', () => {
  testScheduler.run((helpers) => {
    const { expectObservable } = helpers;

    const expected = '59000ms (a|)'

    expectObservable(app.clock$.pipe(toArray(), map(el => el.length))).toBe(expected, {
      a: 60
    });
  });
  testScheduler.flush
});

it('a timer should at the 60th second emit a value of 59', () => {

  jest
    .useFakeTimers()
    .setSystemTime(new Date('1989-04-05'));

  testScheduler.run((helpers) => {
    const { expectObservable } = helpers;

    const expected = '59000ms (a|)'

    expectObservable(app.clock$.pipe(
      tap(() => jest.advanceTimersByTime(1000)),
      last()
    )).toBe(expected, {
      a: 59
    });
  });
});

afterEach(() => {
  testScheduler.flush()
  fixture.destroy()
})

});
