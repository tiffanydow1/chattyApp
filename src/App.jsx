
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //messages comimg from server will be stored here as they arrive
      activeUsers: 0
    };

    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleNewUsername = this.handleNewUsername.bind(this);

  }

  handleNewMessage = event => {
    if (event.key === 'Enter') {

      const newMessages = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      }

      const messages = this.state.messages.concat(newMessages);
      this.setState({messages: messages})
      this.socket.send(JSON.stringify(newMessages));
      event.target.value = "";
    }
  }

  handleNewUsername = event => {
    if (event.key === 'Enter') {
      const newNotifications = {
        content: this.state.currentUser.name + " changed their name to " + event.target.value,
        type: "postNotification"
      }
      const messages = this.state.messages.concat(newNotifications);
      this.setState({messages: messages,currentUser: {name: event.target.value }});
      this.socket.send(JSON.stringify(newNotifications));
    }
  }

    componentDidMount(){
      const that = this;
      //creating WebSocket object - attempts to open connection w. server
      this.socket = new WebSocket("ws://localhost:3001");

      this.socket.onopen = (event) => {
     }

        this.socket.onmessage = (message) => {
          let messageData = JSON.parse(message.data);
          let messages = that.state.messages.concat(messageData);

          switch(messageData.type) {
            case "incomingMessage":
              that.setState({messages: messages});
              break;
            case "incomingNotification":
              that.setState({messages: messages});
              break;
            case "onlineUsers":
              that.setState({ activeUsers: messageData.users, messages: messages});
              break;
            default:
              throw new Error("Unknown event type " + messageData.type);
          }
       }
    }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p>{this.state.activeUsers} users online.</p>
        </nav>

        <MessageList messages={this.state.messages} />

        <ChatBar handleNewUsername={this.handleNewUsername} handleNewMessage={this.handleNewMessage}
        currentUser={this.state.currentUser} />
      </div>
    );
  }
 }

export default App;



