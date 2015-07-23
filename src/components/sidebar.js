import {Observable} from 'rx';
import h from 'virtual-dom/h';

import filterWidget_ from './sidebar-feed-filter';
import fetchNAddWidget_ from './sidebar-fetch-n-add-widget';
import feedList_ from './sidebar-feed-list';

let view = (filterWidget, fetchNAddWidget, feedList) =>
  <div className='sidebar-container'>
    <div className="sidebar-brand">
      <h2 className="sidebar-brand">Yarr</h2>
    </div>

    {filterWidget}
    {fetchNAddWidget}
    {feedList}
  </div>


let render_ = () =>
  Observable
  .combineLatest(
    filterWidget_(),
    fetchNAddWidget_(),
    feedList_(),
    view
  );

export default render_;
