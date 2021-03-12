const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, client, users) => {
  const { language } = users[sender.getSteamID64()];
  const msg = filterCommands(messages.ADMIN[language], true);

  log.adminChat(sender.getSteamID64(), language, '[ !ADMIN ]');

  let message = '/pre ';
  for (let i = 0; i < msg.length; i += 1) {
    message += msg[i];
  }
  chatMessage(client, sender, message);
};
