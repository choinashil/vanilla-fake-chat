import React, { Component } from 'react';
import moment from 'moment';

import './Group.scss';

class Group extends Component {
  calculateDate(msgDateISO) {
    // const localTime = moment(messages[groups[id].last_msg_id].sent_at).format();
    // console.log('date',date);
    // var now = new Date();
    
    
    // const dateISO = new Date().toISOString();
    // new Date(msgDateISO).getTime();

    // const msgDateMs = new Date(msgDateISO).getTime();
    // console.log('뺀거', nowMs, msgDateMs, nowMs - msgDateMs, aDay);

    // if (nowMs - msgDateMs < aDay) {
    //   return moment(msgDateISO).format().slice(11, 16);
    // }

    const nowISO = new Date().toISOString();
    const today = moment(nowISO).format().slice(0, 10);
    console.log('today',today);
    
    const nowMs = new Date().getTime();
    const aDay = 24 * 60 * 60 * 1000;
    const yesterdayMs = nowMs - aDay;
    var yesterday = moment(new Date(yesterdayMs).toISOString()).format().slice(0, 10);
    console.log('yesterday', yesterday);

    var msgDate = moment(msgDateISO).format().slice(0, 10);
    console.log('msgDate',msgDate);

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
          <img src={groupList.group_photo}/>
        </div>
        <div className="Group-content">
          <div>{groupList.group_name}</div>
          <div>{groupList.last_msg_text}</div>
        </div>
        <div className="Group-date">
          {/* {groupList.last_msg_sent_at} */}
          {this.calculateDate(groupList.last_msg_sent_at)}
        </div>
      </div>
    );
  }
}

export default Group;
