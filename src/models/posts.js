import {Posts} from '../db';
import {Observable} from 'rx';

let posts_ = Observable
      .fromPromise(Posts.orderBy('publishedDate').reverse().toArray());

export default {posts_};
