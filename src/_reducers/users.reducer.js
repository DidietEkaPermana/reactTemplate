import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.PAGE_LOAD:
      return {
        ...state,
        pageState: 'list',
        title: 'Data Lists',
        searchText: ''
      }
    case userConstants.PAGE_LIST:
      return {
        ...state,
        pageState: 'list',
        title: 'Data Lists'
      }
    case userConstants.PAGE_VIEW:
      return {
        ...state,
        pageState: 'view',
        title: action.title
      }
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users,
        loading: false
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    case userConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.user,
        loading: false
      };
    case userConstants.GETBYID_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case userConstants.CHANGE_VALUE:
      return {
        ...state,
        item: action.item
      };
    case userConstants.CHANGE_SEARCH_VALUE:
        return {
          ...state,
          searchText: action.target
        };
    default:
      return state
  }
}