import {Observable} from 'rx';
import {ajax} from 'jQuery';

import {Feeds} from '../db';

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

let addFeed_ = (feedUrl) => Observable
      .of(feedUrl)
      .flatMap(fetchFeed)
      .flatMap(data => {
        let feed = data.responseData.feed;

        let addFeedP = Feeds.add({
          url: feed.feedUrl,
          name: feed.title,
          source: feed.link,
          description: feed.description
        });

        return addFeedP;
      });

//add default feeds
Observable
  .from(feedUrls)
  .flatMap(addFeed_)
  .subscribe(
    x => console.log('Successfully added', x),
    e => console.warn('Error while adding feed: ', e)
  );


let feeds_ = Observable
      .from(feedUrls)
      .flatMap(fetchFeed)
      .map(res => res.responseData.feed);

export default {feeds_};
