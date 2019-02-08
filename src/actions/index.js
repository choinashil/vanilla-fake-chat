import * as types from './actionTypes';

export function showGroupList(groups, messages, users) {
  return {
    type: types.SHOW_GROUP_LIST,
    groups,
    messages,
    users
  };
}

export function showGroupChat(groups, messages, users, groupId) {
  return {
    type: types.SHOW_GROUP_CHAT,
    groups,
    messages,
    users,
    groupId
  };
}
