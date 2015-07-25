import {Observable} from 'rx';
import {ajax} from 'jQuery';

import {Feeds, reactiveDexieTable_} from '../db';

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

let addPostToDb = (post, feedUrl) => {
  post.read = 'false';
  post.publishedDate = new Date(post.publishedDate);
  post.feedUrl = feedUrl;
  return Posts.add(post);
};

let addFeed_ = (feedUrl) => Observable
      .of(feedUrl)
      .flatMap(fetchFeed)
      .flatMap(data => {
        let feed = data.responseData.feed;
        let entries = feed.entries;

        let addFeedP = Feeds.add({
          url: feed.feedUrl,
          name: feed.title,
          source: feed.link,
          description: feed.description
        });

        return Observable
          .fromPromise(addFeedP)
          .flatMap(() => Observable.from(entries))
          .flatMap(p => addPostToDb(p, feed.feedUrl));
      });

//add default feeds
Observable
  .fromPromise(Feeds.count())
  .flatMap(count => {
    let urls = count === 0 ? feedUrls : [];
    return Observable.from(urls);
  })
  .flatMap(addFeed_)
  .subscribe(
    x => console.log('Successfully added', x),
    e => console.warn('Error while adding feed: ', e)
  );

let fetchAllFeeds_ = () => {
  let newPosts_ = Observable
        .fromPromise(Feeds.toArray())             //take all the feeds as array
        .flatMap(feeds => Observable.from(feeds)) //convert the array to an Observable to get 1 feed at a time
        .flatMap(feed => fetchFeed(feed.url))
        .flatMap(data => {
          let feed = data.responseData.feed;
          let entries = feed.entries.map(e => {
            e.feedUrl = feed.url;
            return e;
          });

          return Observable.from(entries);          //return the new Posts as an Observable
        });                                         //which give 1 post at a time

  let addNewPosts_ = newPosts_                      //we don't want to add already present posts
        .flatMap(entry => Posts.get(entry.link))    //(dexie gives an error for that)
        .zip(
          newPosts_,                                //I am sure there's a better way of doing this
          (existing, newEntry) => {                 //if you know, do tell me
            return {existing, newEntry};
          }
        )
        .flatMap(entry => {
          if(entry.existing)
            return Observable.empty();

          return addPostToDb(entry.newEntry, entry.newEntry.feedUrl);
        });

  return addNewPosts_;
};


let feeds_ = Observable
      .merge(
        reactiveDexieTable_(Feeds, 'creating'),
        reactiveDexieTable_(Feeds, 'updating'),
        reactiveDexieTable_(Feeds, 'deleting')
      )
      .startWith('')
      .flatMap(() => Feeds.toArray()).share();

export default {feeds_, fetchAllFeeds_, addFeed_};
