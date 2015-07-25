import {Observable} from 'rx';

import {toArray} from './utils';


let body = document.body;

let clicks_ = Observable.fromEvent(body, 'click').share();

let filterClassName = (className, e) => {
  let classes = toArray(e.target.classList);
  return classes.indexOf(className) >= 0;
};

let clicksByClass_ = (className) => clicks_
      .filter(e => filterClassName(className, e));

let keyups_ = Observable.fromEvent(body, 'keyup').share();

let keyupsByClass_ = (className) =>
      keyups_
      .filter(e => filterClassName(className, e));

export {clicksByClass_, keyupsByClass_};
