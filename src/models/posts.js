import {feeds_} from './feeds';

let posts_ = feeds_
      .map(feed => feed.entries);

export default {posts_};
