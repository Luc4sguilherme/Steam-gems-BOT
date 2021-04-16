const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');

module.exports = (sender, msg, client, users) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKCSGO ', ''), 10);
  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    log.userChat(
      sender.getSteamID64(),
      utils.getLanguage(sender.getSteamID64(), users),
      `[ !CHECKCSGO ${n} ]`
    );
    if (main.maxCheck.csgo >= n) {
      chatMessage(
        client,
        sender,
        messages.CHECK.CSGO[utils.getLanguage(sender.getSteamID64(), users)]
          .replace(/{CSGO}/g, n)
          .replace('{GEMS}', n * rates.csgo.sell)
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
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.CSGO[
        utils.getLanguage(sender.getSteamID64(), users)
      ].replace('{command}', '!CHECKCSGO 1')
    );
  }
};
