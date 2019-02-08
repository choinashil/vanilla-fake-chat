import React, { Component, Fragment } from 'react';
import './Message.scss';

class Message extends Component {
  changeTimeForm(date) {
    // console.log('time', date);
    // let time = date.slice(11, 16);
    let hours = date.slice(11, 13);
    let minutes = date.slice(14, 16);
    if (hours < 13) {
      hours = `오전 ${hours}`;
    } else {
      hours = `오후 ${hours - 12}`;
    }
    return `${hours}:${minutes}`;
  }

  render() {
    // console.log('aaaaaa',this.props);
    const { messageInfo, userInfo, userCount } = this.props;
    
    return (
      <div className={messageInfo.by === 1 ? "Message right" : "Message left"}>
        <div className="Message-user-photo">
          <img src={userInfo.photo} />
        </div>
        <div className="Message-text">
          <div>
            {userCount < 3 || messageInfo.by === 1 ? '' : userInfo.name}
          </div>
          <div>{messageInfo.text}</div>
        </div>
        <div className="Message-time">{this.changeTimeForm(messageInfo.sent_at)}</div>
      </div>
    );
  }
}

export default Message;
