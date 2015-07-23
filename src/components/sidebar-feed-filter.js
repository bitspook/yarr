import h from 'virtual-dom/h';
import {Observable} from 'rx';

import {clicksByClass_} from '../events';

let view = () =>
  <ul className="sidebar-controls">
    <li className="sidebar-control filter-posts data-filter-all">All</li>
    <li className="sidebar-control filter-posts active data-filter-unread">Unread</li>
    <li className="sidebar-control filter-posts data-filter-read">Read</li>
  </ul>
  ;

let render_ = () => {
  let widgetClicks_ = clicksByClass_('filter-posts');

  widgetClicks_
    .map(e => e.target)
    .do(el => {
      document.querySelector('.filter-posts.active').classList.remove('active');
      el.classList.add('active');
    })
    .subscribe(e => console.log(e));

  return Observable.return(view());
}


export default render_;
