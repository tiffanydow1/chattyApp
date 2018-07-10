import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);

    }

  render() {

    return(
    <main className="messages">

      {
        this.props.messages.map(messages => {
          return <Message messages={messages} />
        })
      }


    </main>

    )
  }
}


export default MessageList;


