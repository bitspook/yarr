import h from 'virtual-dom/h';
import {Observable} from 'rx';

import postsList_ from './posts-list';
import sidebar_, {feedFilters_} from './sidebar';

let view = (postsList, sidebar) =>
      <div id='container' className='container'>
         <div className="surface">
           <div className="surface-container">
             <div className="content">
               <aside className="cover">{sidebar}</aside>
               <div className="wrapper">
                 <div className="wrapper-container">{postsList}</div>
               </div>
             </div>
           </div>
         </div>
       </div>
  ;

let render_ = () => Observable.combineLatest(
  postsList_(feedFilters_),
  sidebar_(),
  view
);


export default render_;
