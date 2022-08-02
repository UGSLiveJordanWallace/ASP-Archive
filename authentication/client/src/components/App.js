import React, { useState } from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        <div className="w-100" style={{minWidth: '500px'}}>
          <Router>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Redirect to="/signup" />
            </Switch>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
