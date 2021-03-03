import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../../components/Auth/Login";

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { loginData: null },
});

describe("render login form", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
  test("should render Login component", () => {
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
  });
  test("should submit login form", () => {
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "Celestin" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "C#$@!#$" },
    });
    fireEvent.click(screen.getByTestId("submit-form"));
    expect(screen.getByTestId("submit-form")).toBeInTheDocument();
  });
});
