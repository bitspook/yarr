import {Observable} from 'rx';
import h from 'virtual-dom/h';

import filterWidget_ from './sidebar-feed-filter';
import fetchNAddWidget_ from './sidebar-fetch-n-add-widget';

let view = (filterWidget, fetchNAddWidget) =>
  <div className='sidebar-container'>
    <div className="sidebar-brand">
      <h2 className="sidebar-brand">Yarr</h2>
    </div>

    {filterWidget}
    {fetchNAddWidget}

  </div>


let render_ = () =>
  Observable
  .combineLatest(
    filterWidget_(),
    fetchNAddWidget_(),
    view
  );

export default render_;
