import React from 'react';
import { Tracker } from 'meteor/tracker';

import './ChatComponentStyle.less';
import autosize from '/node_modules/autosize/dist/autosize.min';

export const ChatComponent = React.createClass({
  componentDidMount: function () {
    autosize(this.refs.content);
  
  
    this.autorun(function () {
//      if (template.subscriptionsReady()) {
        Tracker.afterFlush(function () {
          $('#message-zone').scrollTop($(document).height() - $(window).height());
        });
//      }
    });
     
  },
  render: function () {
    return (
      <div id="chat">
        
        
        <div className="ui top attached menu">
          <span className="ui icon item">
            <i className="file icon"/>
          </span>
          <span className="ui icon item">
            <i className="game icon"/>
          </span>
          <span className="ui icon item">
            <i className="phone icon"/>
          </span>
          <span className="ui icon item">
            <i className="record icon"/>
          </span>
          <span className="ui icon item">
            <i className="gift icon"/>
          </span>
          <span className="ui icon item">
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner dont icon"/>
          </i>
          </span>
          <span className="ui icon item">
          <i className="icons">
            <i className="user icon"/>
            <i className="red corner remove icon"/>
          </i>
          </span>
        </div>
        
        <div id="message-zone">
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
        
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
      
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
        
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
      
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
  
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
        
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
      
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>

          </div>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/molly.png"/>
              </a>
              <div className="content">
                <a className="author">Joe Henderson</a>
                <div className="metadata">
                  <div className="date">1 day ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  <p>The hours, minutes and seconds stand as visible reminders that your effort put them all there. </p>
                  <p>Preserve until your next run, when the watch lets you see how Impermanent your efforts are.</p>
                </div>
              </div>
            </div>
            <div className="comment">
              <a className="avatar">
                <img src="http://semantic-ui.com/images/avatar2/large/matthew.png"/>
              </a>
              <div className="content">
                <a className="author">Christian Rocha</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
          
                  <div className="actions">
                    <a className="reply">More</a>
                  </div>
        
                </div>
                <div className="text">
                  I re-tweeted this.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        
        <section id="chat-textarea-section">
          <div id="chat-textarea">
            <form className="ui form">
              <div className="field">
                <div className="ui divider"></div>
                <div className="ui aligned">
                  <div className="ui center icon action input">
                    <button className="ui white submit button left-button"><i className="large smile icon"/></button>
                    <textarea ref="content" rows="1"/>
                    <button type="submit" className="ui white submit button"><i className="large send icon"/></button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
});
