const inventory = require('../../../../Components/inventory');
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, msg, client, users) => {
  const m = msg.toUpperCase().replace('!CHECK ', '');
  const n = parseInt(m, 10);
  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    if (main.maxCheck.csgo >= n) {
      log.userChat(
        sender.getSteamID64(),
        users[sender.getSteamID64()].language,
        `[ !CHECK ${n} ]`
      );

      chatMessage(
        client,
        sender,
        filterCommands(
          messages.CHECK.AMOUNT[users[sender.getSteamID64()].language]
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
          users[sender.getSteamID64()].language
        ].replace('{KEYS}', main.maxCheck.csgo)
      );
    }
  } else if (m === '!CHECK') {
    if (inventory.stock.gemsQuantity.tradable > 0) {
      log.userChat(
        sender.getSteamID64(),
        users[sender.getSteamID64()].language,
        '[ !CHECK ]'
      );
      chatMessage(
        client,
        sender,
        messages.REQUEST[users[sender.getSteamID64()].language]
      );

      const stock = inventory.stock.gemsQuantity.tradable;

      const cs = parseInt(stock / rates.csgo.sell, 10);
      const hydra = parseInt(stock / rates.hydra.sell, 10);
      const tf = parseInt(stock / rates.tf.sell, 10);

      let message = ' ';
      if (cs > 0) {
        message += messages.CHECK.DEFAULT.CURRENCIES.CSGO[
          users[sender.getSteamID64()].language
        ]
          .replace(/{CSGO}/g, cs)
          .replace('{GEMS1}', cs * rates.csgo.sell);
      }
      if (hydra > 0) {
        message += messages.CHECK.DEFAULT.CURRENCIES.HYDRA[
          users[sender.getSteamID64()].language
        ]
          .replace(/{HYDRA}/g, hydra)
          .replace('{GEMS2}', hydra * rates.hydra.sell);
      }
      if (tf > 0) {
        message += messages.CHECK.DEFAULT.CURRENCIES.TF[
          users[sender.getSteamID64()].language
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
            users[sender.getSteamID64()].language
          ]
        );
        return;
      }

      chatMessage(
        client,
        sender,
        messages.CHECK.DEFAULT.RESPONSE[users[sender.getSteamID64()].language]
          .replace('{MESSAGE}', message)
          .replace('{GEMS}', stock)
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.US[2][
          users[sender.getSteamID64()].language
        ]
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.UNKNOW.CUSTOMER[
        users[sender.getSteamID64()].language
      ]
    );
  }
};
