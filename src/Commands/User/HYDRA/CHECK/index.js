const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');

module.exports = (sender, msg, client, users) => {
  const language = utils.getLanguage(sender.getSteamID64(), users);
  const n = parseInt(msg.toUpperCase().replace('!CHECKHYDRA ', ''), 10);

  if (!Number.isNaN(n) && parseInt(n, 10) > 0) {
    log.userChat(sender.getSteamID64(), language, `[ !CHECKHYDRA ${n} ]`);
    if (main.maxCheck.hydra >= n) {
      chatMessage(
        client,
        sender,
        messages.CHECK.HYDRA[language]
          .replace(/{HYDRA}/g, n)
          .replace('{GEMS}', n * rates.hydra.sell)
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.INPUT.AMOUNTOVER.HYDRA[language].replace(
          '{KEYS}',
          main.maxCheck.hydra
        )
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.HYDRA[language].replace(
        '{command}',
        '!CHECKHYDRA 1'
      )
    );
  }
};
