import h from 'virtual-dom/h';
import {Observable} from 'rx';

import countClicks_ from './count-clicks';

let view = (countClicks) => {
  return <div className="container">
    {countClicks}
  </div>;
}

let render_ = () => Observable
      .combineLatest(
        countClicks_(),
        view
      );

export default render_;
