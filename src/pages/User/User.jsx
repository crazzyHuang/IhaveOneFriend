/**
 * Created by davidhuang on 2018/9/5
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  getData,
} from '../../modules/counter';
import Styles from './User.less';

class User extends Component {
  state = {};

  componentDidMount() {}

  incrementevent = e => {
    const { getData: getD } = this.props;
    getD();
  };

  render() {
    const { count } = this.props;
    return (
      <div className={Styles.body}>
        hello world!!!!
        <div>
          <span>{count}</span>
        </div>
        <input type="button" value="click" onClick={this.incrementevent} />
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      getData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
