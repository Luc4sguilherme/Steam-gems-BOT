const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');

const utils = require('../../Utils');
const log = require('../log');
const Profit = require('./constants/profit');

const init = async (period) => {
  try {
    if (!fs.existsSync(`./Data/History/Profit/${period}.json`)) {
      await utils.writeFileAsync(
        `./Data/History/Profit/${period}.json`,
        JSON.stringify(Profit),
        {
          flags: 'w',
        }
      );
    }
  } catch (error) {
    log.error(`An error occurred while initializing profit file: ${error}`);
  }
};

const read = async (period) => {
  await init(period);

  return JSON.parse(
    await utils.readFileAsync(`./Data/History/Profit/${period}.json`)
  );
};

const write = async (profit, period) => {
  try {
    const add = (a, b) => _.defaultTo(_.add(a, b), undefined);
    const data = await read(period);
    const profited = _.mergeWith({}, data, profit, add);

    await utils.writeFileAsync(
      `./Data/History/Profit/${period}.json`,
      JSON.stringify(profited)
    );
  } catch (error) {
    log.error(`An error occurred while writing profit file: ${error}`);
  }
};

const calculate = async (offer) => {
  try {
    const profit = _.cloneDeep(Profit);

    if (offer.data('commandused').search(/BUY/) !== -1) {
      profit.totaltrades += 1;
      if (offer.data('commandused').search(/CSGO/) !== -1) {
        profit.buy.csgo.gems += parseInt(offer.data('amountofgems'), 10);
        profit.buy.csgo.currency += parseInt(offer.data('amountofkeys'), 10);
        profit.status.csgo += parseInt(offer.data('amountofkeys'), 10);
        profit.status.gems -= parseInt(offer.data('amountofgems'), 10);
      }
      if (offer.data('commandused').search(/HYDRA/) !== -1) {
        profit.buy.hydra.gems += parseInt(offer.data('amountofgems'), 10);
        profit.buy.hydra.currency += parseInt(offer.data('amountofkeys'), 10);
        profit.status.hydra += parseInt(offer.data('amountofkeys'), 10);
        profit.status.gems -= parseInt(offer.data('amountofgems'), 10);
      }
      if (offer.data('commandused').search(/TF/) !== -1) {
        profit.buy.tf.gems += parseInt(offer.data('amountofgems'), 10);
        profit.buy.tf.currency += parseInt(offer.data('amountofkeys'), 10);
        profit.status.tf += parseInt(offer.data('amountofkeys'), 10);
        profit.status.gems -= parseInt(offer.data('amountofgems'), 10);
      }
    }
    if (offer.data('commandused').search(/SELL/) !== -1) {
      profit.totaltrades += 1;
      if (offer.data('commandused').search(/CSGO/) !== -1) {
        profit.sell.csgo.gems += parseInt(offer.data('amountofgems'), 10);
        profit.sell.csgo.currency += parseInt(offer.data('amountofkeys'), 10);
        profit.status.csgo -= parseInt(offer.data('amountofkeys'), 10);
        profit.status.gems += parseInt(offer.data('amountofgems'), 10);
      }
      if (offer.data('commandused').search(/HYDRA/) !== -1) {
        profit.sell.hydra.gems += parseInt(offer.data('amountofgems'), 10);
        profit.sell.hydra.currency += parseInt(offer.data('amountofkeys'), 10);
        profit.status.hydra -= parseInt(offer.data('amountofkeys'), 10);
        profit.status.gems += parseInt(offer.data('amountofgems'), 10);
      }
      if (offer.data('commandused').search(/TF/) !== -1) {
        profit.sell.tf.gems += parseInt(offer.data('amountofgems'), 10);
        profit.sell.tf.currency += parseInt(offer.data('amountofkeys'), 10);
        profit.status.tf -= parseInt(offer.data('amountofkeys'), 10);
        profit.status.gems += parseInt(offer.data('amountofgems'), 10);
      }
    }

    await write(profit, `Daily/${moment().format('DD-MM-YYYY')}`);
    await write(profit, `Monthly/${moment().format('MM-YYYY')}`);
    await write(profit, `Yearly/${moment().format('YYYY')}`);
  } catch (error) {
    log.error(`An error occurred while calculating profit: ${error}`);
  }
};

module.exports = { calculate, read };
