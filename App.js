import React from "react";
import HomeDT from "./screen/HomeDetail";
import HomeTT from "./screen/HomeTotal";
import HOMEC from "./screen/HomeCamera";
import Appnavigator from "./navigatiors/ScreenNavigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Appnavigator />
      {/* <HOMEC /> */}
    </Provider>
  )
}

