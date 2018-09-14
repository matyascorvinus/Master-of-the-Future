import {HISTORY} from '../actions/type';

export default function (state = [],action) {
    
    switch(action.type)
    {      
        case(HISTORY):
        {
            //key:sessionID.toString(),uri:this.state.avatarSource,messageLine:this.state.content
            const historiesByKey = state.filter(history => history.key === action.payload.key)
            if (historiesByKey.length === 0) {
                return [...state, { key: action.payload.key,uri: action.payload.uri, messageLine:action.payload.messageLine}]
            }
            return [...state, {key: action.payload.key,uri: action.payload.uri, text:action.payload.text }]
        }
        default:return state;
    }

}