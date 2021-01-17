import React from "react";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import '../style/App.css';
import HomePage from "./HomePage";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const getDarkModeStatus = () => {
  return localStorage.getItem('darkMode');
}

const theme = createMuiTheme({
  type: 'light',
  direction: 'rtl',
})

const darkTheme = createMuiTheme({
  type: 'dark',
})

const App = () => {
  return (
    <ThemeProvider theme={getDarkModeStatus() ? darkTheme : theme}>
      <StylesProvider jss={jss}>
        <HomePage />
      </StylesProvider>
    </ThemeProvider>
  );

}

export default App;
