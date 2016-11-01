import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/store/ProductItemComponentStyle.less';

export const ProductItemComponent = React.createClass({
  propTypes: {
    product: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },
  componentDidMount: function () {
    $('.extra .rating')
      .rating('enable')
    ;
  },
  render: function () {
    return (
      <div className="orange card product-item-component">
        <div className="image">
          <img src="http://semantic-ui.com/images/avatar/large/elliot.jpg"/>
        </div>
        <div className="content">
          <div className="header">Matt Giampietro</div>
          <div className="meta">
            <a>Friends</a>
            <br/>
            <div className="ui product-rating">
              <i className="icon star"/>
              <i className="icon star"/>
              <i className="icon star half empty"/>
              <i className="icon star empty"/>
              <i className="icon star empty"/>
            </div><p>(12)</p>
          </div>
          <div className="description">
            Matthew is an interior designer living in New York.
          </div>
        </div>
        <div className="extra">
          Rate:
          <div className="ui star rating">
            <i className="icon"/>
            <i className="icon"/>
            <i className="icon"/>
            <i className="icon"/>
            <i className="icon"/>
          </div>
        </div>
      </div>
    );
  },
});
