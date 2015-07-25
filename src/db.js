import Dexie from 'dexie';
import {Observable} from 'rx';

let db = new Dexie('yarr');

//The object store will allow any properties on your stored objects but you can only query them by indexed properties
db.version(1).stores({
  feeds: 'url, name',
  posts: 'link, title, author, publishedDate, categories, read, feedUrl'
});

db.open();

window.Posts = db.posts;
window.Feeds = db.feeds;

let reactiveDexieTable_ = (table, hookName) => {
  return Observable.create((obs) => {
    let dbListener = table.hook(hookName, (pk, obj, txn, update) => {
      //Can't rely on `arguments` because webpack
      //there are 4 arguments for 'updating' op, otherwise there are 3.
      //in case of 'updating' first arg is 'modifications', and other three are same
      obs.onNext(pk, obj, txn, update);
    });

    return () => {
      table.hook(hookName).unsubscribe(dbListener);
    };
  });

};

//delete all posts whenever a feed is deleted from dexie db
reactiveDexieTable_(db.feeds, 'deleting')
  .flatMap(feedUrl => {
    return db.posts.where('feedUrl').equals(feedUrl).delete();
  })
  .subscribe(
    x => console.log(`${x} posts deleted successfully in cascading delete operation.`),
    e => console.error('Error while cascading Posts delete', e)
  );

export default {
  db,
  Posts: db.posts,
  Feeds: db.feeds,
  reactiveDexieTable_
};
