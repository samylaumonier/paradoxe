import React from 'react';

import '/imports/ui/styles/pages/StorePageComponentStyle.less';

export const StorePageComponent = React.createClass({
  propTypes: {
  },
  render: function () {
    return (
      <div id="store-page">
        <div className="ui bottom attached secondary segment">
          <h1>Store</h1>
          
          
          
          <div className="ui five doubling cards">
            <div className="orange card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/elliot.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="yellow card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/helen.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="olive card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/jenny.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="red card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/veronika.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="green card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/stevie.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="blue card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/steve.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="blue card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/steve.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
            <div className="blue card">
              <div className="image">
                <img src="http://semantic-ui.com/images/avatar/large/steve.jpg"/>
              </div>
              <div className="extra">
                Rating:
                <div className="ui star rating" data-rating="4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
