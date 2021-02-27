import { combineReducers } from 'redux';
import auth from './authReducer';
import chat from './chatReducer';
import ui from './uiReducer';

export default combineReducers({
	auth,
	chat,
	ui,
});
