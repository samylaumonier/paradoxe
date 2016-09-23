import React from 'react';

import '/imports/ui/styles/pages/LandingPageComponentStyle.less';

export const LandingPageComponent = React.createClass({
  componentDidMount: function () {
    $(document)
      .ready(function () {
        
        var
          changeSides = function () {
            $('.ui.shape')
              .eq(0)
              .shape('flip over')
              .end()
              .eq(1)
              .shape('flip over')
              .end()
              .eq(2)
              .shape('flip back')
              .end()
              .eq(3)
              .shape('flip back')
              .end()
            ;
          },
          validationRules = {
            firstName: {
              identifier: 'email',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter an e-mail'
                },
                {
                  type: 'email',
                  prompt: 'Please enter a valid e-mail'
                }
              ]
            }
          }
          ;
        
        $('.ui.dropdown')
          .dropdown({
            on: 'hover'
          })
        ;
        
        $('.ui.form')
          .form(validationRules, {
            on: 'blur'
          })
        ;
        
        $('.masthead .information')
          .transition('scale in', 1000)
        ;
        
        setInterval(changeSides, 3000);
        
      })
    ;
  },
  render: function () {
    return (
      <div id="landingPage">
        <div className="ui inverted masthead centered segment">
          <div className="ui page grid">
            <div className="column">
              <div className="ui secondary pointing menu">
                <p className="logo item">
                  <a href="" className="">
                    <img  className="logo-item" src="/images/logo.png" alt="glib logo"/>
                  </a>
                </p>
                <a className="active item">
                  <i className="home"/> Home
                </a>
                <a className="item">
                  <i className="mail"/> Messages
                </a>
                <div className="right menu">
                  <a className="ui item">
                    Logout
                  </a>
                </div>
              </div>
              <div className="ui hidden transition information">
                <h1 className="ui inverted centered header">
                  Glib
                </h1>
                <p className="ui centered">
                  Glib is a multi platform messaging application.<br/>
                  Get it now for one of the following platform.
                </p>
                <a href="#" className="center aligned large basic inverted animated fade ui button">
                  <div className="visible content"><i className="windows icon"/></div>
                  <div className="hidden content">Get</div>
                </a>
                <a href="#" className="center aligned large basic inverted animated fade ui button">
                  <div className="visible content"><i className="apple icon"/></div>
                  <div className="hidden content">Get</div>
                </a>
                <a href="#" className="center aligned large basic inverted animated fade ui button">
                  <div className="visible content"><i className="linux icon"/></div>
                  <div className="hidden content">Get</div>
                </a>
                <div className="ui centerted image">
                  <img src="images/banner.png"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical feature segment">
          <div className="ui centered page grid">
            <div className="fourteen wide column">
              <div className="ui three column center aligned stackable divided grid">
                <div className="column column-feature">
                  <div className="ui icon header">
                    <i className="flaticon-connecting icon"/>
                    Courses
                  </div>
                  <p>Take your kitty to a cat-ducation course and learn how to treat her well.</p>
                  <p>
                    <a className="ui button" href="#">
                      Learn
                    </a>
                  </p>
                </div>
                <div className="column column-feature">
                  <div className="ui icon header">
                    <i className="flaticon-calendar icon"/>
                    Library
                  </div>
                  <p>Dig through our cat library to found out amazing things you can do with your kitty.</p>
                  <p>
                    <a className="ui green right labeled icon button" href="#">
                      Research
                      <i className="right flaticon-move icon"/>
                    </a>
                  </p>
                </div>
                <div className="column column-feature">
                  <div className="ui icon header">
                    <i className="flaticon-speech icon"/>
                    Community
                  </div>
                  <p>Get feedback on your cat from a community of loving pet owners on our online...</p>
                  <p>
                    <a className="ui button" href="#">
                      Share
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ui centered page grid">
            <h3 className="subscribe-header">Subscribe to Mailing List</h3>
            <p className="ui centered lead large">At least he won't reach his highest potential unless you enroll him in
              Cat University's 2013 className.</p>
          </div>
        </div>
        <div className="ui recent-works vertical segment">
          <div className="ui very relaxed stackable centered page grid">
            <div className="row">
              <div className="eight wide centered column">
                <h1 className="center aligned ui inverted header">
                  Recent Works
                </h1>
                <div className="ui horizontal divider"><i className="white flaticon-camera icon"/></div>
                <p className="ui centered lead">Checkout Our Recently Completed Works<br/>you will be amazed!.</p>
              </div>
            </div>
            <div className="fourteen wide column">
              <div className="ui three column aligned stackable divided grid">
                <div className="column">
                  <div className="ui card">
                    <div className="image">
                      <img src="images/totoro-horizontal.jpg"/>
                    </div>
                    <div className="content">
                      <div className="header">My Neighbor Totoro</div>
                      <div className="description">
                        Two sisters move to the country with their father in order to be closer to their hospitalized
                        mother, and discover the surrounding trees are inhabited by magical spirits.
                      </div>
                    </div>
                    <div className="ui two bottom attached buttons">
                      <div className="ui button">
                        <i className="plus icon"/>
                        Queue
                      </div>
                      <div className="ui pink button">
                        <i className="play icon"/>
                        Watch
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="ui card">
                    <div className="image">
                      <img src="images/totoro-horizontal.jpg"/>
                    </div>
                    <div className="content">
                      <div className="header">My Neighbor Totoro</div>
                      <div className="description">
                        Two sisters move to the country with their father in order to be closer to their hospitalized
                        mother, and discover the surrounding trees are inhabited by magical spirits.
                      </div>
                    </div>
                    <div className="ui two bottom attached buttons">
                      <div className="ui button">
                        <i className="flaticon-plus icon"/>
                        Queue
                      </div>
                      <div className="ui pink button">
                        <i className="flaticon-play icon"/>
                        Watch
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="ui card">
                    <div className="image">
                      <img src="images/totoro-horizontal.jpg"/>
                    </div>
                    <div className="content">
                      <div className="header">My Neighbor Totoro</div>
                      <div className="description">
                        Two sisters move to the country with their father in order to be closer to their hospitalized
                        mother, and discover the surrounding trees are inhabited by magical spirits.
                      </div>
                    </div>
                    <div className="ui two bottom attached buttons">
                      <div className="ui button">
                        <i className="flaticon-plus icon"/>
                        Queue
                      </div>
                      <div className="ui pink button">
                        <i className="flaticon-play icon"/>
                        Watch
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical segment">
          <div className="ui stackable center aligned page grid">
            <div className="row">
              <div className="eight wide column">
                <h1 className="ui header">
                  Our Clients
                </h1>
                <div className="ui horizontal divider"><i className="flaticon-settings icon"/></div>
                <p className="ui centered lead">
                  Many Companies Rely on Our Cat Knowledge
                </p>
                <br/>
              </div>
            </div>
            <div className="four column logo row">
              <div className="column">
                <div className="ui shape">
                  <div className="sides">
                    <div className="active side">
                      <i className="huge flaticon-facebook icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-twitter icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-pinterest icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-more icon"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="ui shape">
                  <div className="sides">
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-more icon"/>
                    </div>
                    <div className="active side">
                      <i className="huge flaticon-twitter icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-facebook icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-twitter icon"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="ui shape">
                  <div className="sides">
                    <div className="active side">
                      <i className="huge flaticon-facebook icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-twitter icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-pinterest icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-more icon"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="ui shape">
                  <div className="sides">
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-more icon"/>
                    </div>
                    <div className="active side">
                      <i className="huge flaticon-twitter icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-facebook icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-google icon"/>
                    </div>
                    <div className="side">
                      <i className="huge flaticon-twitter icon"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui inverted footer vertical segment center">
          <div className="ui stackable center aligned page grid">
            <div className="four column row">
              <div className="column">
                <div className="ui inverted link list">
                  <a className="item">Professors</a>
                </div>
              </div>
              <div className="column">
                <div className="ui inverted link list">
                  <a className="item">Recently Changed</a>
                </div>
              </div>
              <div className="column">
                <div className="ui inverted link list">
                  <a className="item">Privacy Policy</a>
                </div>
              </div>
              <div className="column">
                <addr>
                  <a href="http://scripteden.com/downloads/semantic-ui/">Semantic UI Templates</a>
                </addr>
              </div>
            </div>
          </div>
  
          <div className="ui stackable center aligned page grid">
            <div className="four column row">
              <div className="column">
                <div className="ui inverted link list">
                  <a className="item">Professors</a>
                </div>
              </div>
              <div className="column">
                <div className="ui inverted link list">
                  <a className="item">Recently Changed</a>
                </div>
              </div>
              <div className="column">
                <div className="ui inverted link list">
                  <a className="item">Privacy Policy</a>
                </div>
              </div>
              <div className="column">
                <addr>
                  <a href="http://scripteden.com/downloads/semantic-ui/">Semantic UI Templates</a>
                </addr>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

