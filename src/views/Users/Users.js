import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List'
import View from './View'

import usersData from './UsersData'

import {
  USERS_PAGE_LOADED,
  USERS_PAGE_VIEW
} from './Users.Action';

const mapStateToProps = state => ({ 
  ...state
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: USERS_PAGE_LOADED }),
  onView: value =>
    dispatch({ type: USERS_PAGE_VIEW, value })
});

class Users extends Component {

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    if (this.props.Users.pageState === 'list') {

      const userList = usersData.filter((user) => user.id < 10);

      return (
        <div className="animated fadeIn">
          <List userList={userList} onView={this.props.onView}></List>
        </div>
      )
    }
    else if(this.props.Users.pageState === 'view'){
      const user = usersData.find(user => user.id === this.props.Users.id)
      return (
        <div className="animated fadeIn">
          <View user={user}></View>
        </div>
      )
    }

    return (
      <div className="animated fadeIn">
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
