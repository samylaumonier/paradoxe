import React from 'react';
import { Link } from 'react-router';

import '/imports/ui/styles/pages/LandingPageComponentStyle.less';

export const LandingPageComponent = React.createClass({
  componentDidMount: function () {
    $(this.refs.header).transition('scale in', 1000);
    $('.ui.dropdown')
      .dropdown()
    ;
  },
  render: function () {
    const version = Meteor.settings.public.version;
    return (
      <div id="landingPage">
        <div className="ui inverted masthead centered segment">
          <div className="ui page grid">
            <div className="column">
              <div className="ui secondary pointing menu">
                <p className="logo item">
                  <a>
                    <img className="logo-item" src="/images/logo-35x35.png" alt="Paradoxe logo"/>
                  </a>
                </p>
                <a className="ui item">
                  Paradoxe
                </a>
                <div className="right menu">
                  <Link to="/register" className="ui active item button">
                    Register
                  </Link>
                  <Link to="/login" className="ui active item button">
                    Login
                  </Link>
                </div>
              </div>
              <div id="page-header" className="ui hidden transition information" ref="header">
                <h1 className="ui inverted centered hudge header">
                  Paradoxe
                  <small>alpha</small>
                </h1>
                <p className="ui centered">
                  When simplicity meets functionality. <br/>
                  We get extraordinary.
                </p>
                <div id="download-buttons">
                  <Link to="/register" className="center aligned large basic inverted ui button" download>
                    <div className="visible content"><i className="browser icon"/></div>
                  </Link>
                  <a href="https://download.paradoxe.io/download/latest/windows_64"
                     className="center aligned large basic inverted ui button" download>
                    <div className="visible content"><i className="windows icon"/></div>
                  </a>
                  <a href="https://download.paradoxe.io/download/latest/osx"
                     className="center aligned large basic inverted ui button" download>
                    <div className="visible content"><i className="apple icon"/></div>
                  </a>
                  <div className="ui buttons center aligned large basic inverted animated fade">
                    <div className="ui button dropdown">
                      <div className="visible content"><i className="linux icon"/></div>
                    </div>
                    <div className="ui floating dropdown icon button">
                      <i className="dropdown icon"/>
                      <div className="menu">
                        <a
                          href={`https://download.paradoxe.io/download/${version}/linux_64/paradoxe-${version}-amd64.deb`}
                          className="item"
                          download
                        >.deb</a>
                        <a
                          href={`https://download.paradoxe.io/download/${version}/linux_64/paradoxe-${version}-amd64.rpm`}
                          className="item"
                          download
                        >.rpm</a>
                        <a
                          href={`https://download.paradoxe.io/download/${version}/linux_64/paradoxe-${version}-amd64.tar.gz`}
                          className="item"
                          download
                        >.tar.gz</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui centerted image">
                  <img src="images/screenshot.png"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="eight wide centered column">
              <h2 className="center aligned ui huge header">
                What does it do ?
              </h2>
              <div className="ui divider"></div>
              <p className="ui centered lead">Here are some of the things we do best.</p>
            </div>
          </div>
          <br/>
        </div>
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="sixteen wide column">
              <div className="ui two column aligned stackable grid">
                <div className="ten wide column">
                  <div className="ui centerted image">
                    <img src="/images/youtube.png"/>
                  </div>
                </div>
                <div className="six wide column">
                  <div className="ui header">
                    Watch videos together
                  </div>
                  <p>
                    Watch YouTube videos with friends. Just drop a YouTube link in the chat,
                    we'll go get it. All you have to do after that is click on "watch together"
                    and the video will start playing for the both of you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="sixteen wide column">
              <br/>
              <div className="ui two column aligned stackable grid">
                <div className="six wide column">
                  <div className="ui header">
                    Direct messaging
                  </div>
                  <p>
                    Messaging is without a doubt one of the most used forms of communication, and this is something we
                    believe we have async
                    Done very well. No worries when you send a message with us we will get the job do. So send a DM it's
                    <b> privacy and security.</b>
                  </p>
                </div>
                <div className="ten wide column">
                  <div className="ui centerted image">
                    <img src="/images/chat-bubble.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="sixteen wide column">
              <div className="ui two column aligned stackable grid">
                <div className="ten wide column">
                  <div className="ui centerted image">
                    <img src="/images/video-audio.png"/>
                  </div>
                </div>
                <div className="six wide column">
                  <div className="ui header">
                    Video and audio calls
                  </div>
                  <p>
                    It's not just about keeping in touch, it's about how you keep in touch.
                    Keep in touch with your contacts through <b>cristal clear video and audio. </b>
                    Give a friend a call and we would love to hear what you think.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="sixteen wide column">
              <div className="ui two column aligned stackable grid">
                <div className="six wide column">
                  <div className="ui icon header">
                    File transfer
                  </div>
                  <p>
                    <b>Drag, drop and it's sent. </b> It's that easy to share files. Send any file of any type you need
                    to share,
                    we will make sure it get's there. Your files will be safely stored in your conversation.
                    It will remain accessible until you or your contact feels like it needs to be removed.
                  </p>
                </div>
                <div className="ten wide column">
                  <div className="ui centerted image">
                    <img src="images/files.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>
        
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="sixteen wide column">
              <div className="ui two column aligned stackable grid">
                <div className="ten wide column">
                  <div className="ui centerted image">
                    <img src="images/browsers.png"/>
                  </div>
                </div>
                <div className="six wide column">
                  <div className="ui icon header">
                    Browser based use
                  </div>
                  <p>
                    On the go or using a friend's computer.
                    No problem, just <Link to="/login">click here</Link> for the web version.
                    Our video and and audio calls are <b>supported by a number of web browsers</b>
                    like Chrome, Firefox, Opera. So you never have to be disconnected.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>
        <div className="ui recent-works vertical segment">
          <div className="ui very relaxed stackable centered page grid">
            <div className="row">
              <div className="eight wide centered column">
                <div className="ui horizontal divider"><i className="huge white star icon"/></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical segment white-footer alpha-hidden">
          <div className="ui stackable center aligned page grid">
            <div className="three column row">
              <div className="column">
                <h5 className="ui header using-paradoxe">Using Paradoxe</h5>
                <div className="ui link list">
                  <a className="item">Support</a>
                  <a className="item">Feedback</a>
                </div>
              </div>
              <div className="column">
                <h5 className="ui header paradoxe">Paradoxe</h5>
                <div className="ui link list">
                  <a className="item">About</a>
                </div>
              </div>
              <div className="column">
                <h5 className="ui header download">Download</h5>
                <div className="ui link list">
                  <a className="item">Windows</a>
                  <a className="item">Mac ox</a>
                  <a className="item">Linux</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui inverted footer vertical segment center">
          <div className="ui centered page grid">
            <div className="sixteen wide column">
              <div className="ui two column aligned stackable grid">
                <div className="eight wide column">
                  <div className="ui four column aligned stackable grid">
                    <div className="column">
                      <a href="https://twitter.com/ParadoxeApp" className="item icon inverted">
                        <i className="twitter icon"/>
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
                <div className="eight wide column">
                  <a className="item inverted"><b>© Paradoxe</b></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

