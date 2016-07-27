import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Form from "./Form_nouse";

const App = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

App.propTypes = {
};

export default App;
