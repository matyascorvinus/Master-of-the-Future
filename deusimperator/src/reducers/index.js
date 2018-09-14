import { combineReducers } from 'redux'
import addHistoryReducer from './addHistoryReducer';

export default combineReducers({
    history:addHistoryReducer
})