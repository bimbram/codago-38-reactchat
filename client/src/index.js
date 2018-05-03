import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SubmitChat from './components/submit_chat'
import openSocket from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const socket = openSocket('http://localhost:3000')
    // var socket = io.connect('http://localhost:3000');
    socket.on('chatupdate', function (data) {
      console.log(data);
    });

  }

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="timeline-centered">
      <SubmitChat />
      </div>
      </div>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector('.app-container'));
