import React, { Fragment } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import FavsList from "./components/FavsList";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#ED1D24", contrastText: "#fff" },

    secondary: { main: "#ffffff", contrastText: "#000" },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={CharactersList} />
            <Route path="/heroe/:id" component={CharacterDetail} />
            <Route path="/favs" component={FavsList} />
          </Switch>
        </Router>
      </Fragment>
    </MuiThemeProvider>
  );
}

export default App;
