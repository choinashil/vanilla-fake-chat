import { connect } from 'react-redux';
import { showGroupList } from '../actions';
import GroupList from '../components/GroupList';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  showGroupList: () => {
    const data = JSON.parse(localStorage.getItem('data'));
    const { groups, messages, users } = data;
    dispatch(showGroupList(groups, messages, users));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupList);
