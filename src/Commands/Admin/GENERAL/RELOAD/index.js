const inventory = require('../../../../Components/inventory');
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users, community) => {
  const language = utils.getLanguage(sender.getSteamID64(), users);
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

  chatMessage(client, sender, messages.REQUEST[language]);
  log.adminChat(sender.getSteamID64(), language, '[ !RELOAD ]');
  inventory.loadInventory(client, community, load, () => {
    inventory.play(client);
    chatMessage(client, sender, messages.RELOAD[language]);
  });
};
