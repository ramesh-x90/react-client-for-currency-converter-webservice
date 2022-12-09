import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavBar } from "./Components";
import { ConverterPage } from "./pages";
import { CurrencyConverterContextProvider } from "./Context/Context";

function App() {
  return (
    <div className="select-none">
      <CurrencyConverterContextProvider>
        <NavBar></NavBar>
        <ConverterPage></ConverterPage>
      </CurrencyConverterContextProvider>
    </div>
  );
}

export default App;
