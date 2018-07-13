import React, { Component } from 'react';

  class Message extends Component {

    render() {
      return(

        <div>
          <span className="message-username">{this.props.user}</span>
          <span className="message-content">{this.props.content}</span>
        </div>

      )
    }
  }

export default Message;









