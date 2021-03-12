const inventory = require('../../../../Components/inventory');
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');

module.exports = (sender, client, users, community) => {
  const load = ['GEMS'];

  Object.keys(main.acceptedCurrencies).forEach((currency) => {
    if (main.acceptedCurrencies[currency]) {
      if (currency === 'HYDRA') {
        load.push(currency);
      } else {
        load.unshift(currency);
      }
    }
  });

  chatMessage(
    client,
    sender,
    messages.REQUEST[users[sender.getSteamID64()].language]
  );
  log.adminChat(
    sender.getSteamID64(),
    users[sender.getSteamID64()].language,
    '[ !RELOAD ]'
  );
  inventory.loadInventory(client, community, load, () => {
    inventory.play(client);
    chatMessage(
      client,
      sender,
      messages.RELOAD[users[sender.getSteamID64()].language]
    );
  });
};
