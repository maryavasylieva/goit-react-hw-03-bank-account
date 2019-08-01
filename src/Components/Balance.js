import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';

const arrowDown = require('../Images/arrow-down.png');
const arrowUp = require('../Images/arrow-up.png');

const Balance = ({ balance, deposit, withdraw }) => (
  <section className={styles.balance}>
    <span role="img" aria-label="arrow-up">
      <img src={arrowUp} alt="arrow" />
    </span>
    <span className={styles.balanceSpan}>{deposit} $</span>
    <span role="img" aria-label="arrow-down">
      <img src={arrowDown} alt="arrow" />
    </span>
    <span className={styles.balanceSpan}>{withdraw} $</span>
    <span className={styles.balanceSpan}>Balance: {balance} $</span>
  </section>
);

Balance.propTypes = {
  withdraw: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  deposit: PropTypes.number.isRequired,
};

export default Balance;
