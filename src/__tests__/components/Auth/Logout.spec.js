import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import Logout from "../../../components/Auth/Logout";

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { loginData: null },
});

describe("render logout  form", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Logout />
      </Provider>
    );
  });
  test("should render logout component", () => {
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
  test("should submit logout form", () => {
    fireEvent.click(screen.getByText("Logout"));
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
