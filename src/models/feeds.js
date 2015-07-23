import {Observable} from 'rx';
import {ajax} from 'jQuery';

let feedUrls = [
  'https://hacks.mozilla.org/category/es6-in-depth/feed/',
  'http://feeds.feedburner.com/JohnResig',
  'http://unisonweb.org/feed.xml'
];

let fetchFeed = (url) => {
  return ajax({
    url: `http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&q=${url}`,
    dataType: 'jsonp'
  }).promise();
};


let feeds_ = Observable
      .from(feedUrls)
      .flatMap(fetchFeed)
      .map(res => res.responseData.feed);

export default {feeds_};
