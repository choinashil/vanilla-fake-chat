import React, { Component } from 'react';
import ChatList from '../containers/ChatList';
import MessageList from '../containers/MessageList';
import NotFound from '../components/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('app did mount');
    // const data = {groups: {}, messages: {}, users: {}};
    // localStorage.setItem('data', JSON.stringify(data));
    this.getData();
  }

  getData() {
    // localstorage 비어있으면 
    // if (!localStorage.getItem('data')) {
      fetch('data/data.json')
      .then(res => res.json())
      .then(data => {
        this.setData(data);
      });
    // }
  }

  setData(data) {
    const newData = {
      groups: {},
      messages: {},
      users: {}
    };
    const { groups, messages, users } = newData;
    
    data.forEach(d => {
      if (!groups[d.group_id]) {
        groups[d.group_id] = {
          message_id: [d.message.id],
          user_id: [d.user.id]
        }
      } else {
        groups[d.group_id].message_id.push(d.message.id);
        if (!groups[d.group_id].user_id.includes(d.user.id)) {
          groups[d.group_id].user_id.push(d.user.id);
        }
      }

      messages[d.message.id] = {
        group: d.group_id,
        by: d.user.id,
        text: d.message.text,
        sent_at: d.message.sent_at
      }
      users[d.user.id] = {
        name: d.user.name,
        photo_url: d.user.photo
      }
    });

    for (let id in groups) {
      const usersExceptMe = groups[id].user_id.filter(user => user !== 1);
      if (usersExceptMe.length === 1) {
        groups[id].group_name = users[usersExceptMe[0]].name;
        groups[id].group_photo = users[usersExceptMe[0]].photo_url;
      } else {
        groups[id].group_name = `${users[usersExceptMe[0]].name} 외 ${usersExceptMe.length}명`;
        groups[id].group_photo = 'https://seegrid.com/wp-content/uploads/2016/09/team_icon_3.png';
      }
    }
    localStorage.setItem('data', JSON.stringify(newData));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ChatList} />
            <Route path="/:group_id" component={MessageList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
