const moment = require('moment');

const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const Profit = require('../../../../Components/profit');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = async (sender, msg, client, users) => {
  const input = msg.substring('!PROFIT'.length).trim().toUpperCase();
  const { language } = users[sender.getSteamID64()];

  const period = () => {
    switch (utils.getPeriod(input)) {
      case 'DAILY':
        return {
          path: `Daily/${moment().format('DD-MM-YYYY')}`,
          period: 'DAILY',
        };

      case 'MONTHLY':
        return {
          path: `Monthly/${moment().format('MM-YYYY')}`,
          period: 'MONTHLY',
        };

      case 'YEARLY':
        return {
          path: `Yearly/${moment().format('YYYY')}`,
          period: 'YEARLY',
        };

      default:
        return {
          path: `Monthly/${moment().format('MM-YYYY')}`,
          period: 'MONTHLY',
        };
    }
  };

  try {
    const profit = await Profit.read(period().path);

    log.adminChat(sender.getSteamID64(), language, `[ !PROFIT ${input} ]`);
    let message = '/pre ';
    message += messages.PROFIT.RESPONSE[0][period().period][language];
    message += messages.PROFIT.RESPONSE[1][language].replace(
      '{AMOUNT}',
      profit.totaltrades
    );
    if (profit.status.csgo > 0) {
      message += messages.PROFIT.CSGO[language]
        .replace('{STATUS}', messages.PROFIT.PROFITED[language])
        .replace('{AMOUNT}', profit.status.csgo);
    }
    if (profit.status.hydra > 0) {
      message += messages.PROFIT.HYDRA[language]
        .replace('{STATUS}', messages.PROFIT.PROFITED[language])
        .replace('{AMOUNT}', profit.status.hydra);
    }
    if (profit.status.tf > 0) {
      message += messages.PROFIT.TF[language]
        .replace('{STATUS}', messages.PROFIT.PROFITED[language])
        .replace('{AMOUNT}', profit.status.tf);
    }
    if (profit.status.gems > 0) {
      message += messages.PROFIT.GEMS[language]
        .replace('{STATUS}', messages.PROFIT.PROFITED[language])
        .replace('{AMOUNT}', profit.status.gems);
    }
    message += messages.PROFIT.RESPONSE[2][language]
      .replace('{GEMS1}', profit.sell.csgo.gems)
      .replace('{GEMS2}', profit.sell.hydra.gems)
      .replace('{GEMS3}', profit.sell.tf.gems)
      .replace('{GEMS4}', profit.buy.csgo.gems)
      .replace('{GEMS5}', profit.buy.hydra.gems)
      .replace('{GEMS6}', profit.buy.tf.gems)
      .replace('{CSGOSELL}', profit.sell.csgo.currency)
      .replace('{HYDRASELL}', profit.sell.hydra.currency)
      .replace('{TFSELL}', profit.sell.tf.currency)
      .replace('{CSGOBUY}', profit.buy.csgo.currency)
      .replace('{HYDRABUY}', profit.buy.hydra.currency)
      .replace('{TFBUY}', profit.buy.tf.currency);

    message = filterCommands(message).join('\n');

    chatMessage(client, sender, message);
  } catch (error) {
    log.error(`An error occurred while getting profit.json: ${error}`);
  }
};
