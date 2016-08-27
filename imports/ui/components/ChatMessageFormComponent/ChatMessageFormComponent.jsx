import React from 'react';
import { Messages } from '/imports/api/collections';

export const ChatMessageFormComponent = React.createClass({
  render: function () {
    return (
      <div>
        <section id="chat-textarea-section">
          <div id="chat-textarea">
            <form className="ui form" onSubmit={this.postMessage}>
              <div className="field">
                <div className="ui aligned">
                  <div className="ui center icon action input">
                    <button className="ui white submit button left-button">
                      <i className="large smile button icon"/>
                    </button>
                    <textarea ref="content" rows="1" required/>
                    <button type="submit" className="ui white submit button">
                      <i className="large send button icon"/>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  },
  
  postMessage: function (event) {
    event.preventDefault();
    
    const textarea = $(this.refs.content);
    const content = textarea.val();
    
    Messages.insert({
      toUserId: this.props.contact._id,
      content
    }, err => {
      if (err) {
        toastr.error(err.reason, 'Error');
      }
    });
    
    textarea.val('');
    autosize.update(this.refs.content);
    
    return false;
  }
});
