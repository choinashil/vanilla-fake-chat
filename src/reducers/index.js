import * as types from '../actions/actionTypes';
import moment from 'moment';

const initialState = {};

export default (state = initialState, action) => {
  const { groups, messages, users, groupId } = action;
  switch(action.type) {
    case types.SHOW_GROUP_LIST:
      let groupList = {};
      let groupOrder = [];

      for (let id in groups) {
        groupList[id] = {};
        groupList[id].group_name = groups[id].group_name;
        groupList[id].group_photo = groups[id].group_photo;
        groups[id].last_msg_id = Math.max(...groups[id].message_id);
        groupList[id].last_msg_text = messages[groups[id].last_msg_id].text;
        groupList[id].last_msg_sent_at = messages[groups[id].last_msg_id].sent_at;
        groupOrder.push([id, groups[id].last_msg_id]);
      }
      groupOrder.sort((a, b) => b[1] - a[1]);
      groupOrder = groupOrder.map(g => g[0]); 

      return ({
        groupList,
        groupOrder
      });

    case types.SHOW_GROUP_CHAT:
      let messageInfo = {};
      let userInfo = {};
      
      groups[groupId].message_id.map(id => {
        const localTime = moment(messages[id].sent_at).format().replace(/-/g, '.');;
        messageInfo[id] = {
          by: messages[id].by,
          sent_at: localTime,
          text: messages[id].text
        }
      });

      groups[groupId].user_id.map(id => {
        userInfo[id] = {
          name: users[id].name,
          photo: users[id].photo_url
        }
      });

      return ({
        groupName: groups[groupId].group_name,
        groupIds: Object.keys(groups), // needed?
        messageIds: groups[groupId].message_id,
        messageInfo,
        userInfo
      });

    default: 
      return state;
  } 
}
