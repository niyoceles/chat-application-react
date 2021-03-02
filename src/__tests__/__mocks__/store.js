import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../redux/store/index';

export const middleWares = [thunk];
export const mockStore = configureMockStore(middleWares);
export default mockStore(initialState);
