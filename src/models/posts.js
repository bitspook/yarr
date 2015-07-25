import {Posts, reactiveDexieTable_} from '../db';
import {Observable} from 'rx';

let posts_ = Observable
      .merge(
        reactiveDexieTable_(Posts, 'creating'),
        reactiveDexieTable_(Posts, 'updating'),
        reactiveDexieTable_(Posts, 'deleting')
      )
      .startWith('')
      .flatMap(() => Posts.orderBy('publishedDate').reverse().toArray());

export default {posts_};
