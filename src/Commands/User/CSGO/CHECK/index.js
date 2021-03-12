const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');

module.exports = (sender, msg, client, users) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKCSGO ', ''), 10);
  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    log.userChat(
      sender.getSteamID64(),
      users[sender.getSteamID64()].language,
      `[ !CHECKCSGO ${n} ]`
    );
    if (main.maxCheck.csgo >= n) {
      chatMessage(
        client,
        sender,
        messages.CHECK.CSGO[users[sender.getSteamID64()].language]
          .replace(/{CSGO}/g, n)
          .replace('{GEMS}', n * rates.csgo.sell)
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
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.CSGO[
        users[sender.getSteamID64()].language
      ].replace('{command}', '!CHECKCSGO 1')
    );
  }
};
