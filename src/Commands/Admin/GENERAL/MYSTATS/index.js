const customer = require('../../../../Components/customer');
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users, community) => {
  const language = utils.getLanguage(sender.getSteamID64(), users);

  chatMessage(client, sender, messages.REQUEST[language]);
  log.adminChat(sender.getSteamID64(), language, `[ !MYSTATS ]`);

  customer.loadInventory(sender.getSteamID64(), community, (err) => {
    if (err) {
      chatMessage(
        client,
        sender,
        messages.ERROR.LOADINVENTORY.THEM[0][language]
      );
    } else {
      const message = `/pre ${messages.ADMINCHECK.INVENTORY[language]
        .replace('{CSKEYSTRADABLE}', customer.stock.csKeys.tradable)
        .replace('{HYDRAKEYSTRADABLE}', customer.stock.hydraKeys.tradable)
        .replace('{TFKEYSTRADABLE}', customer.stock.tfKeys.tradable)
        .replace('{GEMSQUANTITYTRADABLE}', customer.stock.gemsQuantity.tradable)
        .replace('{CSKEYSNOTRADABLE}', customer.stock.csKeys.notradable)
        .replace('{HYDRAKEYSNOTRADABLE}', customer.stock.hydraKeys.notradable)
        .replace('{TFKEYSNOTRADABLE}', customer.stock.tfKeys.notradable)
        .replace(
          '{GEMSQUANTITYNOTRADABLE}',
          customer.stock.gemsQuantity.notradable
        )}`;

      chatMessage(client, sender, message);
    }
  });
};
