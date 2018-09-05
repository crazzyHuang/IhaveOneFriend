/**
 * Created by davidhuang on 2018/9/5
 */

import React, { Component } from 'react';
import Styles from './User.less';

class User extends Component {
  state = {};

  componentWillMount() {}

  componentDidMount() {
    console.info('this.props', this.props);
  }

  render() {
    return <div className={Styles.body}>hello world!!!!</div>;
  }
}

export default User;
