import {Observable} from 'rx';
import h from 'virtual-dom/h';

let render_ = () => Observable
      .interval(1000)
      .map(n => n+1)
      .startWith(0)
      .map(count => count.toString())
      .map(count => <span>{count}</span>);

export default render_;
