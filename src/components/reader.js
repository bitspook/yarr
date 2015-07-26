import htmlParser from 'html2hscript';

import {Observable} from 'rx';
import h from 'virtual-dom/h';
import {formatDate} from '../utils';
import {clicksByClass_} from '../events';

let view = (post) => {
  if(!post) return '';

  return <section className="post-container post-reader">
  <span className="close-reader-btn">&#10094;</span>
  <header className="post-header">
    <ul className="post-meta-list">
      <li className="post-meta-item">
        <p>{formatDate(post.publishedDate)}</p>
      </li>

      <li className="post-meta-item">
        <p itemprop="articleSection">{post.categories.join(', ')}</p>
      </li>
    </ul>

    <h1 itemprop="name headline" className="post-title">
    <a href={post.link} title="post.title">{post.title}</a>
    </h1>
  </header>

  <div className="post-body">
    {post.content}
  </div>
</section>
}

let render_ = (readPost_) => {
  let closeBtnClicks_ = clicksByClass_('close-reader-btn');
  let htmlParser_ = Observable.fromNodeCallback(htmlParser);
  let posts_ = readPost_().share();

  return posts_
    .flatMap(post => {
      if(!post) return Observable.return('');
      post.content = `<div class="reader-post-wrapper">${post.content}</div>`;
      return htmlParser_(post.content)
    })
    .zip(
      posts_,
      (vContent, post) => {
        if(!post) return post;

        //this is a hack. the htmlParser produces a string, when needs to be `eval`ed with `h` in scope. So.
        window.h = h;
        let newContent = eval(vContent)
        post.content = newContent;
        return post;
      }
    )
    .merge(closeBtnClicks_)
    .map(postOrClick => {
      if(postOrClick.type === 'click') return false;
      return postOrClick;
    })
    .startWith(false)
    .map(view);
}

export default render_;
