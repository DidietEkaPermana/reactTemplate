import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    pageLoad,
    initData,
    getAll,
    getById,
    changeItemValue,
    changeSearchValue,
    // insert,
    // update,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function pageLoad(state, title){
    if(state === 'init')
        return { type: userConstants.PAGE_LOAD };
    else if(state === 'list')
        return { type: userConstants.PAGE_LIST };
    else if(state === 'view')
        return { type: userConstants.PAGE_VIEW, title: title };
}

function initData() {
    return dispatch => {
        const item = {
            id: 0,
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        }
        dispatch({ type: userConstants.CHANGE_VALUE, item })
    }
}

function changeSearchValue(target) {
    return dispatch => {
        dispatch({ type: userConstants.CHANGE_SEARCH_VALUE, target })
    }
}

function changeItemValue(target, item) {
    return dispatch => {
        const { name, value } = target;
        item[name] = value;
        dispatch({ type: userConstants.CHANGE_VALUE, item })
    }
}

function getAll(search) {
    return dispatch => {
        dispatch(request(search));

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(search) { return { type: userConstants.GETALL_REQUEST, search } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}