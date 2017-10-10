import React from 'react';
import $ from 'jquery';

const Create = (props) => (
  <div>
    <h2>New Post</h2>
    <form>
      <input className="create-title-input" type="text"  placeholder="Post Title"></input>
      <textarea className="create-body-textarea"  placeholder="Post Body"></textarea>
      <button className="create-submit-button" type="submit">Save post</button>
    </form>
  </div>
)

export default Create;
