import {Observable} from 'rx';
import h from 'virtual-dom/h';

let view = () =>
  <div className='sidebar-container'>
    <div className="sidebar-brand">
      <h2 className="sidebar-brand">Yarr</h2>
    </div>
  </div>


let render_ = () =>
      Observable
        .return(view());

export default render_;
