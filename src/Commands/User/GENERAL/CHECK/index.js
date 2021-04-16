const inventory = require('../../../../Components/inventory');
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, msg, client, users) => {
  const m = msg.toUpperCase().replace('!CHECK ', '');
  const n = parseInt(m, 10);
  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    if (main.maxCheck.csgo >= n) {
      log.userChat(
        sender.getSteamID64(),
        utils.getLanguage(sender.getSteamID64(), users),
        `[ !CHECK ${n} ]`
      );

      chatMessage(
        client,
        sender,
        filterCommands(
          messages.CHECK.AMOUNT[utils.getLanguage(sender.getSteamID64(), users)]
            .replace(/{AMOUNT}/g, n)
            .replace('{CSGOSELL}', n * rates.csgo.sell)
            .replace('{TFSELL}', n * rates.tf.sell)
            .replace('{HYDRASELL}', n * rates.hydra.sell)
        ).join('\n')
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.INPUT.AMOUNTOVER.CSGO[
          utils.getLanguage(sender.getSteamID64(), users)
        ].replace('{KEYS}', main.maxCheck.csgo)
      );
    }
  } else if (m === '!CHECK') {
    if (inventory.stock.gemsQuantity.tradable > 0) {
      log.userChat(
        sender.getSteamID64(),
        utils.getLanguage(sender.getSteamID64(), users),
        '[ !CHECK ]'
      );
      chatMessage(
        client,
        sender,
        messages.REQUEST[utils.getLanguage(sender.getSteamID64(), users)]
      );

      const stock = inventory.stock.gemsQuantity.tradable;

      const cs = parseInt(stock / rates.csgo.sell, 10);
      const hydra = parseInt(stock / rates.hydra.sell, 10);
      const tf = parseInt(stock / rates.tf.sell, 10);

      let message = ' ';
      if (cs > 0) {
        message += messages.CHECK.DEFAULT.CURRENCIES.CSGO[
          utils.getLanguage(sender.getSteamID64(), users)
        ]
          .replace(/{CSGO}/g, cs)
          .replace('{GEMS1}', cs * rates.csgo.sell);
      }
      if (hydra > 0) {
        message += messages.CHECK.DEFAULT.CURRENCIES.HYDRA[
          utils.getLanguage(sender.getSteamID64(), users)
        ]
          .replace(/{HYDRA}/g, hydra)
          .replace('{GEMS2}', hydra * rates.hydra.sell);
      }
      if (tf > 0) {
        message += messages.CHECK.DEFAULT.CURRENCIES.TF[
          utils.getLanguage(sender.getSteamID64(), users)
        ]
          .replace(/{TF}/g, tf)
          .replace('{GEMS3}', tf * rates.tf.sell);
      }

      message = filterCommands(message).join('\n');

      if (!message.includes('•')) {
        chatMessage(
          client,
          sender,
          messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.US[2][
            utils.getLanguage(sender.getSteamID64(), users)
          ]
        );
        return;
      }

      chatMessage(
        client,
        sender,
        messages.CHECK.DEFAULT.RESPONSE[
          utils.getLanguage(sender.getSteamID64(), users)
        ]
          .replace('{MESSAGE}', message)
          .replace('{GEMS}', stock)
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.US[2][
          utils.getLanguage(sender.getSteamID64(), users)
        ]
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.UNKNOW.CUSTOMER[
        utils.getLanguage(sender.getSteamID64(), users)
      ]
    );
  }
};
