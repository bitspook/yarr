import {Observable} from 'rx';
import {ajax} from 'jQuery';

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//convert a js array to Observable
let nums_ = Observable.from(nums);

//Let's filter out odd numbers from `nums_` and find evens_.
let evens_ = nums_
      .filter(n => n % 2 === 0);

//Observable don't execute any code in the chain until and unless there is at
//least one active subscription to the Observable.
evens_
  .subscribe(x => console.log('Even: ', x));


//Promises in Observables
let urls = [
  'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=test'
];

Observable
  .from(urls)
  .flatMap(url => ajax({url, dataType: 'jsonp'}))
  .subscribe(
    res => console.log('Response: ', res),
    err => console.error('Error while fetching:', err),
    () => console.log('Done with all requests')
  );

//Observable.merge
Observable
  .interval(1000)
  .merge(
    Observable.interval(2000)
  )
//  .subscribe(x => console.log('Merged: ', x));

//Observable.combineLatest
let resize_ = Observable.fromEvent(window, 'resize');
let click_ = Observable.fromEvent(window, 'click');

Observable
  .combineLatest(
    resize_.startWith(null),
    click_.startWith(null),
    (rE, cE) => {
      return 'Lol!';
    }
  )
  .subscribe(
    x => console.log('Window resized or clicked', x)
  );

//Observable.prototype.zip
let evenObs_ = Observable.from([0, 2, 4, 6, 8, 10]);
let oddObs_ = Observable.from([1, 3, 5, 7, 9]);

evenObs_
  .zip(
    oddObs_,
    (even, odd) => even + odd
  )
  .subscribe(x => console.log('Even+Odd: ', x));
