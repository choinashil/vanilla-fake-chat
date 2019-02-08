import React, { Component } from 'react';
import moment from 'moment';
import './Group.scss';

class Group extends Component {
  calculateDate(msgDateISO) {
    const yesterdayMs = new Date().getTime() - (24 * 60 * 60 * 1000);
    const yesterday = moment(new Date(yesterdayMs).toISOString()).format().slice(0, 10);
    const today = moment(new Date().toISOString()).format().slice(0, 10);
    const msgDate = moment(msgDateISO).format().slice(0, 10);
    const msgLocalDate = moment(msgDateISO).format();
    if (msgDate === today) {
      return msgLocalDate.slice(11, 16);
    } else if (msgDate === yesterday) {
      return '어제';
    } else if (today.slice(0, 5) === msgDate.slice(0, 5)) {
      return `${+msgLocalDate.slice(5, 7)}월 ${+msgLocalDate.slice(8, 10)}일`;
    } else {
      return `${msgLocalDate.slice(0, 4)}. ${+msgLocalDate.slice(5, 7)}. ${+msgLocalDate.slice(8, 10)}`;
    }
  }

  render() {
    const { groupList } = this.props;

    return (
      <div className="Group">
        <div className="Group-img">
          <img src={groupList.group_photo} alt="" />
        </div>
        <div className="Group-content">
          <div>{groupList.group_name}</div>
          <div>{groupList.last_msg_text}</div>
        </div>
        <div className="Group-date">
          {this.calculateDate(groupList.last_msg_sent_at)}
        </div>
      </div>
    );
  }
}

export default Group;
