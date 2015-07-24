import Dexie from 'dexie';

let db = new Dexie('yarr');

//The object store will allow any properties on your stored objects but you can only query them by indexed properties
db.version(1).stores({
  feeds: 'url, name',
  posts: 'link, title, author, publishedDate, categories, read, feedUrl'
});

db.open();

window.Posts = db.posts;
window.Feeds = db.feeds;

export default {db, Posts: db.posts, Feeds: db.feeds};
