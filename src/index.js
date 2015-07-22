import {h} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

let render = (count) => <h1 className='hello-world'>Hello World {count + ''}</h1>;
//we did a `count = ''` above because `h` can't handle integers in this case, it need strings

let count = 0;

//render gives us our whole view, only one h1 in our case
let view = render(count);
//in virtual DOM, there has to be a single ultimate parent to hold all vNodes. Let's call it rootNode
let rootNode = createElement(view)

document.body.appendChild(rootNode);

setInterval(function() {
  count ++;

  //we create new view with new state
  let newView = render(count);
  //now let's diff the old with the new view and create patches
  let patches = diff(view, newView);
  //let's create new rootNode by patching the old rootNode with the patches we got from diffing
  rootNode = patch(rootNode, patches);
  //and change our saved view for diffing next time we need to update DOM
  view = newView;

}, 1000);
