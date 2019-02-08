import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Message from './Message';
import './GroupChat.scss';

class GroupChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.groupChat = React.createRef();
    this.groupId = this.props.match.params.group_id;
  }

  componentDidMount() {
    // console.log('mount', this.props.groupIds);
    this.props.showGroupChat(this.groupId);
  }

  componentDidUpdate(prevProps) {
    // console.log('update props', this.props);
    // if (prevProps.groupIds !== this.props.groupIds) {
    //   if (this.props.groupIds.includes(this.props.match.params.group_id)) {
    //     this.groupId = this.props.match.params.group_id;
    //     console.log('groupIdd',this.groupId);
    //     this.props.showGroupChat(this.groupId);
    //   }
    // }

    this.groupChat.current.scrollTop = this.groupChat.current.scrollHeight;
  }

  changeInput(e) {
    this.setState({inputValue: e.target.value});
  }

  setInput(e) {
    if (e.keyCode !== 13) return;
    const data = JSON.parse(localStorage.getItem('data'));
    const { groups, messages } = data;
    const newMsgId = Object.keys(messages).length + 1;
    messages[newMsgId] = {
      group: +this.groupId,
      by: 1,
      text: this.state.inputValue,
      sent_at: new Date().toISOString(),
    }
    groups[this.groupId].message_id.push(newMsgId);
    localStorage.setItem('data', JSON.stringify(data));

    this.props.showGroupChat(this.groupId);
    this.setState({inputValue: ''});
  }

  validateData(id, index) {
    const { messageIds, messageInfo } = this.props;
    const prevId = messageIds[index - 1]; 
    if (index === 0) return true;
    return (messageInfo[id].sent_at.slice(0, 10) !== messageInfo[prevId].sent_at.slice(0, 10)) ? true : false;
  }

  render() {
    const { groupName, messageIds, messageInfo, userInfo } = this.props;

    return (
      <div className="GroupChat">
        <div className="GroupChat-header">
          <Link to="/">
            <div>뒤로</div>
          </Link>
          <div>{groupName}</div>
        </div>
        <div className="GroupChat-content" ref={this.groupChat}>
          {messageIds && messageIds.map((id, index) => {
            const dayChanged = this.validateData(id, index);
            return (
              <Fragment key={index}>
                {dayChanged ? 
                  <div className="GroupChat-date">
                    <div>{messageInfo[id].sent_at.slice(0, 10)}</div>
                  </div> 
                : ''}
                <Message 
                  userCount={Object.keys(userInfo).length}
                  messageInfo={messageInfo[id]} 
                  userInfo={userInfo[messageInfo[id].by]} 
                />  
              </Fragment>); 
          })}
        </div>
        <div className="GroupChat-footer">
          <input type="text" 
            placeholder="Send message"
            value={this.state.inputValue}
            onChange={this.changeInput.bind(this)}
            onKeyDown={this.setInput.bind(this)}
          />
          <button 
            type="button"
            // onClick={this.setInput.bind(this)}
          >
            보내기
          </button>
        </div>
      </div>
    );
  }
}

export default GroupChat;
