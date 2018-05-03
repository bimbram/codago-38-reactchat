import React, {Component} from 'react';
import ChatEntry from './chat_entry';
import axios from 'axios'

class SubmitChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      textArea: '',
      chatEntry: []
    }
  }


  render() {
    let nodeChatEntry = this.state.chatEntry.map((item, index) => {
      return(
        <ChatEntry key={index} userName={item.userName} chatMessage={item.chatMessage} />
      )
    })

    return (
      <div>
      {nodeChatEntry}
      <article className="timeline-entry begin">
          <div className="timeline-entry-inner">
            <div className="timeline-icon" >
              <i className="entypo-camera">+</i>
            </div>
            <div className="timeline-label">
              <div className="form-group">
                <input type="text" className="form-control" name="" value={this.state.inputName}
                onChange={event => this.onInputChange(event.target.value)}
                placeholder="your name" /><br/>
                <textarea className="form-control"
                onChange={event => this.onTextAreaChange(event.target.value)}
                rows="8" cols="80" placeholder="enter your chat here..." value={this.state.textArea}></textarea>
                <br />
                <button
                onClick={event => this.onPostChat()}
                className="btn btn-primary">Post</button>
              </div>
            </div>
          </div>
      </article>
      </div>
    );
  }

  onInputChange(inputName) {
    this.setState({inputName});
  }
  onTextAreaChange(textArea) {
    this.setState({textArea})
  }

  onPostChat() {
    let chatEntry = this.state.chatEntry
    let inputName = this.state.inputName
    let textArea = this.state.textArea

    if(inputName === "" || textArea === "") {
      alert('please input both name and post')
      return;
    }
    chatEntry.push({userName:this.state.inputName, chatMessage:this.state.textArea})
    this.setState({chatEntry: chatEntry, inputName:"", textArea: ""})
    axios.post('http://localhost:3000/chatdata', {
        id: Date.now(),
        chatEntry: textArea,
        chatMessage: inputName
    }).then(function(response){
      console.log("masuk");
      console.log(response);
    }).catch(function(err) {
      console.error(err);
    })
  }

}


export default SubmitChat;
