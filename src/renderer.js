import {h} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';


let render = (mainView_, baseDOMNode) => {
  let view = null;
  let rootNode = null;

  let initialize = (newView) => {
    view = newView;
    rootNode = createElement(view);
    baseDOMNode.appendChild(rootNode);
  };

  let update = (newView) => {
    let patches = diff(view, newView);
    rootNode = patch(rootNode, patches);
    view = newView;
  };

  return mainView_
    .subscribe(
      newView => view
        ? update(newView)
        : initialize(newView),
      error => console.warn('Error occured somewhere along Observable chain', error)
    );
};

export default render;
