import {Observable} from 'rx';

import {h} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';


let render = (count) => <h1 className='hello-world'>Hello World {count + ''}</h1>;
//we did a `count = ''` above because `h` can't handle integers in this case, it need strings

let view = render(0);
let rootNode = createElement(view);
document.body.appendChild(rootNode);

Observable
  .interval(1000) //replace the steTimeout and `count` state variable. Interval will give us an increment-ing number every 1000 milliseconds
  .map(n => render(n + 1))
  .subscribe(
    newView => {
      let patches = diff(view, newView);
      rootNode = patch(rootNode, patches);
      view = newView;
    }
  );
