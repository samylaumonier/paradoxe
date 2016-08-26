import React from 'react';

import './PostInputComponentStyle.less';
import { Posts } from '/imports/api/collections';
import autosize from '/node_modules/autosize/dist/autosize.min';

export const PostInputComponent = React.createClass({
  componentDidMount: function () {
    autosize(this.refs.content);
  },
  render: function ()  {
    return (
      <div>
        <form className="ui form" onSubmit={this.newUpdate}>
          <div className="ui aligned">
            <div className="ui center icon action input update-div">
              <textarea ref="content" id="post-textarea" type="text" placeholder="Write something" rows="2" required />
              <button type="submit" className="ui blue submit button">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  },
  newUpdate: function (e) {
    e.preventDefault();
    const textarea = $(this.refs.content);
    const content = textarea.val();
    Posts.insert({
      content
    });
    textarea.val('');
  }
});
