import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import { LocalStorageMock } from "@react-mock/localstorage";
import Chats from "../../../components/Chats/Chats";

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  chat: {
    allChats: [
      {
        message: "hello world",
        receiver: "Kaz",
        createdAt: Date.now(),
      },
    ],
  },
});

describe("render chats  form", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <LocalStorageMock items={{ IdToken: "Hello world" }}>
          <Chats />
        </LocalStorageMock>
      </Provider>
    );
  });
  test("should render chats component", () => {
    expect(screen.getByText("Chat one on one Application")).toBeInTheDocument();
  });
  test("should submit new chat", () => {
    fireEvent.change(screen.getByPlaceholderText("Type a message..."), {
      target: { value: "Hello there, how are you doing? " },
    });
    fireEvent.click(screen.getByText("Send"));
    expect(screen.getByText("Send")).toBeInTheDocument();
  });
});
