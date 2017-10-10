import React from 'react';
import $ from 'jquery';

const Post = (props) => (
  <div>
    <h3>Here is a sample post title</h3>
    <p>Here's some Kafka filler text to serve as the body for this sample post. One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " he thought. </p>
    <hr />
    <span className="post-stats">3 upvotes</span>
    <span className="post-stats post-stats-comments">2 comments</span>
    <form>
      <textarea className="comment-input" placeholder="Add your comment here!"></textarea>
      <button className="comment-submit" type="submit">Save comment</button>
    </form>
    <ul>
      <li className="comment-entry">Here is a sample comment!</li>
      <li className="comment-entry">Here is another sample comment; I would really not enjoy waking up to find out that i've been turned into a bug!</li>
    </ul>
  </div>
)

export default Post;
