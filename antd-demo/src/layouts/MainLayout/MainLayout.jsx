import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import styles from './MainLayout.less';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <h1>Todo App</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <h2>Filters:</h2>
          <Link to="/">添加</Link><br />
          <Link to="/search">搜索与删除</Link><br />
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>

    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;

/*
 <div className={styles.foot}>
 Built with react, react-router, ant-tool, css-modules, antd...
 </div>
 */
