import { connect } from 'react-redux';
import { showGroupChat } from '../actions';
import GroupChat from '../components/GroupChat';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  showGroupChat: (groupId) => {
    const data = JSON.parse(localStorage.getItem('data'));
    const { groups, messages, users } = data;
    dispatch(showGroupChat(groups, messages, users, groupId));
  }
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(GroupChat);
