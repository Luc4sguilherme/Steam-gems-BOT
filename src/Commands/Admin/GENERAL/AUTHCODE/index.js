const SteamTotp = require('steam-totp');

const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users) => {
  const language = utils.getLanguage(sender.getSteamID64(), users);

  log.adminChat(sender.getSteamID64(), language, '[ !AUTHCODE ]');
  chatMessage(
    client,
    sender,
    messages.AUTHCODE[language].replace(
      '{CODE}',
      SteamTotp.getAuthCode(main.sharedSecret)
    )
  );
};
