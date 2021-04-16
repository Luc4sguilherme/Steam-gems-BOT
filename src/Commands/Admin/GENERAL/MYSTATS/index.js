const customer = require('../../../../Components/customer');
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users, community) => {
  chatMessage(
    client,
    sender,
    messages.REQUEST[utils.getLanguage(sender.getSteamID64(), users)]
  );

  log.adminChat(
    sender.getSteamID64(),
    utils.getLanguage(sender.getSteamID64(), users),
    `[ !MYSTATS ]`
  );

  customer.loadInventory(sender.getSteamID64(), community, (err) => {
    if (err) {
      chatMessage(
        client,
        sender,
        messages.ERROR.LOADINVENTORY.THEM[0][
          utils.getLanguage(sender.getSteamID64(), users)
        ]
      );
    } else {
      const message = `/pre ${messages.ADMINCHECK.INVENTORY[
        utils.getLanguage(sender.getSteamID64(), users)
      ]
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
