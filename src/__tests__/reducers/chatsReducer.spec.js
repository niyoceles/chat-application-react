import chatReducer from "../../redux/reducers/chatReducer";

const initialState = {
  chat: {},
  allChats: [],
  allUsers: [],
  addChatSuccess: null,
  addChatFailure: null,
  loading: false,
};
describe("test chat reducer", () => {
  test("should return default state", () => {
    const newState = chatReducer(initialState, { type: "HELLO_WORLD" });
    expect(newState).toEqual(initialState);
  });
  test("should return all chats", () => {
    const newState = chatReducer(initialState, {
      type: "GET_ALL_CHATS_SUCCESS",
      payload: [],
    });
    expect(newState).toEqual(initialState);
  });
  test("should return all chats failure", () => {
    const newState = chatReducer(initialState, {
      type: "GET_ALL_CHATS_FAILURE",
      payload: [],
    });
    expect(newState).toEqual(initialState);
  });
});
