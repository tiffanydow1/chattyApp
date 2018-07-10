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
        this.props.messages.map((messages, id) => {
          return <Message key={id} user={messages.username} content={messages.content} />
        })
      }


    </main>

    )
  }
}


export default MessageList;


