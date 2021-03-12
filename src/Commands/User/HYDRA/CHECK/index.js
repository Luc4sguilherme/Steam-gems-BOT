const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');

module.exports = (sender, msg, client, users) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKHYDRA ', ''), 10);
  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    log.userChat(
      sender.getSteamID64(),
      users[sender.getSteamID64()].language,
      `[ !CHECKHYDRA ${n} ]`
    );
    if (main.maxCheck.hydra >= n) {
      chatMessage(
        client,
        sender,
        messages.CHECK.HYDRA[users[sender.getSteamID64()].language]
          .replace(/{HYDRA}/g, n)
          .replace('{GEMS}', n * rates.hydra.sell)
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.INPUT.AMOUNTOVER.HYDRA[
          users[sender.getSteamID64()].language
        ].replace('{KEYS}', main.maxCheck.hydra)
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.HYDRA[
        users[sender.getSteamID64()].language
      ].replace('{command}', '!CHECKHYDRA 1')
    );
  }
};
