import h from 'virtual-dom/h';
import {Observable} from 'rx';

let render_ = () => Observable.return(<h1>Hello World</h1>);

export default render_;
