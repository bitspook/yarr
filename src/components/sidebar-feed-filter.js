import h from 'virtual-dom/h';
import {Observable} from 'rx';

import {clicksByClass_} from '../events';
import {dataAttrAsClass} from '../utils';

let view = () =>
  <ul className="sidebar-controls">
    <li className="sidebar-control filter-posts data-filter-all">All</li>
    <li className="sidebar-control filter-posts active data-filter-unread">Unread</li>
    <li className="sidebar-control filter-posts data-filter-read">Read</li>
  </ul>
  ;

let feedFilters_ = () => {
  let widgetClicks_ = clicksByClass_('filter-posts');

  let filters_ = widgetClicks_
        .map(e => e.target)
        .map(el => dataAttrAsClass('filter', el));

  return filters_;
};

let render_ = () => {
  let widgetClicks_ = clicksByClass_('filter-posts');

  widgetClicks_
    .map(e => e.target)
    .do(el => {
      document.querySelector('.filter-posts.active').classList.remove('active');
      el.classList.add('active');
    })
    .subscribe();

  return Observable.return(view());
}


export default render_;
export {feedFilters_};
