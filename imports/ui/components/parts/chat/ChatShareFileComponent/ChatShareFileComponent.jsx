import React from 'react';

import { ChatShareFileCardContainer } from '/imports/ui/containers/parts/chat/ChatShareFileCardContainer';

import './ChatShareFileComponentStyle.less';

export const ChatShareFileComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
    getFile: React.PropTypes.func.isRequired,
  },
  render: function () {
    return (
      <div>
        <div className="ui cards share-files">
          {this.props.message.files.map(fileInfo =>
            <ChatShareFileCardContainer
              key={fileInfo.id}
              contact={this.props.contact}
              message={this.props.message}
              fileInfo={fileInfo}
              file={this.props.getFile(fileInfo.id)}
             />
          )}
        </div>
      </div>
    );
  },
});
