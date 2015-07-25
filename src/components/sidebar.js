import {Observable} from 'rx';
import h from 'virtual-dom/h';

import filterWidget_ from './sidebar-feed-filter';
import fetchNAddWidget_ from './sidebar-fetch-n-add-widget';
import feedList_ from './sidebar-feed-list';

import {feedFilters_ as filterWidgetFilters_} from './sidebar-feed-filter';
import {selectedFeedUrl_} from './sidebar-feed-list';

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

let feedFilters_ = () =>
      Observable
      .combineLatest(
        filterWidgetFilters_().startWith(''),
        selectedFeedUrl_().startWith(''),
        (filter, feedUrl) => {
          return {filter, feedUrl}
        }
      )
      .map(check => {
        let filter = {};

        switch(check.filter) {
        case 'read':
          filter.read = 'true'; break;
        case 'unread':
          filter.read = 'false'; break;
        }

        if(check.feedUrl) filter.feedUrl = check.feedUrl;

        return filter;
      })


export default render_;
export {feedFilters_};
