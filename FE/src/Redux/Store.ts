import { createStore } from 'redux';

const reducerFnTitleApp = (state = { titleApp: 'Interior' }, action) => {
    switch (action.type) {
        case "Title_change_1":
            return {titleApp : 'Interior'};
        
        case "Title_change_2":
            return {titleApp : 'Home | Shops'};
        default:
            return state

    }
}


export const storeTitleApp = createStore(reducerFnTitleApp);