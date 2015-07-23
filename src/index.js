import mainView_ from './components/main';
import render from './renderer';
import Rx from 'rx';

Rx.config.longStackSupport = true;

require('./styles/style.scss');

let view_ = mainView_();

render(view_, document.getElementById('app'));
