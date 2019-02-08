import { connect } from 'react-redux';
import { showGroupList } from '../actions';
import GroupList from '../components/GroupList';

const mapStateToProps = ({ groupList, groupOrder }) => ({
  groupList, 
  groupOrder
});

const mapDispatchToProps = dispatch => ({
  getData: () => {
    const data = JSON.parse(localStorage.getItem('data'));
    console.log('dataa',data);
    const { groups, messages, users } = data;
    dispatch(showGroupList(groups, messages, users));
  }
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(GroupList);
