// jshint esversion 6
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

// function generateRandomString() {
//  return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
// }

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //messages comimg from server will be stored here as they arrive
      activeUsers: 0
    };

    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleNewUsername = this.handleNewUsername.bind(this);

  }

  handleNewMessage = event => {

    if (event.key === 'Enter') {

      const newMessages = {
        //id: generateRandomString(),
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
      this.setState({currentUser: {name: event.target.value }});


      const newNotifications = {
        content: this.state.currentUser.name + " changed their name to " + event.target.value
      }
      const messages = this.state.messages.concat(newNotifications);

      this.setState({messages: messages})
      this.socket.send(JSON.stringify(newNotifications));

    }
  }



    componentDidMount(){
      const that = this;
      //creating WebSocket object - attempts to open connection w. server
      this.socket = new WebSocket("ws://localhost:3001");

      this.socket.onopen = (event) => {
        console.log("Connected to the server!!!");
      }



        this.socket.onmessage = (message) => {
          console.log("message", message.data);
          let messageData = JSON.parse(message.data);
          let messages = that.state.messages.concat(messageData);
          switch(messageData.type) {
            case "incomingMessage":

              that.setState({messages: messages});

              break;
            case "incomingNotifcation":

              that.setState({messages: messages});

              break;
            case "onlineUsers":
            debugger
              that.setState({ activeUsers: messageData.users, messages: messages});
              debugger
              break;
            default:
              throw new Error("Unknown event type " + messageData.type);
          }
        }



      console.log("componentDidMount <App />");
    //   setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages});
    // }, 3000);
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



