import React from 'react';
import autosize from 'autosize';

import '/imports/ui/styles/parts/home/PostInputComponentStyle.less';

export const PostInputComponent = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      content: ''
    };
  },
  componentDidMount: function () {
    autosize(this.refs.content);
  },
  render: function ()  {
    return (
      <div>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="ui aligned">
            <div className="ui center icon action input update-div">
              <textarea
                ref="content"
                id="post-textarea"
                type="text"
                placeholder="Write something"
                rows="2"
                required
                value={this.state.content}
                onChange={this.onChange}
              />
              <button type="submit" className="ui blue submit button">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  },
  onChange: function (event) {
    this.setState({
      content: event.target.value
    });
  },
  onSubmit: function (event) {
    event.preventDefault();
    this.props.onSubmit(this.state.content);
    this.setState({
      content: ''
    });
  },
});
