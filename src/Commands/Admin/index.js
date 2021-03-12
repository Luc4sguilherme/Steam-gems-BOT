/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const main = require('../../Config/main');
const DEPOSITCSGO = require('./CSGO/DEPOSIT');
const WITHDRAWCSGO = require('./CSGO/WITHDRAW');
const DEPOSITGEMS = require('./GEMS/DEPOSIT');
const WITHDRAWGEMS = require('./GEMS/WITHDRAW');
const ADMIN = require('./GENERAL/ADMIN');
const AUTHCODE = require('./GENERAL/AUTHCODE');
const BLOCK = require('./GENERAL/BLOCK');
const BROADCAST = require('./GENERAL/BROADCAST');
const CANCEL = require('./GENERAL/CANCEL');
const DIE = require('./GENERAL/DIE');
const MYSTATS = require('./GENERAL/MYSTATS');
const PROFIT = require('./GENERAL/PROFIT');
const RELOAD = require('./GENERAL/RELOAD');
const RESTART = require('./GENERAL/RESTART');
const ROLLBACK = require('./GENERAL/ROLLBACK');
const UNBLOCK = require('./GENERAL/UNBLOCK');
const USERCHECK = require('./GENERAL/USERCHECK');
const DEPOSITHYDRA = require('./HYDRA/DEPOSIT');
const WITHDRAWHYDRA = require('./HYDRA/WITHDRAW');
const DEPOSITTF = require('./TF/DEPOSIT');
const WITHDRAWTF = require('./TF/WITHDRAW');

function admin(sender, msg, client, users, community, manager) {
  const input = msg.toUpperCase().split(' ')[0];
  const ignoreCommands = main.ignoreCommands.map((el) => el.toUpperCase());
  const { acceptedCurrencies } = main;

  if (ignoreCommands.includes(input)) {
    return 'UNKNOW';
  }

  for (const key in acceptedCurrencies) {
    if (typeof acceptedCurrencies[key] !== 'boolean') {
      throw new Error(
        'Error in configuring accepted currencies: not is boolean'
      );
    } else if (
      input.includes(key.replace('2', '')) &&
      !acceptedCurrencies[key]
    ) {
      return 'UNKNOW';
    }
  }

  switch (input) {
    case '!ADMIN':
      ADMIN(sender, client, users);
      break;
    case '!AUTHCODE':
      AUTHCODE(sender, client, users);
      break;
    case '!BLOCK':
      BLOCK(sender, msg, client, users);
      break;
    case '!BROADCAST':
      BROADCAST(sender, msg, client, users);
      break;
    case '!DIE':
      DIE(sender, client, users);
      break;
    case '!PROFIT':
      PROFIT(sender, client, users);
      break;
    case '!RELOAD':
      RELOAD(sender, client, users, community);
      break;
    case '!RESTART':
      RESTART(sender, client, users);
      break;
    case '!CANCEL':
      CANCEL(sender, msg, client, users, manager);
      break;
    case '!ROLLBACK':
      ROLLBACK(sender, msg, client, users, community, manager);
      break;
    case '!UNBLOCK':
      UNBLOCK(sender, msg, client, users);
      break;
    case '!USERCHECK':
      USERCHECK(sender, msg, client, users, community);
      break;
    case '!MYSTATS':
      MYSTATS(sender, client, users, community);
      break;
    case '!WITHDRAWCSGO':
      WITHDRAWCSGO(sender, msg, client, users, manager);
      break;
    case '!WITHDRAWGEMS':
      WITHDRAWGEMS(sender, msg, client, users, manager);
      break;
    case '!WITHDRAWHYDRA':
      WITHDRAWHYDRA(sender, msg, client, users, manager);
      break;
    case '!WITHDRAWTF':
      WITHDRAWTF(sender, msg, client, users, manager);
      break;
    case '!DEPOSITCSGO':
      DEPOSITCSGO(sender, msg, client, users, manager);
      break;
    case '!DEPOSITGEMS':
      DEPOSITGEMS(sender, msg, client, users, manager);
      break;
    case '!DEPOSITHYDRA':
      DEPOSITHYDRA(sender, msg, client, users, manager);
      break;
    case '!DEPOSITTF':
      DEPOSITTF(sender, msg, client, users, manager);
      break;
    default:
      return 'UNKNOW';
  }
}

module.exports = admin;
