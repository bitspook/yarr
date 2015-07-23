import {Observable} from 'rx';

import {toArray} from './utils';


let body = document.body;

let clicks_ = Observable.fromEvent(body, 'click');


let clicksByClass_ = (className) => clicks_
      .filter(e => {
        let classes = toArray(e.target.classList);

        return classes.indexOf(className) >= 0;
      });


export {clicksByClass_};
