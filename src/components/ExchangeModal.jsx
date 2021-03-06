import React from 'react';
import { Modal } from 'minimal-react-modal';
import { view } from 'react-easy-state';
import PropTypes from 'prop-types';

import amountFormatter from '../utils/amountFormatter';
import ConnectWeb3Button from './ConnectWeb3Button';
import eth from '../stores/eth';
import exchangeModal from '../stores/exchangeModal';
import If from './If';
import myAccount from '../stores/myAccount';
import Unless from './Unless';

const ExchangeModal = ({ mixpanel }) => {
  const { account } = eth;

  const airdropRequired = myAccount.airdropRequired();
  const sufficientAllowance = exchangeModal.sufficientAllowance();

  return (
    <Modal
      className="exchange-modal"
      isActive={exchangeModal.isActive}
      closeModal={exchangeModal.close}
      modalBoxStyle={{
        width: '90%',
        maxWidth: 600,
        padding: '5%',
        textAlign: 'center',
      }}
    >
      <div className="title">Buy AWP++</div>
      <div className="text">
        Diversified exposure across equity, commodities, t-bills (20y/3y), crypto & DeFi, plus,
        automatic rebalancing.
      </div>

      <div className="container">
        <div className={exchangeModal.inputError ? 'input-container error' : 'input-container'}>
          <div className="top">
            <div className="left">Input</div>
            <div className="right">
              Balance:&nbsp;
              {amountFormatter(myAccount.data.daiBalance)}
              &nbsp;DAI
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <input
                onChange={exchangeModal.inputChange}
                value={exchangeModal.inputValue}
                key="invest-buy-input"
                placeholder="0.0"
                type="number"
                id="invest-buy-input"
                name="investBuyInput"
              />
            </div>
            <div className="right">
              <button type="button" className="btn-max" onClick={exchangeModal.max}>
                <span className="btn-content">
                  <span>MAX</span>
                </span>
              </button>
              <button type="button" className="btn-uniswap">
                <span className="btn-content">
                  <img src="/assets/img/dai.png" className="DAI-logo" alt="logo" />
                  <span>DAI</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="arrow">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE" />
          </svg>
        </div>
        <div className="input-container lg:min-w-300px">
          <div className="top">
            <div className="left">Output</div>
            <div className="right" />
          </div>
          <div className="bottom">
            <div className="left">
              <input
                onChange={exchangeModal.outputChange}
                value={exchangeModal.outputValue}
                key="invest-buy-output"
                placeholder="0.0"
                type="number"
                id="invest-buy-output"
                name="investBuyOutput"
              />
            </div>
            <div className="right">
              <button type="button" className="btn-uniswap lg:pr-10px">
                <span className="btn-content">
                  <img src="/assets/img/portfolio_02.png" className="AWP-logo" alt="logo" />
                  <span>AWP++</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="exchange-rate-label">
          <div className="top">
            <div className="left">Exchange Rate</div>
            <div className="right">
              1 AWP ++ =&nbsp;
              {amountFormatter(exchangeModal.exchangeRate)
                || amountFormatter(exchangeModal.marketRate)
                || '-'}
              &nbsp;DAI
            </div>
          </div>
          <div className="top">
            <div className="left">Minimum Output Amount</div>
            <div>
              {exchangeModal.minAmount
                ? exchangeModal.minAmount.toFixed(4)
                : '-'}
              AWP++
            </div>
          </div>
        </div>
        <div className="slippage-label">
          <div className="top">
            <div className="left">Potential Slippage</div>
            <div className="right">
              {exchangeModal.slippage()}
              %
            </div>
          </div>
        </div>

        <Unless condition={account}>
          <ConnectWeb3Button />
        </Unless>

        <If condition={account}>
          <If condition={airdropRequired}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                myAccount.airdrop();
                mixpanel.cta({
                  position: 'AWP++ Buy Modal',
                  type: 'button',
                  label: 'get eth',
                });
              }}
            >
              Get Some ETH & DAI
            </button>
          </If>

          <Unless condition={airdropRequired}>
            <Unless condition={sufficientAllowance}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  exchangeModal.approve();
                  mixpanel.cta({
                    position: 'AWP++ Buy Modal',
                    type: 'button',
                    label: 'approve dai',
                  });
                }}
              >
                Unlock DAI
              </button>
            </Unless>

            <If condition={sufficientAllowance}>
              <button
                type="button"
                className="btn btn-primary"
                disabled={exchangeModal.inputError}
                onClick={() => {
                  exchangeModal.buy();
                  mixpanel.cta({
                    position: 'AWP++ Buy Modal',
                    type: 'button',
                    label: 'Buy',
                  });
                }}
              >
                Buy
              </button>
            </If>
          </Unless>
        </If>
      </div>

      <a
        href="https://uniswap.exchange"
        target="_blank"
        className="uniswap-credit"
        rel="noopener noreferrer"
      >
        Powered by
        <span role="img" aria-label="Unicorn"> 🦄 </span>
        Uniswap
      </a>
    </Modal>
  );
};

ExchangeModal.propTypes = {
  mixpanel: PropTypes.shape({
    cta: PropTypes.func.isRequired,
  }).isRequired,
  links: PropTypes.shape({
    portfolio: PropTypes.func.isRequired,
  }).isRequired,
};

export default view(ExchangeModal);
