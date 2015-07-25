import h from 'virtual-dom/h';
import {Observable} from 'rx';

import {clicksByClass_, keyupsByClass_} from '../events';
import {fetchAllFeeds_, addFeed_} from '../models/feeds';

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

  let fetchAllBtnClicks_ = clicksByClass_('fetch-all-btn');
  fetchAllBtnClicks_
    .flatMap(fetchAllFeeds_)
    .subscribe();

  let addInputKeyups_ = keyupsByClass_('new-feed-input');
  let addNewFeed_ = addInputKeyups_
        .do(e => {
          e.target.classList.remove('error');
          e.target.classList.remove('progress');
        })
        .filter(e => e.keyCode === 13)
        .map(e => e.target.value)
        .flatMap(feedUrl => addFeed_(feedUrl))
        .catch(e => {
          let el = document.querySelector('.new-feed-input');
          el.classList.add('error');

          console.debug('Error while adding feed: ', e);

          return addNewFeed_.retry();
        });

  addNewFeed_.subscribe(
    x => console.log(x)
  );


  return Observable
    .combineLatest(
      addFeedInputStyles_,
      view
    );
}

export default render_;
