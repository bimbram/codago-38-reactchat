import React, {Component} from 'react';

const ChatEntry = (props) => {
  console.log(props);
    return (
      <article className="timeline-entry">
        <div className="timeline-entry-inner">
          <div className="timeline-icon bg-success">
            <i className="entypo-feather">-</i>
          </div>
          <div className="timeline-label">
            <h2><a href="#">{props.userName}</a> </h2>
            <p>{props.chatMessage}</p>
          </div>
        </div>
      </article>
    );
}


export default ChatEntry;
