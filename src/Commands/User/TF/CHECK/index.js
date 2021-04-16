const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');

module.exports = (sender, msg, client, users) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKTF ', ''), 10);
  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    log.userChat(
      sender.getSteamID64(),
      utils.getLanguage(sender.getSteamID64(), users),
      `[ !CHECKTF ${n} ]`
    );
    if (main.maxCheck.tf >= n) {
      chatMessage(
        client,
        sender,
        messages.CHECK.TF[utils.getLanguage(sender.getSteamID64(), users)]
          .replace(/{TF}/g, n)
          .replace('{GEMS}', n * rates.tf.sell)
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.INPUT.AMOUNTOVER.TF[
          utils.getLanguage(sender.getSteamID64(), users)
        ].replace('{KEYS}', main.maxCheck.tf)
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.TF[
        utils.getLanguage(sender.getSteamID64(), users)
      ].replace('{command}', '!CHECKTF 1')
    );
  }
};
