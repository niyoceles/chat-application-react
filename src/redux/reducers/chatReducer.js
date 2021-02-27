import {
	ADD_CHAT,
	GET_ALL_CHATS_FAILURE,
	GET_ALL_CHATS_SUCCESS,
	GET_ALL_USERS_FAILURE,
	GET_ALL_USERS_SUCCESS,
} from '../types';

const initialState = {
	chat: {},
	allChats: [],
	allUsers: [],
	addChatSuccess: null,
	addChatFailure: null,
	loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_CHATS_SUCCESS:
			return {
				...state,
				allChats: action.payload,
			};
		case GET_ALL_CHATS_FAILURE:
			return {
				...state,
				allChats: action.payload,
			};

		case GET_ALL_USERS_SUCCESS:
			return {
				...state,
				allUsers: action.payload,
			};
		case GET_ALL_USERS_FAILURE:
			return {
				...state,
				allUsers: action.payload,
			};
		case ADD_CHAT:
			return {
				...state,
				allChats: [action.payload, ...state.allChats],
				chat: action.payload,
				addChatSuccess: action.payload.message,
			};
		default:
			return state;
	}
}
