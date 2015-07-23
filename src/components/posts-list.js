import h from 'virtual-dom/h';
import {Observable} from 'rx';

import {feeds_} from '../feeds';
import {formatDate} from '../utils';

let postView = (post) =>
    <article className="post-item post">
      <header className="post-item-header">
        <h2 className="post-item-title">
          <a className='post-title' href={post.link}>{post.title}</a>
          </h2>
      </header>
      <section className="post-item-excerpt">
        {post.contentSnippet}
      </section>

      <footer className="post-item-footer">
        <ul className="post-item-meta-list">
          <li className="post-item-meta-item">
            <p><a href={post.link}>{post.author}</a>
            </p>
          </li>

          <li className="post-item-meta-item">
            <p>
              {formatDate(post.publishedDate)}
            </p>
          </li>

          <li className="post-item-meta-item">
            <p itemprop="articleSection">{post.categories.join(', ')}</p>
          </li>
        </ul>
      </footer>
    </article>
  ;


let view = (postViews) =>
  <section className="post-list">
    {postViews}
  </section>;



let render_ = () => {
  return feeds_
    .map(posts => posts.map(postView))
    .reduce((acc, posts) => acc.concat(posts))
    .map(view);
}

export default render_;
