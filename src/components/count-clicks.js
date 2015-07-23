import h from 'virtual-dom/h';
import {Observable} from 'rx';

import {clicksByClass_} from '../events';

let view = (count) =>
    <div className="count-clicks">
      <button className="count-clicks-btn">Click me!</button>
      <span> {count}</span>
    </div>;

let render_ = () => {
  let count = 0;

  let countBtnClicks_ = clicksByClass_('count-clicks-btn');

  return countBtnClicks_
    .map(e => ++count)
    .startWith(0)
    .map(n => n.toString())
    .map(view);
}

export default render_;
