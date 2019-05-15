import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import View from './View'
import Search from './Search';

class Crud extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(userActions.pageLoad('init'));
        
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchUser = this.handleSearchUser.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleCloseUser = this.handleCloseUser.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
    }

    handleSearchChange(e) {
        const { value } = e.target;
        this.props.dispatch(userActions.changeSearchValue(value));
    }

    handleSearchUser() {
        const { users } = this.props;
        this.props.dispatch(userActions.getAll(users.searchText));
    }

    handleItemChange(e) {
        const { users } = this.props;
        this.props.dispatch(userActions.changeItemValue(e.target, users.item));
    }

    handleAddUser() {
        this.props.dispatch(userActions.initData());
        this.props.dispatch(userActions.pageLoad('view', 'Add Data'));
    }

    handleEditUser(id) {
        this.props.dispatch(userActions.initData());
        this.props.dispatch(userActions.getById(id));
        this.props.dispatch(userActions.pageLoad('view', 'Edit Data'));
    }

    handleDeleteUser(id) {
        console.log('delete ' + id);
    }

    handleCloseUser() {
        this.props.dispatch(userActions.pageLoad('list'));
    }

    handleSubmitUser() {
        const { users } = this.props;

        console.log(users.item);
        this.props.dispatch(userActions.pageLoad('list'));
    }

    render() {
        const { users } = this.props;

        return (
            <div className="animated fadeIn">
                {users.pageState === 'list' ?
                    <Search items={users} title={users.title} search={users.searchText} onSearch={this.handleSearchUser} onHandleChange={this.handleSearchChange} onAdd={this.handleAddUser} onEdit={this.handleEditUser} onDelete={this.handleDeleteUser}></Search> :
                    <View data={users} title={users.title} onHandleChange={this.handleItemChange} onClose={this.handleCloseUser} onSubmit={this.handleSubmitUser}></View>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});


export default connect(mapStateToProps)(Crud);
