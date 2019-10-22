import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Button, Grid, Header, List, Segment, Responsive } from 'semantic-ui-react';
import { AppContainer } from 'components';
import 'styling/semantic.less';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Responsive {...Responsive.onlyMobile}>
            <AppContainer mobile />
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <AppContainer />
          </Responsive>
        </div>
      </Router>
    );
  }
}

export default App;
