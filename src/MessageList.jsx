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
        this.props.messages.map((message, id) => {
          if (message.type === "incomingMessage") {
            return <Message key={id} user={message.username} content={message.content} />
          } else if(message.type === "incomingNotification"){
            return(
              <div>
                <span className="message-content" style={{fontStyle: 'italic'}}>{message.content}</span>
              </div>
              )
          }

        })
      }

    </main>

    )
  }
}


export default MessageList;


