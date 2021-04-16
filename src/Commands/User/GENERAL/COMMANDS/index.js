const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, client, users, lang) => {
  const language = lang || utils.getLanguage(sender.getSteamID64(), users);
  const msg = filterCommands(messages.COMMANDS[language]);

  log.userChat(sender.getSteamID64(), language, '[ !COMMANDS ]');

  let message = '/pre ';
  for (let i = 0; i < msg.length; i += 1) {
    message += msg[i];
  }
  chatMessage(client, sender, message);
};
