import { USERS_PAGE_LOADED, USERS_PAGE_VIEW } from './Users.Action'

export default (state = {}, action) => {
    switch(action.type) {
        case USERS_PAGE_LOADED:
            return {
                ...state,
                pageState: 'list'
            };
        case USERS_PAGE_VIEW:
            return {
                ...state,
                pageState: 'view',
                id: action.value
            }
        default:
            return state;
    }
}