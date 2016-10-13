import React from 'react';

import  '/imports/ui/styles/pages/FeedbackPageComponentStyle.less';

export const FeedbackPageComponent = React.createClass({
  propTypes: {
    feedback: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    $(this.refs.dropdown).dropdown();
  },
  render: function () {
    return (
      <div id="feedback-page">
        <div className="ui form column grid aligned centered stackable">
          <div className="ten wide centered aligned column">
            <div className="ui child segment">
              <form className="column" onSubmit={this.feedback}>
                <h2 className="ui teal image header">
                  <div className="content">
                    Thank you for your input.
                  </div>
                </h2>
                <br/>
                <div className="field">
                  <label>Subject</label>
                  <div className="ui left labeled icon input">
                    <input ref="subject" type="text" placeholder="Subject" required/>
                    <i className="edit icon"/>
                  </div>
                </div>
                <div className="field">
                  <label>Type of feedback</label>
                  <div ref="dropdown" className="ui fluid selection dropdown">
                    <div id="feedback-type" className="text">Select</div>
                    <i className="dropdown icon"/>
                    <input type="hidden" name="gender"/>
                    <div className="menu">
                      <div className="item" data-value="bug">Bug</div>
                      <div className="item" data-value="enhancement">Enhancement</div>
                      <div className="item" data-value="design">Design</div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>Description</label>
                  <div className="ui left labeled icon input">
                    <textarea ref="description" placeholder="Description" required/>
                    <i className="align justify icon"/>
                  </div>
                </div>
                {/*<div className="field">*/}
                  {/*<label>Image (optional)</label>*/}
                  {/*<div className="ui left labeled icon input">*/}
                    {/*<input ref="image" type="file"/>*/}
                    {/*<i className="image icon"/>*/}
                  {/*</div>*/}
                {/*</div>*/}
                <button type="submit" className="ui blue submit button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  },
  feedback: function (e) {
    e.preventDefault();
    const feedbackAttributes = {
      subject: this.refs.subject.value,
      type: $("div#feedback-type").text().toLowerCase(),
      description: this.refs.description.value,
    };
    
    this.props.feedback(feedbackAttributes);
  }
});
