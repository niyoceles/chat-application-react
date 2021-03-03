import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../../../components/Auth/Signup";

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { loginData: null },
});

describe("render signup  form", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  });
  test("should render signup component", () => {
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
  });
  test("should submit signup form", () => {
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "Celestin" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "C#$@!#$" },
    });
    fireEvent.change(screen.getByPlaceholderText("confirm password"), {
      target: { value: "C#$@!#$" },
    });
    fireEvent.click(screen.getByText("Sign up"));
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });
});
