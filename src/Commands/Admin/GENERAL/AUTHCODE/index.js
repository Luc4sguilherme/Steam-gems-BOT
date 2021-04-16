const SteamTotp = require('steam-totp');

const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users) => {
  log.adminChat(
    sender.getSteamID64(),
    utils.getLanguage(sender.getSteamID64(), users),
    '[ !AUTHCODE ]'
  );
  chatMessage(
    client,
    sender,
    messages.AUTHCODE[utils.getLanguage(sender.getSteamID64(), users)].replace(
      '{CODE}',
      SteamTotp.getAuthCode(main.sharedSecret)
    )
  );
};
