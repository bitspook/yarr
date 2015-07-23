import h from 'virtual-dom/h';
import {Observable} from 'rx';

import greeting_ from './greeting';
import counter_ from './counter';

let view = (counterView, greetingView) => {
  return <div className="container">
    {greetingView}
  {counterView}
  </div>;
}

let render_ = () => Observable
      .combineLatest(
        counter_(),
        greeting_(),
        view
      );

export default render_;
