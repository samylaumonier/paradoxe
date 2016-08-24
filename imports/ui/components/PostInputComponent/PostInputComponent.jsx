import React from 'react';

import './PostInputComponentStyle.css';
import { Posts } from '/imports/api/collections'

export const PostInputComponent = React.createClass({
  render: function ()  {
    return (
      <form className="column" onSubmit={this.newUpdate}>
        <div className="ui aligned segment">
          <div className="ui center icon action input update-div">
            <textarea id="post-textarea" type="text" placeholder="Write something" />
              <button type="submit" className="ui blue submit button">Submit</button>
          </div>
        </div>
      </form>
    );
  },
  newUpdate: function (e) {
    e.preventDefault();
    
    const content = $('#post-textarea').val();
    
    var post = {
      content
    };
    Posts.insert(post);
    
    $('#post-textarea').val('');
  }
});
