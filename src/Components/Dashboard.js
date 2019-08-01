import React, { Component } from 'react';
import styles from './Dashboard.module.css';
import Balance from './Balance';
import TransactionHistory from './TransactionHistory';
import Controls from './Controls';

const shortid = require('shortid');

class Dashboard extends Component {
  state = { transactions: [], balance: 0 };

  componentDidMount() {
    if (localStorage.getItem('transactions')) {
      const savedTransaction = JSON.parse(localStorage.getItem('transactions'));
      this.setState({
        transactions: savedTransaction,
        balance:
          this.toGetAmount(savedTransaction, 'Deposit') -
          this.toGetAmount(savedTransaction, 'Withdraw'),
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevState, prevProps) {
    const { transactions } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }

  toAddTransaction = transaction => {
    const newTransaction = {
      id: shortid.generate(),
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      ...transaction,
    };

    this.setState(state => ({
      transactions: [...state.transactions, newTransaction],
      balance:
        newTransaction.type === 'Deposit'
          ? state.balance + Number(newTransaction.amount)
          : state.balance - Number(newTransaction.amount),
    }));
  };

  toGetAmount = (arr, type) =>
    arr
      .filter(el => el.type === type)
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

  // toWithdraw = arr =>
  //   arr
  //     .filter(el => el.type === 'Withdraw')
  //     .reduce((acc, cur) => acc + Number(cur.amount), 0);

  render() {
    const { transactions, balance } = this.state;
    return (
      <div className={styles.dashboard}>
        <Controls balance={balance} toAddTransaction={this.toAddTransaction} />
        <Balance
          balance={balance}
          withdraw={this.toGetAmount(transactions)}
          deposit={this.toGetAmount(transactions)}
        />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
