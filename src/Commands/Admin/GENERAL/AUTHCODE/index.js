const SteamTotp = require('steam-totp');

const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');

module.exports = (sender, client, users) => {
  log.adminChat(
    sender.getSteamID64(),
    users[sender.getSteamID64()].language,
    '[ !AUTHCODE ]'
  );
  chatMessage(
    client,
    sender,
    messages.AUTHCODE[users[sender.getSteamID64()].language].replace(
      '{CODE}',
      SteamTotp.getAuthCode(main.sharedSecret)
    )
  );
};
