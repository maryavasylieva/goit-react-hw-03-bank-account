import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import notyf from './notification';
import 'react-toastify/dist/ReactToastify.css';

class Controls extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    toAddTransaction: PropTypes.func.isRequired,
  };

  state = { amount: '' };

  handleClick = e => {
    const { amount } = this.state;
    const amountNumber = Number(amount);

    if (amountNumber < 0) return toast.error(notyf.error);
    if (amountNumber === 0) {
      return toast.error(notyf.addNum);
    }
    if (e.target.name === 'Withdraw') {
      if (amountNumber > this.props.balance) {
        return toast.error(notyf.toNull);
      }
    }
    toast.success(notyf.success);
    this.props.toAddTransaction({ ...this.state, type: e.target.name });
    return this.setState({ amount: '' });
  };

  handleChange = e => this.setState({ amount: e.target.value });

  render() {
    const { amount } = this.state;
    return (
      <section className={styles.controls}>
        <input type="number" value={amount} onChange={this.handleChange} />
        <button type="button" name="Deposit" onClick={this.handleClick}>
          Deposit
        </button>
        <button type="button" name="Withdraw" onClick={this.handleClick}>
          Withdraw
        </button>
        <ToastContainer closeButton={false} />
      </section>
    );
  }
}

export default Controls;
