import { SWITCH_MENU } from '../const/index'
const init = {
    menuName: '首页'
}

export const menu = (state = init, action) => {
    console.log(action, 'action');
    switch (action.type) {
        case SWITCH_MENU:
            return {
                ...state,
                menuName: action.data
            }
        default:
            return state;
    }
}
