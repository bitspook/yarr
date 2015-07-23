import h from 'virtual-dom/h';
import {Observable} from 'rx';

import {clicksByClass_} from '../events';

let view = (addFeedInputStyles) =>
  <ul className="sidebar-controls">
    <li className="sidebar-control fetch-all-btn">Fetch All Feeds</li>

    <li className="sidebar-control new-feed-btn">Add New Feed
      <input className="new-feed-input" style={addFeedInputStyles} type="url" required />
    </li>
  </ul>
  ;

let render_ = () => {
  let addFeedBtnClicks_ = clicksByClass_('new-feed-btn');

  let addFeedInputStyles_ = addFeedBtnClicks_
        .startWith(false)
        .scan(acc => !acc)
        .map(show => show
             ? {display: 'inline-block'}
             : {display: 'none' });

  return Observable
    .combineLatest(
      addFeedInputStyles_,
      view
    );
}

export default render_;
