import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Group from './Group';
import './GroupList.scss';

class GroupList extends Component {
  componentDidMount() {
    this.props.showGroupList();
  }
  
  render() {
    const { groupList, groupOrder } = this.props;
    return (
      <div className="GroupList">
        <div className="GroupList-title">CHAT</div>
        <div className="GroupList-add">+ New message</div>
        <div className="GroupList-list">
          {groupOrder && groupOrder.map(id => {
            return (
              <Link to={`/${id}`} key={id}>
                <Group groupList={groupList[id]} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GroupList;
