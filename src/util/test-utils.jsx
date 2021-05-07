import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";

const WithProviders = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

const customRender = render(ui, { wrapper: WithProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
