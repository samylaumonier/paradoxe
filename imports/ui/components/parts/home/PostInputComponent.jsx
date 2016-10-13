import React from 'react';
import autosize from 'autosize';

import { LockableButtonComponent } from '/imports/ui/components/parts/app/spinner/LockableButtonComponent';

import '/imports/ui/styles/parts/home/PostInputComponentStyle.less';

export const PostInputComponent = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      content: '',
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
              <LockableButtonComponent ref="button" type="submit" className="ui blue submit button">
                Submit
              </LockableButtonComponent>
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

    if (this.refs.button.isLocked()) {
      return false;
    }

    this.refs.button.lock();

    this.props.onSubmit(this.state.content, () => {
      this.refs.button.unlock();
      this.setState({
        content: ''
      });
    });
  },
});
