import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Mytable from "./mytable";



const App = ({ location }) => {
  console.log("this");
  console.log(this);
  return (
    <div>
      <Mytable />
    </div>
  );
};

App.propTypes = {
};

export default App;
