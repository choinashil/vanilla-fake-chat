import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Group from './Group';
import './GroupList.scss';

class GroupList extends Component {
  componentDidMount() {
    // console.log('grouplist did mount', JSON.parse(localStorage.getItem('data')));
    // const data = {groups: {}, messages: {}, users: {}};
    localStorage.setItem('data', JSON.stringify(data));

  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.groupList !== this.props.groupList) {
    //   this.props.getData();
    // }
    // if (JSON.parse(localStorage.getItem('data')).groups)
    // console.log('$$$',JSON.parse(localStorage.getItem('data')).groups);
    // console.log('grouplist 이전 현재 props',prevProps, this.props);
    // console.log('grouplist 이전 현재 state',prevState, this.state);
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
