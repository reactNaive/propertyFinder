import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Form1 from "./Form1";
//import mytable from "./";

const App = ({ location }) => {
  return (
    <div>
      <Form1 />

    </div>
  );
};

App.propTypes = {
};

export default App;
